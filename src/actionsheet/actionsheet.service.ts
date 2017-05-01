import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ActionSheetData, ActionSheetComponent } from "./index";
import { Observable, Observer } from "rxjs/Rx";

declare const document: any;

@Injectable()
export class ActionSheetService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    show(data: ActionSheetData): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(ActionSheetComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        componentRef.instance.data = data;
        componentRef.instance.close.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        return componentRef.instance.show();
    }
}
