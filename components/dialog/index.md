---
title: weui-dialog
subtitle: 对话框
config: DialogConfig
module: DialogModule
---

模态对话框，依赖于 `weui-textarea`、`weui-slider` 组件。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 对话框配置项 | `DialogConfig` | -
show() | 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果 | `Observable<any>` | -
hide() | 隐藏 | `void` | -
open | 打开动画结束后回调 | `EventEmitter<DialogComponent>` | -
close | 关闭动画开始时回调 | `EventEmitter<DialogComponent>` | -

### DialogConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
type | 对话框类型，`default` 默认文本或HTML格式，`prompt` 可输入对话框 | `default,prompt` | `default`
skin | 样式  | `SkinType` | `auto`
title | 标题 | `string` | -
content | 内容（支持HTML） | `string` | -
input | Input `type` 字段 | `InputType` | -
inputPlaceholder | Input `placeholder` 字段 | `string` | -
inputValue | Input 初始化值 | `any` | -
inputRequired | Input `required` 字段，必填项校验失败时【确定】按钮为 `disabled` 状态 | `boolean` | `true`
inputRegex | Input 正则判断校验，如无指定，会根据 `input` 类型分别对：`email`、`url` 默认提供正则表达式 | `RegExp` | -
inputError | 输入参数无效时提醒文本 | `string` | -
inputOptions | 数据数组，如果input值为 `select` `radio` `checkbox` 时为必填项 | `InputData[]` | -
inputAttributes | HTML元素属性对象，例如 `min` `max` 等，对象键表示属性名，对象值表示属性值 | `Object` | -
cancel | 取消文本 | `string` | `取消`
cancelType | 取消按钮类型 | `ButtonType` | `default`
confirm | 确认文本 | `string` | `取消`
confirmType | 确认按钮类型 | `ButtonType` | `primary`
btns | 自定义按钮组，当此属性存在时 `cancel` & `confirm` 参数将失效 | `{ text: string, type: ButtonType, value: boolean | any, [key: string]: any }[]` | -
backdrop | 允许点击背景关闭  | `boolean` | `true`

### DialogService

方法 | 说明 | 返回值
----|------|------
show | 创建一个对话框并显示 | `Observable<any>`

