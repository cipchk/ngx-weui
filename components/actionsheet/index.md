---
title: weui-actionsheet
subtitle: 弹出式菜单
config: ActionSheetConfig
module: ActionSheetModule
---

用于用户选择选项。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 配置项 | `ActionSheetConfig` | -
menus | 菜单内容  | `{ text?: string, [key: string]: any }[]` | -
close | 关闭回调 | `EventEmitter` | -

### ActionSheetConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
skin | 样式 | `SkinType` | `ios`
title | 标题  | `string` | -
cancel | 取消文本 | `string` | `取消`
backdrop | 允许点击背景关闭  | `boolean` | `true`

### ActionSheetService

方法 | 说明 | 返回值
----|------|------
show | 创建一个弹出式菜单并显示 | `Observable<any>`

