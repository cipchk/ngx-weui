# 全局默认配置项说明


```typescript
import { NgModule } from '@angular/core';
import { WeUiModule, ButtonConfig } from 'ngx-weui';

@NgModule({
    imports: [
        WeUiModule.forRoot()
    ],
    providers: [
        // 重置默认按钮样式为：warn
        { provide: ButtonConfig, useFactory: ()=> { return Object.assign(new ButtonConfig(), { type: 'warn' }); } }
    ]
})
```
