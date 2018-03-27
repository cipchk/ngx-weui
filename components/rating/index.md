---
title: weui-rating
subtitle: 评分
module: RatingModule
---

一个评分组件。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 配置项 | `RatingConfig` | -
readonly | 是否只读模式 | `boolean` | `false`
selected | 选中后回调 | `EventEmitter<number>` | -

### RatingConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
max | 图标数量 | `number` | `5`
cls | 样式名 | `string` | -
stateOff | 未选中图标 | `string` | `weui-icon-circle`
stateOn | 选中图标 | `string` | `weui-icon-success`
states | 自定义图标 | `{ on: string, off: string }[]` | -
titles | 图标 `title` 属性值，默认以 `1` 开始的索引值 | `string[]` | -
