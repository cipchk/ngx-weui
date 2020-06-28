import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { BaseService } from 'ngx-weui/core';
import { Observable } from 'rxjs';
import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetConfig } from './actionsheet.config';
import { ActionSheetMenuItem } from './actionsheet.types';

@Injectable({ providedIn: 'root' })
export class ActionSheetService extends BaseService {
  constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, @Inject(DOCUMENT) doc: any) {
    super(resolver, applicationRef, injector, doc);
  }

  /**
   * 创建一个弹出式菜单并显示
   *
   * @param menus 菜单内容
   * @param config 配置性（可选）
   * @returns 可订阅来获取结果
   */
  show(menus: ActionSheetMenuItem[], config: ActionSheetConfig = {}): Observable<ActionSheetMenuItem> {
    const componentRef = this.build(ActionSheetComponent);

    componentRef.instance.menus = menus;
    componentRef.instance.config = config;
    componentRef.instance.close.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    return componentRef.instance.show();
  }
}
