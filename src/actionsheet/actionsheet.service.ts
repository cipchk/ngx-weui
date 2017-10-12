import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Observable, Observer } from "rxjs/Rx";
import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetConfig } from './actionsheet.config';
import { BaseService } from '../utils/base.service'

@Injectable()
export class ActionSheetService extends BaseService {
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) {
        super(resolver, applicationRef, injector);
    }

    /**
     * 创建一个弹出式菜单并显示
     *
     * @param {Array} menus 菜单内容
     * @param {ActionSheetConfig} [config] 配置性（可选）
     * @returns {Observable<any>} 可订阅来获取结果
     */
    show(menus: { text?: string, [key: string]: any }[], config?: ActionSheetConfig): Observable<any> {
        let componentRef = this.build(ActionSheetComponent);

        componentRef.instance.menus = menus;
        if (config) componentRef.instance.config = config;
        componentRef.instance.close.subscribe(() => {
            setTimeout(() => {
                this.destroy(componentRef);
            }, 100)
        });
        return componentRef.instance.show();
    }
}
