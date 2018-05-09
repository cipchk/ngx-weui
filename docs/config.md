---
title: 全局默认配置项说明
order: 2
---

有一些模块（比如：actionsheet、button等），虽然已经有一些默认的配置，但你可以通过全局注册来改变它。

比如，默认按钮的类型是 `primary`（成功样式）。

```html
<weui-button>成功样式按钮</weui-button>
<weui-button weui-type="warn">警告样式按钮</weui-button>
```

可以在NgModule改变默认配置项，默认所有按钮为警告样式。

```typescript
import { NgModule } from '@angular/core';
import { WeUiModule, ButtonConfig } from 'ngx-weui';

export function buttonConfig() {
    return Object.assign(new ButtonConfig(), { type: 'warn' });
}

@NgModule({
    imports: [
        WeUiModule.forRoot()
    ],
    providers: [
        // 重置默认按钮样式为：warn
        { provide: ButtonConfig, useFactory: buttonConfig }
    ]
})
```

这种方式，可以简化通用操作。

**是否允许全局配置的模块，可以在API文档中见【可用于[全局配置]】字样的类，都属性可用于全局配置类。**
