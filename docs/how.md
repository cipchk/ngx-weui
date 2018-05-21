---
title: 如何使用？
order: 1
---

## 创建项目

1、安装全局 `angular-cli`：

```bash
npm install -g @angular/cli
# 可选：设置默认使用 yarn 来安装依赖包
# ng config -g cli.packageManager yarn
```

2、创建空项目

```bash
# 指定 less 样式
ng new demo --style less
cd demo
```

3、添加 `ngx-weui`

```bash
ng add ngx-weui
```

## 全局模块配置注册

[细节见](/docs/config)

## HTML模板使用

几种写法：

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
