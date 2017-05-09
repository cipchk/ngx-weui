import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ToastComponent } from "./index";
import { Observable, Observer } from "rxjs/Rx";

declare const document: any;

@Injectable()
export class ToastService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    show(text?: string, time?: number, icon?: string, type?: 'success' | 'loading') {
        let componentFactory = this.resolver.resolveComponentFactory(ToastComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        if (type) componentRef.instance.type = type;
        if (text) componentRef.instance.text = text;
        if (icon) componentRef.instance.icon = icon;
        if (time) componentRef.instance.time = time;
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 300)
        });
        return componentRef.instance.onShow();
    }

    success(text?: string, time?: number, icon?: string) {
        return this.show(text, time, icon, 'success');
    }

    loading(text?: string, time?: number, icon?: string) {
        return this.show(text, time, icon, 'loading');
    }
}
