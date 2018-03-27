---
title: weui-searchbar
subtitle: 滑块
config: SidebarConfig
module: SidebarModule
---

即时搜索框。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
value | 默认值 | `string` | -
placeholder | 占位符 | `string` | `搜索`
cancelText | 取消按键文字 | `string` | `取消`
debounceTime | 去抖时长（单位：ms） | `number` | `300`
search | 搜索回调 | `EventEmitter<string>` | -
submit | 提交回调（指的是键盘回车后） | `EventEmitter<string>` | -
cancel | 取消回调 | `EventEmitter` | -
clear | 清空回调 | `EventEmitter` | -

### PTRConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
placeholder | 占位符 | `string` | `搜索`
cancelText | 取消按键文字 | `string` | `取消`
debounceTime | 去抖时长（单位：ms） | `number` | `300`
