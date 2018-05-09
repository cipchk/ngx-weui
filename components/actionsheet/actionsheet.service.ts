import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  Optional,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { Observer, Observable } from 'rxjs';

import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetConfig } from './actionsheet.config';
import { BaseService } from '../utils/base.service';

@Injectable()
export class ActionSheetService extends BaseService {
  constructor(
    resolver: ComponentFactoryResolver,
    applicationRef: ApplicationRef,
    injector: Injector,
  ) {
    super(resolver, applicationRef, injector);
  }

  /**
   * 创建一个弹出式菜单并显示
   *
   * @param menus 菜单内容
   * @param config 配置性（可选）
   * @returns 可订阅来获取结果
   */
  show(
    menus: { text?: string; [key: string]: any }[],
    config: ActionSheetConfig = {},
  ): Observable<any> {
    const componentRef = this.build(ActionSheetComponent);

    componentRef.instance.menus = menus;
    if (config) componentRef.instance.config = config;
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    return componentRef.instance.show();
  }
}
