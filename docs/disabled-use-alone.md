---
title: 为什么不提供模块单独引入
order: 4
---

`ngx-weui` 打包时会根据代码中使用的模块 Tree Shaking，未使用的模块并不会打包进生成的应用中，因此单模块引入是完全没有任何必要的。

因此，你只需要在根模块导入一次：

```ts
// app.module.ts
@NgModule({
  imports: [ WeUiModule.forRoot() ]
});
```

以及，对于子模块可以在 `SharedModuled` 导入&导出，确保所有子模块也可以使用 `ngx-weui`。

```ts
// shared.module.ts
@NgModule({
  imports: [ WeUiModule ], // 无须再使用 `.forRoot()`
  exports: [ WeUiModule ]
});
```
