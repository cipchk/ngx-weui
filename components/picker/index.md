---
subtitle: 多列选择器
module: PickerModule
---

多列选择器，包括：城市、日期、时间选择器以及自定义数据源。

## API

### weui-picker

根据数据源自定义多列选择器。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
options | 配置项 | `PickerOptions` | -
defaultSelect | 当前默认位置，数组的长度必须等同于 groups 长度 | `number[]` | -
groups | 多列数据，以数组的长度来决定几列数据 | `PickerData[][]` | -
placeholder | 当 `options.type==='form'` 时，占位符文本 | `string` | -
disabled | 是否禁用 | `boolean` | `false`
change | 确认后回调当前选择数据（包括已选面板所有数据） | `EventEmitter<{ value: string, items: PickerData[] }>` | -
groupChange | 列变更时回调 | `EventEmitter<{ item: PickerData, index: number, groupIndex: number }>` | -
cancel | 取消后回调 | `EventEmitter` | -
show | 显示时回调 | `EventEmitter` | -
hide | 隐藏后回调 | `EventEmitter` | -

### weui-city-picker

城市选择器（并不包含城市数据，可以参考示例中的数据格式）。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
data | 城市数据，可以参考示例中的数据格式 | `any` | -
dataMap | 城市数据字段映射 | `{ label: string, value: string, items: string }` | `{ label: 'name', value: 'code', items: 'sub' }`
options | 配置项 | `PickerOptions` | -
placeholder | 当 `options.type==='form'` 时，占位符文本 | `string` | -
disabled | 是否禁用 | `boolean` | `false`
change | 确认后回调当前选择数据（包括已选面板所有数据） | `EventEmitter<{ value: string, items: PickerData[] }>` | -
groupChange | 列变更时回调 | `EventEmitter<{ item: PickerData, index: number, groupIndex: number }>` | -
cancel | 取消后回调 | `EventEmitter` | -
show | 显示时回调 | `EventEmitter` | -
hide | 隐藏后回调 | `EventEmitter` | -

### weui-date-picker

日期时间选择器。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
type | 类型<br>`date-ym` 年月<br>`date` 日期<br>`datetime` 日期&时间（不包括秒）<br>`time` 时间（不包括秒） | `date-ym,date,datetime,time` | `date`
format | 日期格式化代码，实际是采用 `DatePipe`，所有代码内容和它一样 | `string` | -
min | 最小时间范围（当前只限定年月日，暂不包括时间范围） | `Date` | -
max | 最大时间范围（当前只限定年月日，暂不包括时间范围） | `Date` | -
options | 配置项 | `PickerOptions` | -
placeholder | 当 `options.type==='form'` 时，占位符文本 | `string` | -
disabled | 是否禁用 | `boolean` | `false`
change | 确认后回调当前选择数据（包括已选面板所有数据） | `EventEmitter<{ value: string, items: PickerData[] }>` | -
groupChange | 列变更时回调 | `EventEmitter<{ item: PickerData, index: number, groupIndex: number }>` | -
cancel | 取消后回调 | `EventEmitter` | -
show | 显示时回调 | `EventEmitter` | -
hide | 隐藏后回调 | `EventEmitter` | -

## PickerService

通过 `PickerService` 构建多列选择器。

方法 | 说明 | 返回值
----|------|------
show | 构建一个多列选择器并显示 | `Observable<any>`
showCity | 构建一个城市选择器并显示 | `Observable<any>`
showDateTime | 构建一个日期时间选择器并显示 | `Observable<any>`
