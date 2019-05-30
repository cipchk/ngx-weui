import { Inject, Optional } from '@angular/core';
import { FileItem } from './file-item.class';
import { FileLikeObject } from './file-like-object.class';
import { FileType } from './file-type.class';
import { ParsedResponseHeaders } from './interface';
import { UploaderConfig } from './uploader.config';
import { FilterFunction, UploaderOptions } from './uploader.options';

/**
 * 内置HTML5上传组件
 */
export class Uploader {
  private _options: UploaderOptions;
  private _queue: FileItem[] = [];
  private _progress: number = 0;
  private _isUploading: boolean = false;
  private _nextIndex: number = 0;
  private _failFilterIndex: number;

  /**
   * 获取当前上传组件配置项
   */
  get options(): UploaderOptions {
    return this._options;
  }

  /**
   * 获取队列中所有文件对象
   */
  get queue(): FileItem[] {
    return this._queue;
  }

  /**
   * 获取当前总进度
   */
  get progress(): number {
    return this._progress;
  }

  /**
   * 是否上传中
   */
  get isUploading(): boolean {
    return this._isUploading;
  }

  /**
   * 获取未上传数量
   */
  get notUploadedCount(): number {
    return this.getNotUploadedItems().length;
  }

  /**
   * 获取已上传数量
   */
  get uploadedCount(): number {
    return this._queue.filter((item: FileItem) => item.isUploaded).length;
  }

  _getNextIndex(): number {
    return ++this._nextIndex;
  }

  /**
   * Creates an instance of Uploader.
   */
  constructor(
    options: UploaderOptions,
    @Inject(UploaderConfig)
    @Optional()
    private globalConfig?: UploaderConfig,
  ) {
    this.setOptions(options);
  }

  /**
   * 重置选项
   *
   * @param includeOldQueue 是否包括已存在队列中的文件
   */
  setOptions(options: UploaderOptions, includeOldQueue: boolean = true) {
    this._options = {
      filters: [],
      disableMultipart: false,
      method: 'POST',
      alias: 'file',
      withCredentials: true,
      auto: false,
      limit: -1,
      size: -1,
      removeAfterUpload: false,
      ...this.globalConfig,
      ...this._options,
      ...options,
    } as UploaderOptions;

    // 数量
    if (this._options.limit !== -1)
      this._options.filters!.unshift({
        name: 'queueLimit',
        fn: this._queueLimitFilter,
      });

    // 大小
    if (this._options.size !== -1)
      this._options.filters!.unshift({
        name: 'fileSize',
        fn: this._fileSizeFilter,
      });

    // 类型
    if (this._options.types)
      this._options.filters!.unshift({
        name: 'fileType',
        fn: this._fileTypeFilter,
      });

    // mime类型
    if (this._options.mimes)
      this._options.filters!.unshift({
        name: 'mimeType',
        fn: this._mimeTypeFilter,
      });

    // 对已经存在的队列重置所有配置信息
    if (includeOldQueue) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this._queue.length; i++) {
        this._queue[i].setOptions(this._options);
      }
    }
  }

  private _queueLimitFilter(): boolean {
    return this._options.limit === undefined || this._queue.length < this._options.limit;
  }

  private _fileSizeFilter(item?: FileLikeObject, _options?: UploaderOptions): boolean {
    return !(this._options.size && item!.size > this._options.size);
  }

  private _mimeTypeFilter(item?: FileLikeObject, _options?: UploaderOptions): boolean {
    return !(this._options.mimes && this._options.mimes.indexOf(item!.type) === -1);
  }

  private _fileTypeFilter(item?: FileLikeObject, _options?: UploaderOptions): boolean {
    return !(this._options.types && this._options.types.indexOf(FileType.getMimeClass(item!)) === -1);
  }

  private _isValidFile(file: FileLikeObject, filters: FilterFunction[], options: UploaderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length
      ? true
      : filters.every((filter: FilterFunction) => {
          this._failFilterIndex++;
          return filter.fn.call(this, file, options);
        });
  }

  /** 过滤器，如果未指定采用内置 */
  private _getFilters(filters: FilterFunction[] | string): FilterFunction[] {
    if (!filters) return this._options.filters!;
    if (Array.isArray(filters)) return filters;
    if (typeof filters === 'string') {
      const names = filters.match(/[^\s,]+/g)!;
      return this._options.filters!.filter((filter: any) => names.indexOf(filter.name) !== -1);
    }
    return this._options.filters!;
  }

  private _getIndexOfItem(value: any): number {
    return typeof value === 'number' ? value : this._queue.indexOf(value);
  }

  /** 获取未上传过列表 */
  private getNotUploadedItems(): FileItem[] {
    return this._queue.filter((item: FileItem) => !item.isUploaded);
  }

  /** 获取待上传文件 */
  get getReadyItems(): FileItem[] {
    return this._queue
      .filter((item: FileItem) => item.isReady && !item.isUploading)
      .sort((item1: any, item2: any) => item1.index - item2.index);
  }

  /**
   * 将文件放入队列中
   *
   * @param files 文件列表
   * @param options 强制重新指定新 `options` 内容
   * @param filters 强制重新指定新 `filters` 内容
   */
  addToQueue(files: File[], options?: UploaderOptions, filters?: FilterFunction[] | string) {
    const list: File[] = [];
    for (const file of files) list.push(file);
    const arrayOfFilters = this._getFilters(filters!);
    const count = this._queue.length;
    const addedFileItems: FileItem[] = [];
    if (!options) {
      options = this._options;
    }
    list.map((some: File) => {
      const temp = new FileLikeObject(some);
      if (this._isValidFile(temp, arrayOfFilters, options!)) {
        const fileItem = new FileItem(this, some, options!);
        addedFileItems.push(fileItem);
        this._queue.push(fileItem);
        if (this._options.onFileQueued) this._options.onFileQueued(fileItem);
      } else {
        const filter = arrayOfFilters[this._failFilterIndex];
        if (this._options.onError) this._options.onError(temp, filter, options!);
      }
    });

    if (this.queue.length !== count) {
      this._progress = this._getTotalProgress();
    }

    if (this.options!.auto) {
      this.uploadAll();
    }
  }

  /**
   * 从队列中移除一个文件
   *
   * @param value FileItem对象或下标
   */
  removeFromQueue(value: FileItem | number): void {
    const index = this._getIndexOfItem(value);
    const item = this._queue[index];
    if (item.isUploading) {
      item.cancel();
    }
    this._queue.splice(index, 1);
    this._progress = this._getTotalProgress();
    if (this._options.onFileDequeued) this._options.onFileDequeued(item);
  }

  /**
   * 清空队列
   */
  clearQueue(): void {
    while (this._queue.length) {
      this._queue[0].remove();
    }
    this._progress = 0;
    if (this._options.onFileDequeued) this._options.onFileDequeued();
  }

  /**
   * 上传某个文件
   */
  uploadItem(value: FileItem): void {
    const index = this._getIndexOfItem(value);
    const item = this._queue[index];
    item._prepareToUploading();
    if (this._isUploading) {
      return;
    }
    this._isUploading = true;
    this._xhrTransport(item);
  }

  /**
   * 取消某个文件
   */
  cancelItem(value: FileItem): void {
    const index = this._getIndexOfItem(value);
    const item = this._queue[index];
    if (item && item.isUploading) {
      if (item.options.abortTransport) {
        this._onCancelItem(item);
        this._onCompleteItem(item, null!, null!, null!);
        item.options.abortTransport(item);
      } else {
        if (item._xhr) item._xhr.abort();
      }
    }
  }

  /**
   * 上传队列中所有未上传的文件
   */
  uploadAll(): void {
    const items = this.getNotUploadedItems().filter((item: FileItem) => !item.isUploading);
    if (!items.length) {
      return;
    }
    items.map((item: FileItem) => item._prepareToUploading());

    if (this._options.onStart) this._options.onStart(items[0]);
    items[0].upload();
  }

  /**
   * 取消所有上传中文件
   */
  cancelAll(): void {
    const items = this.getNotUploadedItems();
    items.map((item: FileItem) => item.cancel());

    if (this._options.onCancel) this._options.onCancel();
  }

  _destroy(): void {
    return void 0;
  }

  private _xhrTransport(item: FileItem): any {
    item._onBeforeUpload();

    // 自实现
    if (item.options.uploadTransport) {
      item.options.uploadTransport.apply(this, [item]).subscribe((response: any) => {
        this._onSuccessItem(item, response, 0, null!);
        this._onCompleteItem(item, response, 0, null!);
      });
      return this;
    }

    const xhr = (item._xhr = new XMLHttpRequest());
    let sendable: any;
    if (typeof item._file.size !== 'number') {
      throw new TypeError('The file specified is no longer valid');
    }
    if (!this._options.disableMultipart) {
      sendable = new FormData();

      Object.keys(this._options.params || {}).forEach((key: string) =>
        sendable.append(key, this._options.params![key]),
      );

      sendable.append(item.options.alias, item._file, item.file.name);
    } else {
      sendable = item._file;
    }

    xhr.upload.onprogress = (event: any) => {
      const progress = Math.round(event.lengthComputable ? (event.loaded * 100) / event.total : 0);
      this._onProgressItem(item, progress);
    };
    xhr.onload = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      const gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
      const method = `_on${gist}Item`;
      (this as any)[method](item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onerror = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      this._onErrorItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onabort = () => {
      const headers = this._parseHeaders(xhr.getAllResponseHeaders());
      const response = this._transformResponse(xhr.response, headers);
      this._onCancelItem(item);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.open(item.options.method!, item.options.url!, true);
    xhr.withCredentials = item.options.withCredentials!;
    if (item.options.headers && item.options.headers.length > 0) {
      for (const header of item.options.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    xhr.send(sendable);
    return this;
  }

  private _getTotalProgress(value: number = 0): number {
    if (this._options.removeAfterUpload) {
      return value;
    }
    const notUploaded = this.getNotUploadedItems().length;
    const uploaded = notUploaded ? this._queue.length - notUploaded : this._queue.length;
    const ratio = 100 / this._queue.length;
    const current = (value * ratio) / 100;
    return Math.round(uploaded * ratio + current);
  }

  private _parseHeaders(headers: string): ParsedResponseHeaders {
    const parsed: any = {};
    let key: any;
    let val: any;
    let i: any;
    if (!headers) {
      return parsed;
    }
    headers.split('\n').map((line: any) => {
      i = line.indexOf(':');
      key = line
        .slice(0, i)
        .trim()
        .toLowerCase();
      val = line.slice(i + 1).trim();
      if (key) {
        parsed[key] = parsed[key] ? `${parsed[key]}, ${val}` : val;
      }
    });
    return parsed;
  }

  private _transformResponse(response: string, _headers: ParsedResponseHeaders): string {
    return response;
  }

  private _isSuccessCode(status: number): boolean {
    return (status >= 200 && status < 300) || status === 304;
  }

  private _onProgressItem(item: FileItem, progress: any): void {
    const total = this._getTotalProgress(progress);
    this._progress = total;
    item._onProgress(progress);
  }

  _onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): void {
    item._onError(response, status, headers);
  }

  private _onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): void {
    item._onSuccess(response, status, headers);
  }

  private _onCancelItem(item: FileItem): void {
    item._onCancel();
  }

  _onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): void {
    item._onComplete(response, status, headers);
    const nextItem = this.getReadyItems[0];
    this._isUploading = false;
    if (nextItem) {
      nextItem.upload();
      return;
    }
    this._progress = this._getTotalProgress();
    if (this._options.onFinished) this._options.onFinished();
  }
}
