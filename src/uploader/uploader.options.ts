import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FileItem, FileLikeObject } from "./index";

export type FilterFunction = { name: string, fn: (item?: FileLikeObject, options?: UploaderOptions) => boolean };

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
     * 
     * @type {string}
     */
    url?: string;

    /**
     * HTTP请求方式
     * 
     * @type {('POST' | 'GET')}
     * @default POST
     */
    method?: 'POST' | 'GET';

    /**
     * 设置文件上传域的name
     * 
     * @type {string}
     * @default file
     */
    alias?: string;

    /**
     * 是否发送凭据
     * 
     * @type {boolean}
     * @default true
     */
    withCredentials?: boolean;

    /**
     * headers 信息
     * 
     * @type {UploaderHeaders[]}
     */
    headers?: UploaderHeaders[];

    /**
     * HTTP提交其他参数
     * 
     * @type {Object}
     */
    params?: { [key: string]: any };

    /**
     * 过滤器
     * 
     * @type {FilterFunction[]}
     */
    filters?: FilterFunction[];

    /**
     * 是否自动上传
     * 设置为 true 后，不需要手动调用 `upload`，有文件选择即开始上传。
     * 
     * @type {boolean}
     * @default false
     */
    auto?: boolean;

    /**
     * 限定文件mime类型，例如：[ '' ]
     * 
     * @type {string[]}
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
     * @default -1
     */
    limit?: number;

    /**
     * 限定文件大小（单位：字节）
     * -1 表示不受限
     * 
     * @type {number}
     * @default -1
     */
    size?: number;

    /**
     * 是否自动移除上传成功文件
     * 
     * @type {boolean}
     * @default false
     */
    removeAfterUpload?: boolean;

    /**
     * 禁止使用multipart/form-data
     * 
     * @type {boolean}
     * @default false
     */
    disableMultipart?: boolean;

    /**
     * 当文件被加入队列以后触发
     * 
     * @param {FileItem} file File对象
     * @type {Function}
     */
    onFileQueued?: Function;

    /**
     * 当文件被移除队列后触发
     * 
     * @param {FileItem} file File对象，如果是clear则file为空
     * @type {Function}
     */
    onFileDequeued?: Function;

    /**
     * 当开始上传流程时触发。
     * @type {Function}
     */
    onStart?: Function;

    /**
     * 当开始上传流程取消时触发。
     * 
     * @type {Function}
     */
    onCancel?: Function;

    /**
     * 当所有文件上传结束时触发
     * 
     * @type {Function}
     */
    onFinished?: Function;

    /**
     * 某个文件开始上传前触发，一个文件只会触发一次。
     * 
     * @param {FileItem} file File对象
     * @type {Function}
     */
    onUploadStart?: Function;

    /**
     * 上传过程中触发，携带总的上传进度，以及当前文件的上传进度
     * @param {FileItem} file File对象
     * @param {number} percentage 当前文件上传进度
     * @param {number} totaoPercentage 总上传进度
     * @type {Function}
     */
    onUploadProgress?: Function;

    /**
     * 当文件上传成功时触发
     * @param {FileItem} file File对象
     * @param {String} response 服务端返回的数据
     * @param {Number} status 状态码
     * @param {Object} headers Headers
     * @type {Function}
     */
    onUploadSuccess?: Function;

    /**
     * 当文件上传出错时触发
     * @param {FileItem} file File对象
     * @param {String} response 服务端返回的数据
     * @param {Number} status 状态码
     * @param {Object} headers Headers
     * @type {Function}
     */
    onUploadError?: Function;

    /**
     * 不管成功或者失败，文件上传完成时触发
     * @param {FileItem} file File对象
     * @param {String} response 服务端返回的数据
     * @param {Number} status 状态码
     * @param {Object} headers Headers
     * @type {Function}
     */
    onUploadComplete?: Function;

    /**
     * 取消某文件时触发
     * 
     * @param {FileItem} file File对象
     * @type {Function}
     */
    onUploadCancel?: Function;

    /**
     * 当filters不通过时触发
     * @param {FileLikeObject} file 文件对象
     * @param {FilterFunction} filter 过滤器
     * @param {UploadOptions} options 选项
     * @type {Function}
     */
    onError?: Function;

    /**
     * 内置的上传组件是基于HTML5
     * 如有特殊需求可以自定义上传接口（Observable<any> 中的 any 指的是事件当中的response）
     * 不管成功与否都会触发 onUploadComplete & onUploadSuccess
     * 
     * @param {FileItem} item 
     * @returns {Observable<any>} 
     * @this Uploader 对象
     */
    uploadTransport?(item: FileItem): Observable<any>;

    /**
     * 自定义上传接口，当用户中止时回调
     * 
     * @param {FileItem} item 
     * @this Uploader 对象
     */
    abortTransport?(item: FileItem): void;
}
