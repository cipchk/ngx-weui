import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ToptipsComponent } from "./index";
import { ToptipsType } from "./toptips.component";

@Injectable()
export class ToptipsService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    show(text: string, type: ToptipsType, time: number = 2000) {
        let componentFactory = this.resolver.resolveComponentFactory(ToptipsComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        if (type) componentRef.instance.type = type;
        if (text) componentRef.instance.text = text;
        componentRef.instance.time = time;
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        return componentRef.instance.onShow();
    }

    warn(text: string, time: number = 2000) {
        return this.show(text, 'warn', time);
    }

    info(text: string, time: number = 2000) {
        return this.show(text, 'info', time);
    }

    primary(text: string, time: number = 2000) {
        return this.show(text, 'primary', time);
    }

    success(text: string, time: number = 2000) {
        return this.show(text, 'primary', time);
    }

    default(text: string, time: number = 2000) {
        return this.show(text, 'default', time);
    }
}
