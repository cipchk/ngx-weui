import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploaderConfig {
  /**
   * 服务端网址
   */
  url?: string;

  /**
   * HTTP请求方式
   */
  method?: 'POST' | 'GET';

  /**
   * 设置文件上传域的name
   */
  alias?: string;

  /**
   * 发送凭据，默认：`true`
   */
  withCredentials?: boolean = true;

  /**
   * headers 信息
   */
  headers?: { [key: string]: any };

  /**
   * 是否自动上传，默认：`false`
   * 设置为 true 后，不需要手动调用 `upload`，有文件选择即开始上传。
   */
  auto?: boolean = false;

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
  limit?: number = -1;

  /**
   * 限定文件大小（单位：字节），-1 表示不受限，默认：`-1`
   */
  size?: number = -1;
}
