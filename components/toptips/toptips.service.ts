import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { BaseService } from 'ngx-weui/core';
import { ToptipsComponent, ToptipsType } from './toptips.component';

@Injectable({ providedIn: 'root' })
export class ToptipsService extends BaseService {
  constructor(
    protected readonly resolver: ComponentFactoryResolver,
    protected readonly applicationRef: ApplicationRef,
    protected readonly injector: Injector,
    @Inject(DOCUMENT) protected readonly doc: any,
  ) {
    super();
  }

  /**
   * 构建一个Toptips并显示
   *
   * @param text 文本
   * @param type 类型
   * @param 显示时长后自动关闭（单位：ms）
   */
  show(text: string, type: ToptipsType, time: number = 2000): ToptipsComponent {
    const componentRef = this.build(ToptipsComponent);

    if (type) {
      componentRef.instance.type = type;
    }
    if (text) {
      componentRef.instance.text = text;
    }
    componentRef.instance.time = time;
    componentRef.instance.hide.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    return componentRef.instance.onShow();
  }

  /**
   * 构建一个Warn Toptips并显示
   *
   * @param text 文本
   * @param time 显示时长后自动关闭（单位：ms）
   */
  warn(text: string, time: number = 2000): ToptipsComponent {
    return this.show(text, 'warn', time);
  }

  /**
   * 构建一个Info Toptips并显示
   *
   * @param text 文本
   * @param time 显示时长后自动关闭（单位：ms）
   */
  info(text: string, time: number = 2000): ToptipsComponent {
    return this.show(text, 'info', time);
  }

  /**
   * 构建一个Primary Toptips并显示
   *
   * @param text 文本
   * @param time 显示时长后自动关闭（单位：ms）
   */
  primary(text: string, time: number = 2000): ToptipsComponent {
    return this.show(text, 'primary', time);
  }

  /**
   * 构建一个Success Toptips并显示
   *
   * @param text 文本
   * @param time 显示时长后自动关闭（单位：ms）
   */
  success(text: string, time: number = 2000): ToptipsComponent {
    return this.show(text, 'primary', time);
  }

  /**
   * 构建一个Default Toptips并显示
   *
   * @param text 文本
   * @param time 显示时长后自动关闭（单位：ms）
   */
  default(text: string, time: number = 2000): ToptipsComponent {
    return this.show(text, 'default', time);
  }
}
