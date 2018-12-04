import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

import { isAndroid } from '../utils/browser';
import { DialogConfig } from './dialog.config';

/**
 * 对话框，依赖于 `weui-textarea`、`weui-slider`
 *
 * 关于 `input==='prompt'` 若干细节：
 *  + 对话框内放表单在weui的表现并不是很如意，因此，在对话框增加 `.weui-dialog__prompt` 样式类名，请自行针对性进行一些样式的覆盖，`ngx-dialog` 不提供任何样式的修正。
 *  + 对于录入型表单其校验机制全都是依赖于正则，默认情况下内置 `email`、`url` 两种表单类型的正则。
 */
@Component({
  selector: 'weui-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnDestroy {
  private _config: DialogConfig;
  /**
   * 对话框配置项
   */
  @Input()
  set config(value: DialogConfig) {
    const config = Object.assign(
      {
        backdrop: false,
      },
      this.DEF,
      value,
    );

    if (config.skin === 'auto') {
      config.skin = isAndroid() ? 'android' : 'ios';
    }
    // 重组btns
    if (!config.btns) {
      config.btns = [];
      if (config.cancel) {
        config.btns.push({
          text: config.cancel,
          type: config.cancelType,
          value: false,
        });
      }
      if (config.confirm) {
        config.btns.push({
          text: config.confirm,
          type: config.confirmType,
          value: true,
        });
      }
    }

    // prompt
    if (config.type === 'prompt') {
      // 一些默认校验正则表达式
      if (!config.inputRegex) {
        switch (config.input) {
          case 'email':
            config.inputRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!config.inputError) config.inputError = '邮箱格式不正确';
            break;
          case 'url':
            config.inputRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!config.inputError) config.inputError = '网址格式不正确';
            break;
        }
      }

      config.inputOptions = Object.assign([], config.inputOptions);
      config.inputAttributes = Object.assign(
        {
          maxlength: null,
          min: 0,
          max: 100,
          step: 1,
        },
        config.inputAttributes,
      );
      // 默认值
      let defaultValue = config.inputValue;
      if (config.input === 'checkbox' && !Array.isArray(config.inputValue)) {
        defaultValue =
          typeof defaultValue !== 'undefined' ? [defaultValue] : [];
      }
      config.inputValue = defaultValue || '';

      this._promptData = config.inputValue;
      if (this._promptData) {
        this._config = config;
        this.promptCheck();
      }

      setTimeout(() => {
        this.setFocus();
      }, 100);
    }
    this._config = config;
  }

  get config(): DialogConfig {
    return this._config;
  }

  /**
   * 打开动画结束后回调（唯一参数：对话框实例对象）
   */
  @Output() open = new EventEmitter<DialogComponent>();

  /**
   * 关闭动画开始时回调（唯一参数：对话框实例对象）
   */
  @Output() close = new EventEmitter<DialogComponent>();

  private observer: Observer<any>;

  _shown: boolean = false;

  constructor(private DEF: DialogConfig) { }

  @ViewChild('container') container: any;
  _prompError: boolean = false;
  _promptData: any;

  private promptCheck(): boolean {
    if (this.config.inputRequired === true) {
      if (this.config.input === 'checkbox' && this._promptData.length === 0) {
        this._prompError = true;
        return false;
      }
      if (!this._promptData) {
        this._prompError = true;
        return false;
      }
    }

    if (
      this.config.inputRegex &&
      !this.config.inputRegex.test(this._promptData.toString())
    ) {
      this._prompError = true;
      return false;
    }

    this._prompError = false;
    return true;
  }

  private setFocus() {
    const containerEl = this.container.nativeElement;
    let firstFormEl: any = null;
    if (this.config.type === 'prompt') {
      firstFormEl = containerEl.querySelector('input, textarea, select');
    } else {
      firstFormEl = containerEl.querySelector('.weui-dialog__btn_primary');
    }
    if (firstFormEl) firstFormEl.focus();
  }

  _chanage() {
    this.promptCheck();
  }

  _keyup(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this._onSelect();
    }
  }

  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   *
   * @returns 当 `type==='prompt'` 时会多一 `result` 属性表示结果值
   */
  show(): Observable<any> {
    this._shown = true;
    this._prompError = false;
    // 模拟动画结束后回调
    setTimeout(() => {
      this.open.emit(this);
    }, 300);
    return Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param is_backdrop 是否从背景上点击
   */
  hide(is_backdrop: boolean = false) {
    if (is_backdrop === true && this.config.backdrop === false) return false;

    this._shown = false;
    this.close.emit(this);
  }

  _onSelect(menu?: any) {
    // 未指定时查找 `value===true` 的按钮
    if (!menu && this.config.btns.length > 0) {
      menu = this.config.btns.find(w => w.value === true);
    }
    const ret = menu;
    if (menu.value === true && this._config.type === 'prompt') {
      if (!this.promptCheck()) return false;
      ret.result = this._promptData;
    }
    this.observer.next(ret);
    this.observer.complete();
    this.hide();
    return false;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (<Subscription>this.observer).unsubscribe();
    }
  }
}
