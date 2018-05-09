---
title: ngx-weui 样式
---

## 写在前面

`ngx-weui` 提供一种高度定制化的方案，这些定制包括 `weui` 的主体字体、颜色、各部件等。

> **注：** `weui` 是由 Less 编写的，因此应用也必须 Less 才能覆盖。

默认 `ngx-weui` 并没有强制依赖 `weui`，这是因为在某些特殊场景下可能会由于 `package.json` 的入口关系导致失败。因此在使用样式之前必须先安装 `weui` 依赖包：

```bash
npm i --save weui
```

最后，在项目 `styles.less` 里加入 `weui` 和 `ngx-weui` 样式：

```less
@import '~weui/src/style/weui.less';
@import '~ngx-weui/index';
```

## 自定义主题

只需要在 `styles.less` 加入相应的要覆盖的参数即可，例如：你想改变字体和主按钮的背景色为红色：

```less
@weuiFontDefault: "Helvetica Neue";
@weuiBtnPrimaryBg: #f50;
```

`weui` 包含着几十种参数这些参数你可以通过 [variable](https://github.com/Tencent/weui/tree/master/src/style/base/variable) 目录下获得，每一个文件分布都非常简单明了。

`ngx-weui` 也包含十几种参数，这些包括：

| 名称 | 默认值 | 描述
| ---- | ----- | ----
| @dialog-error-font-size | `14px` | 对话框错误字号
| @dialog-error-color | `#f50` | 对话框错误颜色
| @pagination-dot-wh | `8px` | 小点样式分页器大小
| @pagination-dot-bg | `#ccc` | 小点样式分页器背景色
| @pagination-dot-active-bg | `#888` | 小点样式分页器当前背景色
| @popup-bg | `#efeff4` | 弹出视图背景色
| @popup-head-bg | `#fbf9fe` | 弹出视图标题背景色
| @popup-head-padding | `10px 15px` | 弹出视图标题内边距
| @popup-head-border-bottom-color | `#e5e5e5` | 弹出视图标题底部线条色
| @popup-head-color | `#e5e5e5` | 弹出视图标题色
| @popup-head-action-color | `#586c94` | 弹出视图标题按钮色
| @stepper-wh | `30px` | 步进器按钮宽高
| @stepper-input-width | `60px` | 步进器输入框宽度
| @stepper-color | `rgb(134, 134, 134)` | 步进器按钮颜色
| @stepper-font-size | `20px` | 步进器文字大小
| @toptips-bg-default | `#B2B2B2` | 弹出式提示 `default` 背景色
| @toptips-bg-info | `#586C94` | 弹出式提示 `info` 背景色
| @toptips-bg-primary | `#1AAD19` | 弹出式提示 `primary` 背景色
| @gutter | `8px` | 间距
| @preserve-white-spaces-enabled | `true` | 是否开启 `preserveWhitespaces: false` 时强制对两个相邻按钮 `@gutter` 间距
