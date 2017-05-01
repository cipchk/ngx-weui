import { Injectable } from '@angular/core';

@Injectable()
export class UploaderConfig {

    /**
     * 服务端网址
     * 
     * @type {string}
     */
    url?: string;

    /**
     * HTTP请求方式
     * 
     * @type {string}
     */
    method?: 'POST' | 'GET';

    /**
     * 设置文件上传域的name
     * 
     * @type {string}
     * @default file
     */
    alias?: string;

    withCredentials?: boolean = true;

    /**
     * headers 信息
     * 
     * @type {{[key: string]: any}}
     */
    headers?: { [key: string]: any };

    /**
     * 是否自动上传
     * 设置为 true 后，不需要手动调用 `upload`，有文件选择即开始上传。
     * 
     * @type {boolean}
     * @default false
     */
    auto?: boolean = false;

    /**
     * 限定文件mime类型，例如：[ '' ]
     * 
     * @type {string[]}
     * @memberof UploaderConfig
     */
    mimes?: string[];

    /**
     * 限定文件类型，例如：[ 'jpg', 'png' ]
     * 
     * @type {string[]}
     */
    types?: string[];

    /**
     * 允许最多上传数量
     * -1 表示不受限
     * 
     * @type {number}
     */
    limit?: number = -1;

    /**
     * 限定文件大小（单位：字节）
     * -1 表示不受限
     * 
     * @type {number}
     * @default -1
     */
    size?: number = -1;
}
