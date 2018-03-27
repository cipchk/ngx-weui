---
title: weui-rating
subtitle: 上传组件
config: UploaderConfig
module: UploaderModule
---

一般配合组件Gallery来使用。

## 使用说明

- 构建 `Uploader` 实例
- 利用组件完成上传、显示动作
    - 使用 `weui-uploader-file` 组件上传文件，需要传递 `Uploader` 实例
    - 使用 `weui-thumb` 组件上传文件，需要借助 `Uploader` 实例来获取文件信息
- 利用 `Uploader` 实例方法做一些上传的动作以及获取上传文件信息等

## API

### Uploader 类

内置HTML5上传实现。

参数 | 说明 | 返回值
----|------|-----|------
options | 获取当前上传组件配置项 | `UploaderOptions`
setOptions | 重置选项 | `FileItem[]`
queue | 获取队列中所有文件对象 | `FileItem[]`
progress | 获取当前总进度 | `number`
isUploading | 是否上传中 | `boolean`
notUploadedCount | 获取未上传数量 | `number`
uploadedCount | 获取已上传数量 | `number`
getReadyItems | 获取待上传文件 | `FileItem[]`
addToQueue | 将文件放入队列中 | `void`
removeFromQueue | 从队列中移除一个文件 | `void`
clearQueue | 清空队列 | `void`
uploadItem | 上传某个文件 | `void`
cancelItem | 取消某个文件 | `void`
uploadAll | 上传队列中所有未上传的文件 | `void`
cancelAll | 取消所有上传中文件 | `void`

### weui-uploader-file

上传组件

参数 | 说明 | 类型 | 默认值
----|------|-----|------
weui-uploader-file | `Uploader` 实例 | `Uploader` | -

例如：

```html
<input class="weui-uploader__input" type="file" accept="image/*" multiple [weui-uploader-file]="uploader">
```

### weui-thumb

创建缩略图

参数 | 说明 | 类型 | 默认值
----|------|-----|------
weui-thumb | `Uploader` 实例 | `Uploader` | -

### 接口信息

#### FileItem

文件对象。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
id | 文件ID，每个对象具有唯一ID，与文件名无关 | `string` | -
file | 重建文件结构对象 | `FileLikeObject` | -
_file | 原生对象 | `File` | -
index | 索引 | `number` | -
progress | 上传进度 | `number` | -
isReady | 准备上传就绪 | `boolean` | -
isUploading | 上传中 | `boolean` | -
isUploaded | 已上传（不管错误与否都是true） | `boolean` | -
isSuccess | 上传成功 | `boolean` | -
isCancel | 用户取消上传 | `boolean` | -
isError | 上传失败 | `boolean` | -
_xhr | HTTP请求对象 | `XMLHttpRequest` | -
options | 上传配置信息 | `UploaderOptions` | -

#### UploaderOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
url | 服务端网址 | `string` | -
method | HTTP请求方式 | `POST,GET` | -
alias | 设置文件上传域的name | `string` | -
withCredentials | 发送凭据 | `boolean` | `true`
headers | headers 信息 | `{ [key: string]: any }` | -
auto | 是否自动上传 | `boolean` | `false`
mimes | 限定文件mime类型 | `string[]` | -
types | 限定文件类型，例如：`[ 'jpg', 'png' ]` | `string[]` | -
limit | 允许最多上传数量，`-1` 表示不受限 | `number` | `-1`
size | 限定文件大小（单位：字节），`-1` 表示不受限 | `number` | `-1`
removeAfterUpload | 是否自动移除上传成功文件 | `boolean` | `false`
disableMultipart | 禁止使用multipart/form-data | `boolean` | `false`
onFileQueued | 当文件被加入队列以后触发 | `(file: FileItem) => void` | -
onFileDequeued | 当文件被移除队列后触发 | `(file?: FileItem) => void` | -
onStart | 当开始上传流程时触发 | `(file: FileItem) => void` | -
onCancel | 当开始上传流程取消时触发 | `() => void` | -
onFinished | 当所有文件上传结束时触发 | `() => void` | -
onUploadStart | 某个文件开始上传前触发，一个文件只会触发一次 | `(file: FileItem) => void` | -
onUploadProgress | 上传过程中触发，携带总的上传进度，以及当前文件的上传进度 | `(file: FileItem, percentage: number, totaoPercentage: number) => void` | -
onUploadSuccess | 当文件上传成功时触发 | `(file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void` | -
onUploadError | 当文件上传出错时触发 | `(file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void` | -
onUploadComplete | 不管成功或者失败，文件上传完成时触发 | `(file: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => void` | -
onUploadCancel | 取消某文件时触发 | `(file: FileItem) => void` | -
onError | 当filters不通过时触发 | `(file: FileLikeObject, filter: FilterFunction, options: UploaderOptions) => void` | -
uploadTransport?(item: FileItem) | 内置的上传组件是基于HTML5<br>如有特殊需求可以自定义上传接口（Observable<any> 中的 any 指的是事件当中的response）<br>不管成功与否都会触发 onUploadComplete & onUploadSuccess | `Observable<any>` | -
abortTransport?(item: FileItem) | 自定义上传接口，当用户中止时回调 | `void` | -

#### UploaderConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
url | 服务端网址 | `string` | -
method | HTTP请求方式 | `POST,GET` | -
alias | 设置文件上传域的name | `string` | -
withCredentials | 发送凭据 | `boolean` | `true`
headers | headers 信息 | `{ [key: string]: any }` | -
auto | 是否自动上传 | `boolean` | `false`
mimes | 限定文件mime类型 | `string[]` | -
types | 限定文件类型，例如：`[ 'jpg', 'png' ]` | `string[]` | -
limit | 允许最多上传数量，`-1` 表示不受限 | `number` | `-1`
size | 限定文件大小（单位：字节），`-1` 表示不受限 | `number` | `-1`
