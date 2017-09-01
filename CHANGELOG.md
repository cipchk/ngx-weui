# 1.0.15

- [增] `weui-stepper`、`weui-pagination` 组件
- [修] `check-list` 指令 `ExpressionChangedAfterItHasBeenCheckedError` BUG
- [优] `weui-infiniteloader` 修正一些细节，调整默认节流值至 `100` 改善触发能力
- [优] 将组件样式外部化
- [优] 增强demo视觉效果

# 1.0.14

- [增] `weui-dialog` 支持可输入类型。
- [增] `weui-checklist` checkbox选择项。

# 1.0.13

- [增] `weui-actionsheet`、`weui-dialog`、`weui-picker`、`weui-toast`、`weui-toptips` 组件对应的Service类增加 `destroy`、`destroyAll` 方法用于强制销毁组件。

# 1.0.12

- [增] `weui-rating` 评分组件

# 1.0.10

## Bug Fixes

- **weui-date-picker** 使用 Service 方式打开后，会出现 `input` 表单问题。 ([#20](https://github.com/cipchk/ngx-weui/issues/20))

# 1.0.9

## Bug Fixes

- **weui-date-picker** 无法初始化默认值 ([#19](https://github.com/cipchk/ngx-weui/issues/19))

# 1.0.8

- [增] `weui-mask` 组件。
- [优] `weui-dialog` 内容支持HTML，新增 `open` 回调。

# 1.0.7

- [增] `weui-accordion` 手风琴组件 ([#9](https://github.com/cipchk/ngx-weui/issues/9))
- [增] `weui-ptr` 组件增加 `disabled` 属性 ([#10](https://github.com/cipchk/ngx-weui/issues/10))

# 1.0.6

- [增] `UploaderOptions.abortTransport` 自定义上传接口，当用户中止时回调

## Bug Fixes

- **Uploader** `auto:true` ([#8](https://github.com/cipchk/ngx-weui/issues/8))


# 1.0.5

- [增] 微信JS-SDK。
- [优] 去掉 `ngx-weui` 核心类库版本依赖。
- [优] 优化文档显示效果。
- [升] 升级angular cli至1.1.1；升级angular至4.1.3。

# 1.0.4

## Bug Fixes

- **InfiniteLoader** 组件设置标签默认为 `display:block`。 ([#3](https://github.com/cipchk/ngx-weui/issues/3))
