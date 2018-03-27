---
title: weui-stepper
subtitle: 步进器
module: StepperModule
---

范围内数值。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
ngModel | 值 | `number` | `0`
min | 允许的最小值 | `number` | `0`
max | 允许的最大值 | `number` | `100`
step | 步长，可以为小数 | `number` | `1`
disabled | 是否禁用 | `boolean` | `false`
change | 值改变时触发 | `EventEmitter<number>` | -
