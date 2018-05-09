import {
  Directive,
  Input,
  Renderer,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  Validator,
  AbstractControl,
  Validators,
  NG_VALIDATORS,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { findParent, add, remove } from '../utils/dom';

/**
 * 文本框，指令是对文本框格式校验（邮箱、手机、身份证等）、视觉效果的增强而已
 */
@Directive({
  selector: '[weui-input]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDirective),
      multi: true,
    },
  ],
})
export class InputDirective implements OnInit, OnChanges, Validator {
  private parentEl: any;
  private ftEl: any;
  private pattern: RegExp;
  private _validator: ValidatorFn;
  private _onChange: () => void;

  /**
   * 文本框类型，**不等同于** <intpu type="text"> 的值
   * 因为 weui-input 属性只是内置格式校验的简洁写法而已。
   * 内置包括：number/digit(允许小数点)/qq/email/tel/mobile/idcard，如需要更为复杂的校验可以使用 weui-regex
   */
  @Input('weui-input') inputType: string;
  /**
   * 格式校验正则表达式，优先级高于 [weui-input]。
   */
  @Input('weui-regex') inputRegex: RegExp | string;

  /**
   * 是否必填项，**等同于** <intpu required> 的值，当值必填时会有视觉效果
   */
  @Input('weui-required') required: 'info' | 'warn' | 'waiting' = 'warn';

  /**
   * 是否自动清除内容中的空格
   */
  @Input('weui-cleaner') cleaner: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.parentEl = findParent(this.el.nativeElement, '.weui-cell');
    if (!this.parentEl) {
      console.error('父DOM结构至少必须包含一个.weui-cell');
      return ;
    }
    // 检查是否有 weui-cell__ft
    this.ftEl = add(this.parentEl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._createValidator();
    if (this._onChange) this._onChange();
  }

  private _createValidator(): void {
    let regex: RegExp = null;
    if (this.inputRegex) {
      if (typeof this.inputRegex === 'string') {
        regex = new RegExp(`^${this.inputRegex}$`);
      } else {
        regex = this.inputRegex;
      }
    } else {
      // 默认行为
      if (this.inputType) {
        switch (this.inputType) {
          case 'qq':
          case 'number':
            regex = /^[0-9]+$/;
            break;
          case 'digit':
            regex = /^[.0-9]+$/;
            break;
          case 'tel':
            regex = /^[-.0-9]+$/;
            break;
          case 'email':
            regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.cleaner = true;
            break;
          case 'mobile':
            regex = /^1[0-9]{10}$/;
            this.cleaner = true;
            break;
          case 'idcard': // 身份证
            regex = /^[X0-9]{15,18}$/;
            this.cleaner = true;
            break;
        }
      }
    }

    this._validator = (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value;
      if (value == null || value.length === 0) {
        if (this.required !== undefined)
          return { icon: this.required, type: 'required', actualValue: value };

        return null;
      }
      if (this.cleaner && value.includes(' ')) {
        value = value.replace(/ /g, '');
        control.setValue(value, { emitEvent: false });
      }
      return regex === null || regex.test(value)
        ? null
        : { icon: 'warn', type: 'regex', actualValue: value };
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const ret = this._validator(c);
    if (ret === null) {
      this.parentEl.classList.remove('weui-cell_warn');
      remove(this.ftEl, 'i');
    } else {
      remove(this.ftEl, 'i');
      this.parentEl.classList.add('weui-cell_warn');
      const icon = `weui-icon-${ret.icon}`;
      add(this.ftEl, '.' + icon, 'i', icon);
    }
    return ret;
  }
}
