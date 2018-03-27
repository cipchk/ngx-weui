---
title: weui-popup
subtitle: 弹出视图
config: PopupConfig
module: PopupModule
---

构建快捷视图。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 配置项 | `PopupConfig` | -
cancel | 取消回调 | `EventEmitter` | -
confirm | 确认回调 | `EventEmitter` | -

### PopupConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
is_full | 是否全屏 | `boolean` | `false`
cancel | 取消按钮文本 | `string` | `取消`
confirm | 确定按钮文本 | `string` | `确定`
backdrop | 允许点击背景关闭  | `boolean` | `true`
