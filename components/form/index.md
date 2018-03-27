---
subtitle: 表单输入
module: FormModule
---

表单元素。

## API

### weui-input

按钮。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
weui-input | 文本框类型，**不等同于** `<intpu type="text">` 的值，因为 `weui-input` 属性只是内置格式校验的简洁写法而已，内置包括：number/digit(允许小数点)/qq/email/tel/mobile/idcard，如需要更为复杂的校验可以使用 `weui-regex` | `InputType` | -
weui-regex | 格式校验正则表达式，优先级高于 `[weui-input]` | `RegExp, string` | -
weui-required | 是否必填项，**等同于** `<intpu required>` 的值，当值必填时会有视觉效果 | `info,warn,waiting` | `warn`
weui-cleaner | 是否自动清除内容中的空格 | `boolean` | `false`

### weui-checklist

复选列表项。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
weui-checklist | 存储已选列表 | `any[]` | -
weui-value | 值打勾时写入 `weui-checklist` | `any` | -

一个完整的使用示例如下：

```html
<label class="weui-cell weui-check__label" *ngFor="let item of checkbox">
    <div class="weui-cell__hd">
        <input type="checkbox" class="weui-check" [weui-checklist]="result" name="radio1" [weui-value]="item">
        <i class="weui-icon-checked"></i>
    </div>
    <div class="weui-cell__bd">
        <p>{{item}}</p>
    </div>
</label>
```

### weui-vcode

获取验证码。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
weui-vcode | 发送事件 | `() => Observable<boolean>` | -
weui-seconds | 时长（单位：秒） | `number` | `60`
weui-tpl | 倒计时模板，使用 `${num}` 表示当前秒数 | `string` | `${num} 秒`
weui-error | 重新发送提醒文本 | `string` | `重新发送`

### weui-textarea

文本域字数统计。

参数 | 说明 | 类型 | 默认值
----|------|-----|------
maxlength | 最大长度，0表示不受限 | `number` | `0`
weui-cn | 中文部分应该算多少个字符，使用 `/[^\x00-\xff]/g` 正则表达式统计中文部分（默认：1个字符） | `number` | `1`
