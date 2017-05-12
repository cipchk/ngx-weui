import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ActionSheetConfig, ActionSheetComponent } from "./index";
import { Observable, Observer } from "rxjs/Rx";

declare const document: any;

@Injectable()
export class ActionSheetService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    /**
     * 创建一个弹出式菜单并显示
     * 
     * @param {Array} menus 菜单内容
     * @param {ActionSheetConfig} [config] 配置性（可选）
     * @returns {Observable<any>} 
     */
    show(menus: { text?: string, [key: string]: any }[], config?: ActionSheetConfig): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(ActionSheetComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        componentRef.instance.menus = menus;
        if (config) componentRef.instance.config = config;
        componentRef.instance.close.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        return componentRef.instance.show();
    }
}
