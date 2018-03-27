---
title: weui-ptr
subtitle: 下拉刷新
config: PTRConfig
module: PTRModule
---

下拉刷新数据，一般配合 `weui-infiniteloader` 滚动加载一起使用。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 配置项 | `PTRConfig` | -
disabled | 是否禁止 | `boolean` | `false`
setLastUpdatedLabel() | 设置最后更新标签 | - | -
setFinished() | 设置刷新成功 | - | -
scroll | 下拉滚动时回调，返回一个0-100%的参数 | `EventEmitter<number>` | -
refresh | 刷新回调 | `EventEmitter<PTRComponent>` | -

### PTRConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
customIcon | 是否使用默认icon样式 | `boolean` | `false`
pullIcon | 下拉icon，支持HTML | `string` | -
loadingIcon | 加载中icon，支持HTML | `string` | -
successIcon | 加载成功icon，支持HTML  | `string` | -
height | 下拉刷新容器高度（单位：px）| `number` | `100`
treshold | 下拉范围有效（单位：%） | `number` | `80`
