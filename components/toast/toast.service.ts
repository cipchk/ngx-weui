import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { BaseService } from 'ngx-weui/core';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService extends BaseService {
  constructor(
    protected readonly resolver: ComponentFactoryResolver,
    protected readonly applicationRef: ApplicationRef,
    protected readonly injector: Injector,
    @Inject(DOCUMENT) protected readonly doc: any,
  ) {
    super();
  }

  /**
   * 构建toast并显示
   *
   * @param [text] 文本（可选）
   * @param [time] 显示时长后自动关闭（单位：ms），0 表示永久（可选）
   * @param [icon] icon图标Class名（可选）
   * @param [type] 类型（可选）
   */
  show(text?: string, time?: number, icon?: string, type?: 'success' | 'loading'): ToastComponent {
    const componentRef = this.build(ToastComponent);

    if (type) {
      componentRef.instance.type = type;
    }
    if (text) {
      componentRef.instance.text = text;
    }
    if (icon) {
      componentRef.instance.icon = icon;
    }
    if (typeof time === 'number') {
      componentRef.instance.time = time;
    }
    componentRef.instance.hide.subscribe(() => {
      setTimeout(() => {
        componentRef.destroy();
      }, 300);
    });
    return componentRef.instance.onShow();
  }

  /**
   * 关闭最新toast
   */
  hide(): void {
    this.destroy();
  }

  /**
   * 构建成功toast并显示
   *
   * @param [text] 文本（可选）
   * @param [time] 显示时长后自动关闭（单位：ms）（可选）
   * @param [icon] icon图标Class名（可选）
   */
  success(text?: string, time?: number, icon?: string): ToastComponent {
    return this.show(text, time, icon, 'success');
  }

  /**
   * 构建加载中toast并显示
   *
   * @param [text] 文本（可选）
   * @param [time] 显示时长后自动关闭（单位：ms）（可选）
   * @param [icon] icon图标Class名（可选）
   */
  loading(text?: string, time?: number, icon?: string): ToastComponent {
    return this.show(text, time, icon, 'loading');
  }
}
