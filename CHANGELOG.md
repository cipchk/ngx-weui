## [10.0.2](https://github.com/cipchk/ngx-weui/compare/10.0.1...10.0.2) (2020-08-20)


### Bug Fixes

* **module:ptr:** fix 取消滚动时报错 ([#171](https://github.com/cipchk/ngx-weui/issues/171)) ([2b2b37d](https://github.com/cipchk/ngx-weui/commit/2b2b37debc8e94a56ef17b8483669f1b8629e1ba))



## [10.0.2](https://github.com/cipchk/ngx-weui/compare/10.0.1...10.0.2) (2020-08-20)


### Bug Fixes

* **module:ptr:** fix 取消滚动时报错 ([#171](https://github.com/cipchk/ngx-weui/issues/171)) ([2b2b37d](https://github.com/cipchk/ngx-weui/commit/2b2b37debc8e94a56ef17b8483669f1b8629e1ba))



## [10.0.1](https://github.com/cipchk/ngx-weui/compare/10.0.0...10.0.1) (2020-07-09)


### Features

* **module:tab:** `icon` support valid image resoure url ([#168](https://github.com/cipchk/ngx-weui/issues/168)) ([c66bfc7](https://github.com/cipchk/ngx-weui/commit/c66bfc72b5a845621ae59b5447531b6e5aac4c21))



# [10.0.0](https://github.com/cipchk/ngx-weui/compare/9.0.0...10.0.0) (2020-07-09)


### Features

* **module:picker:** add `className` property of options ([#164](https://github.com/cipchk/ngx-weui/issues/164)) ([e4e6f0e](https://github.com/cipchk/ngx-weui/commit/e4e6f0e5490944b3a22d6fe8db6019ba22b74e0b))



# [10.0.0-rc.1](https://github.com/cipchk/ngx-weui/compare/9.0.0...10.0.0-rc.1) (2020-07-08)


### Features

* **module:picker:** add `className` property of options ([#164](https://github.com/cipchk/ngx-weui/issues/164)) ([e4e6f0e](https://github.com/cipchk/ngx-weui/commit/e4e6f0e5490944b3a22d6fe8db6019ba22b74e0b))
* angular 10 ([4655b41](https://github.com/cipchk/ngx-weui/commit/4655b4177dc7634fe8cf89e1f1254bef47ff8469))



# [9.1.0](https://github.com/cipchk/ngx-weui/compare/9.0.0...9.1.0) (2020-07-08)


### Features

* **module:picker:** add `className` property of options ([#164](https://github.com/cipchk/ngx-weui/issues/164)) ([e4e6f0e](https://github.com/cipchk/ngx-weui/commit/e4e6f0e5490944b3a22d6fe8db6019ba22b74e0b))



# [9.0.0](https://github.com/cipchk/ngx-weui/compare/8.0.0...9.0.0) (2020-06-28)

`9.0.0` 主要是同步更新 WeUI 的 `2.3` 以上版本（受限于 [#858](https://github.com/Tencent/weui/issues/858) 可能与官网看到的暗黑主题色有出入），新增 `dark` 模式。

更多关于样子优化细节，请参考 WeUI 的 [变更日志](https://github.com/Tencent/weui/edit/master/CHANGELOG.md)。

### 暗黑模式

默认为暗黑系（不清楚 TX 怎么想的），可在 `body` 添加属性 `data-weui-theme` 来控制，值为`light`、`dark`，例如：

```html
<body data-weui-theme="light">
```

### Bug Fixes

* 修复多列选择器在 `2.3` 下的适配
* 修复上传组件 `FileItem.index` 始终为 `0`
* 修复日期组件选择后出现 `Cannot read property 'target' of undefined`
* 修复滚动加载组件未重置滚动位置，导致重复加载数据
* 修复滚动加载设置完全完毕依然持续 `loadin` 效果

### Breaking Changes

* **weui-button** 移除 `plain` 属性，可直接使用默认来代替
