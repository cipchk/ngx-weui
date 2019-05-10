import { Observable } from 'rxjs';

import { FileItem } from './file-item.class';
import { FileLikeObject } from './file-like-object.class';
import { ParsedResponseHeaders } from './interface';

// tslint:disable-next-line:interface-over-type-literal
export type FilterFunction = {
  name: string;
  fn: (item?: FileLikeObject, options?: UploaderOptions) => boolean;
};

/**
 * 组件Header对象接口
 */
export interface UploaderHeaders {
  name: string;
  value: string;
}

/**
 * 组件配置项对象接口
 */
export interface UploaderOptions {
  /**
   * 服务端网址
   */
  url?: string;

  /**
   * HTTP请求方式，默认：`POST`
   */
  method?: 'POST' | 'GET';

  /**
   * 设置文件上传域的name
   */
  alias?: string;

  /**
   * 是否发送凭据，默认：`true`
   */
  withCredentials?: boolean;

  /**
   * headers 信息
   */
  headers?: UploaderHeaders[];

  /**
   * HTTP提交其他参数
   */
  params?: { [key: string]: any };

  /**
   * 过滤器
   */
  filters?: FilterFunction[];

  /**
   * 是否自动上传，默认：`false`
   * 设置为 true 后，不需要手动调用 `upload`，有文件选择即开始上传。
   */
  auto?: boolean;

  /**
   * 限定文件mime类型，例如：[ '' ]
   */
  mimes?: string[];

  /**
   * 限定文件类型，例如：[ 'jpg', 'png' ]
   */
  types?: string[];

  /**
   * 允许最多上传数量，-1 表示不受限，默认：`-1`
   */
  limit?: number;

  /**
   * 限定文件大小（单位：字节），-1 表示不受限，默认：`-1`
   */
  size?: number;

  /**
   * 是否自动移除上传成功文件，默认：`false`
   */
  removeAfterUpload?: boolean;

  /**
   * 禁止使用multipart/form-data，默认：`false`
   */
  disableMultipart?: boolean;

  /**
   * 当文件被加入队列以后触发
   */
  onFileQueued?: (file: FileItem) => void;

  /**
   * 当文件被移除队列后触发
   *
   * @param file File对象，如果是clear则file为空
   */
  onFileDequeued?: (file?: FileItem) => void;

  /**
   * 当开始上传流程时触发
   */
  onStart?: (file: FileItem) => void;

  /**
   * 当开始上传流程取消时触发
   */
  onCancel?: () => void;

  /**
   * 当所有文件上传结束时触发
   */
  onFinished?: () => void;

  /**
   * 某个文件开始上传前触发，一个文件只会触发一次
   */
  onUploadStart?: (file: FileItem) => void;

  /**
   * 上传过程中触发，携带总的上传进度，以及当前文件的上传进度
   * @param file File对象
   * @param percentage 当前文件上传进度
   * @param totaoPercentage 总上传进度
   */
  onUploadProgress?: (file: FileItem, percentage: number, totaoPercentage: number) => void;

  /**
   * 当文件上传成功时触发
   * @param file File对象
   * @param response 服务端返回的数据
   * @param status 状态码
   * @param headers Headers
   */
  onUploadSuccess?: (file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void;

  /**
   * 当文件上传出错时触发
   * @param file File对象
   * @param response 服务端返回的数据
   * @param status 状态码
   * @param headers Headers
   */
  onUploadError?: (file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void;
  /**
   * 不管成功或者失败，文件上传完成时触发
   * @param file File对象
   * @param response 服务端返回的数据
   * @param status 状态码
   * @param headers Headers
   */
  onUploadComplete?: (file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void;

  /**
   * 取消某文件时触发
   *
   * @param file File对象
   */
  onUploadCancel?: (file: FileItem) => void;

  /**
   * 当filters不通过时触发
   * @param file 文件对象
   * @param filter 过滤器
   * @param options 选项
   */
  onError?: (file: FileLikeObject, filter: FilterFunction, options: UploaderOptions) => void;

  /**
   * 内置的上传组件是基于HTML5
   * 如有特殊需求可以自定义上传接口（Observable<any> 中的 any 指的是事件当中的response）
   * 不管成功与否都会触发 onUploadComplete & onUploadSuccess
   */
  uploadTransport?(item: FileItem): Observable<any>;

  /**
   * 自定义上传接口，当用户中止时回调
   */
  abortTransport?(item: FileItem): void;
}
