---
title: 如何使用？
---

## 安装

```bash
npm install ngx-weui --save
```

`ngx-weui` 是不带任何weui样式，因此还需要分别打开加载 `weui` 和 `ngx-weui` 样式。

**weui样式**

方式一：使用CDN，在 `index.html` 头部加上：

```html
<!-- index.html -->
<link href="//res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css" rel="stylesheet">
```

方式二：安装 `weui` 依赖包，并在 `.angular-cli.json` 的 `styles` 节点加入对应路径：

```json
"styles": [
    "../node_modules/weui/dist/style/weui.css"
]
```

**ngx-weui样式**

打开 `src/styles.scss` 在顶部加入：

```css
@import '~ngx-weui/index';
```

## 模块注册

`ngx-weui` 默认情况下可以直接使用：

```typescript
import { WeUiModule } from 'ngx-weui';

@NgModule({
    imports: [ WeUiModule.forRoot() ]
})
export class AppModule { }
```

注册所有的模块。

当然，如果你明确知道只使用其中几个模块的话，可以针对模块进行导入，比如导入一个弹出式菜单模块：

```typescript
import { ActionSheetModule } from 'ngx-weui/actionsheet';

@NgModule({
    imports: [ ActionSheetModule.forRoot() ]
})
export class AppModule { }
```

## 全局模块配置注册

[细节见](/docs/config)

## HTML模板使用

几个写法：

```html
<!--按钮-->
<button weui-button>页面主操作 Normal</button>
<weui-button weui-loading (click)="loading=!loading">页面主操作 Loading</weui-button>
<!--弹出式菜单-->
<weui-actionsheet #ios [menus]="menus" [config]="config"></weui-actionsheet>
```

## 命名说明

看着HTML模板中组件名、属性名的命名有的是以 `weui-` 开头，而有的并没有。其实，很容易理解这些区别。

1. 所有组件、指令都**需要** `weui-` 开头。
2. 指令所需要的属性都**需要** `weui-` 开头。
3. 组件只允许标签（指：`<weui-actionsheet></weui-actionsheet>`）写法都**不需要** `weui-` 开头。
