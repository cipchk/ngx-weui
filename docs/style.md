---
title: ngx-weui 样式
---

## 写在前面

`ngx-weui` 是不带任何weui样式，因此还需要加载样式，打开 `src/styles.scss`：

```css
@import '~weui/dist/style/weui.css';
@import '~ngx-weui/index';
```

上面两条 `@import` 命令，前者为 `weui` 样式，后者为 `ngx-weui` 针对部分组件特有的样式，它包括若干样式参数，你可以两条命令前前重新覆盖它们，例如：

```css
$toptips-bg-primary: #f50;

/* You can add global styles to this file, and also import other style files */
@import '~weui/dist/style/weui.css';
@import '~ngx-weui/index';
```

## 参数

| 名称 | 默认值 | 描述
| ---- | ----- | ----
| $dialog-error-font-size | `14px` | 对话框错误字号
| $dialog-error-color | `#f50` | 对话框错误颜色
| $pagination-dot-wh | `8px` | 小点样式分页器大小
| $pagination-dot-bg | `#ccc` | 小点样式分页器背景色
| $pagination-dot-active-bg | `#888` | 小点样式分页器当前背景色
| $popup-bg | `#efeff4` | 弹出视图背景色
| $popup-head-bg | `#fbf9fe` | 弹出视图标题背景色
| $popup-head-padding | `10px 15px` | 弹出视图标题内边距
| $popup-head-border-bottom-color | `#e5e5e5` | 弹出视图标题底部线条色
| $popup-head-color | `#e5e5e5` | 弹出视图标题色
| $popup-head-action-color | `#586c94` | 弹出视图标题按钮色
| $stepper-wh | `30px` | 步进器按钮宽高
| $stepper-input-width | `60px` | 步进器输入框宽度
| $stepper-color | `rgb(134, 134, 134)` | 步进器按钮颜色
| $stepper-font-size | `20px` | 步进器文字大小
| $toptips-bg-default | `#B2B2B2` | 弹出式提示 `default` 背景色
| $toptips-bg-info | `#586C94` | 弹出式提示 `info` 背景色
| $toptips-bg-primary | `#1AAD19` | 弹出式提示 `primary` 背景色
