---
title: weui-toast
subtitle: 弹出式提示
config: ToastConfig
module: ToastModule
---

支持组件和服务两种使用方式。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
type | 类型 | `success,loading` | -
text | 文本 | `string` | -
icon | icon图标Class名 | `string` | -
time | 显示时长后自动关闭（单位：ms），0 表示永久 | `number` | `2000`
hide | 隐藏后回调 | `EventEmitter` | -

### ToastConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
success | 成功配置项 | `ToastConfigType` | `{ text: '已完成', icon: 'weui-icon-success-no-circle', time: 2000 }`
loading | 加载中配置项 | `ToastConfigType` | `{ text: '加载中…', icon: 'weui-loading', time: 2000 }`

### ToastService

方法 | 说明 | 返回值
----|------|------
show | 构建toast并显示 | `ToastComponent`
hide | 关闭最新toast | -
success | 构建成功toast并显示 | `ToastComponent`
loading | 构建加载中toast并显示 | `ToastComponent`


