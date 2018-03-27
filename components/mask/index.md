---
title: weui-mask
subtitle: 遮罩层
module: MaskModule
---

用于遮罩底层页面元素。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
backdrop | 允许点击背景关闭  | `boolean` | `true`
placement | 内容方向<br>`top`: 顶部居中<br>`bottom`: 底部居中<br>`vertical-left`: 垂直居左<br>`vertical`: 垂直居中<br>`vertical-right`: 垂直居右<br>`none`: 无 | `top,bottom,vertical,vertical-left,vertical-right,none` | `vertical`
bg | 内容背景色  | `string` | -
loading | 内容为Loading效果  | `boolean` | `false`
close | 关闭回调  | `EventEmitter` | -
show() | 显示  | `Observable<void>` | -
hide() | 隐藏  | `void` | -
