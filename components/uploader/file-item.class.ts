import { FileLikeObject } from './file-like-object.class';
import { ParsedResponseHeaders } from './interface';
import { Uploader } from './uploader.class';
import { UploaderOptions } from './uploader.options';

/**
 * 文件对象
 */
export class FileItem {
  /**
   * 文件ID，每个对象具有唯一ID，与文件名无关
   */
  id: string;

  /**
   * 重建文件结构对象
   */
  file: FileLikeObject;

  /**
   * 原生对象
   */
  _file: File;

  /**
   * 索引
   */
  index: number = 0;

  /**
   * 上传进度
   */
  progress: number = 0;

  /**
   * 准备上传就绪
   */
  isReady: boolean = false;
  /**
   * 上传中
   */
  isUploading: boolean = false;
  /**
   * 已上传（不管错误与否都是true）
   */
  isUploaded: boolean = false;
  /**
   * 上传成功
   */
  isSuccess: boolean = false;
  /**
   * 用户取消上传
   */
  isCancel: boolean = false;
  /**
   * 上传失败
   */
  isError: boolean = false;

  /**
   * HTTP请求对象
   */
  _xhr: XMLHttpRequest;

  /**
   * 上传配置信息
   */
  options: UploaderOptions;

  protected uploader: Uploader;

  constructor(uploader: Uploader, file: File, options: UploaderOptions) {
    this.uploader = uploader;
    this.setOptions(options);
    this.id = Math.random()
      .toString(36)
      .substring(7);
    this.file = new FileLikeObject(file);
    this._file = file;
  }

  setOptions(options: UploaderOptions) {
    this.options = { ...this.uploader.options, ...options };
  }

  /**
   * 上传
   */
  upload(): void {
    try {
      this.uploader.uploadItem(this);
    } catch (e) {
      this.uploader._onCompleteItem(this, '', 0, {});
      this.uploader._onErrorItem(this, '', 0, {});
    }
  }

  /**
   * 取消上传
   */
  cancel(): void {
    this.uploader.cancelItem(this);
  }

  /**
   * 从队列中移除，当文件正在上传中时会先取消
   */
  remove(): void {
    this.uploader.removeFromQueue(this);
  }

  _prepareToUploading(): void {
    this.index = this.index || this.uploader._getNextIndex();
    this.isReady = true;
  }

  _onBeforeUpload(): void {
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;

    if (this.options.onUploadStart) this.options.onUploadStart(this);
  }

  _onProgress(progress: number): any {
    this.progress = progress;
    if (this.options.onUploadProgress) this.options.onUploadProgress(this, progress, this.uploader.progress);
  }

  _onSuccess(response: string, status: number, headers: ParsedResponseHeaders) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
    this.index = 0;

    if (this.options.onUploadSuccess) this.options.onUploadSuccess(this, response, status, headers);
  }

  _onError(response: string, status: number, headers: ParsedResponseHeaders) {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
    this.index = 0;

    if (this.options.onUploadError) this.options.onUploadError(this, response, status, headers);
  }

  _onComplete(response: string, status: number, headers: ParsedResponseHeaders): void {
    if (this.uploader.options.removeAfterUpload) {
      this.remove();
    }

    if (this.options.onUploadComplete) this.options.onUploadComplete(this, response, status, headers);
  }

  _onCancel(): any {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
    this.index = 0;

    if (this.options.onUploadCancel) this.options.onUploadCancel(this);
  }
}
