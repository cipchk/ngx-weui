---
subtitle: 选项卡
module: TabModule
---

选项卡，分别 `weui-navbar` 顶部选项卡和 `weui-tabbar` 底部选项卡，其API参数都相同。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
heading | 选项卡名称 | `string` | -
disabled | 是否禁用 | `boolean` | -
icon | icon图标，支持HTML | `string` | -
badge | 徽章内容，支持数字或圆点 | `number,'dot'` | -
active | 是否激活 | `boolean` | -
select | 当tab激活时触发 | `EventEmitter<TabDirective>` | -
deselect | 当tab无效时触发 | `EventEmitter<TabDirective>` | -
removed | 当tab移除时触发 | `EventEmitter<TabDirective>` | -
