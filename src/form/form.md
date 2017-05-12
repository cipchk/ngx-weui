/**
 * 文本框，指令是对文本框格式校验（邮箱、手机、身份证等）、视觉效果的增强而已
 * 
 * @example
 * 1、必填手机号，同时带有视觉效果
 * <input type="tel" weui-input="mobile" weui-required>
 * 2、自定义银行卡号
 * <input type="tel" weui-input="number" weui-requied weui-regex="[0-9]*" [(ngModel)]="res.no" name="no">
 */

/**
 * 文本域字数统计
 * @example 
 *  <textarea weui-textarea weui-cn="2" maxlength="20"></textarea>
 */

 * @example
 * <button [weui-vcode]="onSendCode" weui-seconds="10" weui-tpl="${num}s" weui-error="重新发送">获取验证码</button>
