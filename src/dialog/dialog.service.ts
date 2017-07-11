import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { DialogConfig, DialogComponent } from "./index";
import { Observable, Observer } from "rxjs/Rx";

declare const document: any;

@Injectable()
export class DialogService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    /**
     * 创建一个对话框并显示
     *
     * @param {DialogConfig} data 对话框配置项
     * @returns {Observable<any>}
     */
    show(data: DialogConfig): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(DialogComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        componentRef.instance.config = data;
        componentRef.instance.close.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 300)
        });
        return componentRef.instance.show();
    }
}
