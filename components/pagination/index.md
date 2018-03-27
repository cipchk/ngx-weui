---
title: weui-pagination
subtitle: 分页器
config: PaginationConfig
module: PaginationModule
---

用于分页。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
current | 当前索引 | `number` | `0`
total | 数据总数 | `number` | `0`
mode | 形态 | `button,pointer` | `button`
simple | 是否隐藏数值 | `boolean` | `false`
mini | 小号按钮 | `boolean` | `true`
prevText | 上一页文本（支持HTML） | `string` | `上一页`
nextText | 下一页文本（支持HTML） | `string` | `下一步`
change | 分页触发的回调函数 | `EventEmitter<number>` | -

### PaginationConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
mode | 形态 | `button,pointer` | `button`
simple | 是否隐藏数值 | `boolean` | `false`
mini | 小号按钮 | `boolean` | `true`
prevText | 上一页文本（支持HTML） | `string` | `上一页`
nextText | 下一页文本（支持HTML） | `string` | `下一步`
