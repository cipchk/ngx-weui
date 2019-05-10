import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { updateHostClass, ButtonType, InputBoolean } from 'ngx-weui/core';
import { ButtonConfig } from './button.config';

@Component({
  selector: 'weui-button, [weui-button]',
  exportAs: 'weuiButton',
  host: {
    '[attr.disabled]': 'disabled ? "disabled" : null',
  },
  template: '<i class="weui-loading" *ngIf="loading"></i><ng-content></ng-content>',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit, OnChanges {
  /**
   * 操作场景：primary、default、warn，默认：`primary`
   */
  @Input('weui-type') type: ButtonType = 'primary';

  /**
   * 是否加载状态
   */
  @Input('weui-loading') @InputBoolean() loading: boolean = false;

  /**
   * 是否小号
   */
  @Input('weui-mini') @InputBoolean() mini: boolean = false;

  /**
   * 镂空按钮
   */
  @Input('weui-plain') @InputBoolean() plain: boolean = false;

  /**
   * 单元格按钮
   */
  @Input('weui-cell') @InputBoolean() cell: boolean = false;

  /**
   * Block 按钮
   */
  @Input('weui-block') @InputBoolean() block: boolean = false;

  /**
   * 禁用状态
   */
  @Input() @InputBoolean() disabled: boolean = false;

  constructor(_config: ButtonConfig, private el: ElementRef, private renderer: Renderer2) {
    Object.assign(this, _config);
  }

  private setClassMap(): void {
    const prefixCls = 'weui-btn';
    const { el, renderer, type, plain, cell, disabled, block, mini, loading } = this;
    const median = plain ? 'plain' : cell ? 'cell' : '';
    updateHostClass(el.nativeElement, renderer, {
      [`${prefixCls}`]: !cell,
      [`${prefixCls}_cell`]: cell,
      [`${prefixCls}_disabled`]: !plain && disabled,
      [`${prefixCls}_block`]: block,
      [`${prefixCls}_mini`]: mini,
      [`${prefixCls}_${median}-${type}`]: median,
      [`${prefixCls}_${type}`]: !median,
      [`${prefixCls}_loading`]: loading,
      [`${prefixCls}_plain-disabled`]: plain && disabled,
    });
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(): void {
    this.setClassMap();
  }
}
