# 使用介绍

## 安装

```bash
npm install ngx-weui --save
```

`ngx-weui` 是不带任何weui样式的，所以你还需要导入weui.css文件。比如直接在 `index.html` 里加载官方CDN。

```html
<!-- index.html -->
<link href="//res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css" rel="stylesheet">
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

当然，如果你明确知道只使用其中几个模块的话，可以针对模块进行导入，这样也可以简化包大小，比如导入一个弹出式菜单模块：

```typescript
import { ActionSheetModule } from 'ngx-weui/actionsheet';

@NgModule({
    imports: [ ActionSheetModule.forRoot() ]
})
export class AppModule { }
```

## 全局模块配置注册

[细节见](https://github.com/cipchk/ngx-weui/blob/master/docs/config.md)

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
