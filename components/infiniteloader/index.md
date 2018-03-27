---
title: weui-infiniteloader
subtitle: 滚动加载
config: InfiniteLoaderConfig
module: InfiniteLoaderModule
---

用于无限滚动加载列表。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
config | 配置项 | `InfiniteLoaderConfig` | -
menus | 菜单内容  | `{ text?: string, [key: string]: any }[]` | -
loadmore | 加载更多回调 | `EventEmitter<InfiniteLoaderComponent>` | -
resolveLoading() | 设置本次加载完成 | - | -
setFinished() | 设置结束 | - | -
restart() | 设置重新开始 | - | -

### InfiniteLoaderConfig

参数 | 说明 | 类型 | 默认值
----|------|-----|------
height | 容器高度 | `string` | `100vh`
percent | 滚动至 `x%` 时触发加载  | `number` | `75`
loading | 加载中文本（支持HTML） | `string` | -
finished | 完成所有数据加载文本（支持HTML） | `string` | -
throttle | 滚动节流时长（单位：ms） | `number` | `100`
