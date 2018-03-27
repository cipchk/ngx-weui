---
title: weui-gallery
subtitle: 全屏画廊
module: GalleryModule
---

全屏画廊，**注：**只支持单张图片。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
imgs | 图片数据，**注：**虽然支持传递数组，但并不支持在打开后切换图片 | `string,File,string[],GalleryItem[]` | -
canDelete | 是否允许删除 | `boolean` | `true`
show | 标记是否显示，支持双向绑定 | `boolean` | `false`
delete | 删除回调 | `EventEmitter<any>` | -
hide | 隐藏回调 | `EventEmitter<any>` | -

### GalleryItem

参数 | 说明 | 类型 | 默认值
----|------|-----|------
url | 远程网址 | `string` | -
file | JavaScript File 对象 | `File` | -
title | 文件标题 | `string` | -
canDelete | 是否允许删除 | `boolean` | `true`
