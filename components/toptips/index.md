---
title: weui-toptips
subtitle: 弹出式提示
module: ToptipsModule
---

支持组件和服务两种使用方式。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
text | 文本 | `string` | -
time | 显示时长后自动关闭（单位：ms），0 表示永久 | `number` | `2000`
type | 类型 | `default,warn,info,primary,success` | -
hide | 隐藏后回调 | `EventEmitter` | -

### ToptipsService

方法 | 说明 | 返回值
----|------|------
show | 构建一个Toptips并显示 | `ToptipsComponent`
warn | 构建一个Warn Toptips并显示 | `ToptipsComponent`
info | 构建一个Info Toptips并显示 | `ToptipsComponent`
primary | 构建一个Primary Toptips并显示 | `ToptipsComponent`
success | 构建一个Success Toptips并显示 | `ToptipsComponent`
default | 构建一个Default Toptips并显示 | `ToptipsComponent`

