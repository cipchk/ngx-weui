import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { PickerComponent, DatePickerComponent, CityPickerComponent, PickerData, PickerOptions } from "./index";
import { Observable, Observer } from "rxjs/Rx";
import { FORMAT_TYPE } from "./picker-date.component";

declare const document: any;

@Injectable()
export class PickerService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    show(data: PickerData[][] | String[], value?: any, defaultSelect?: number[], options?: PickerOptions): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(PickerComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        if (options) componentRef.instance.options = options;
        if (defaultSelect) componentRef.instance.defaultSelect = defaultSelect;
        componentRef.instance.groups = data;
        if (value) {
            setTimeout(() => {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        componentRef.instance.onShow();
        return componentRef.instance.change;
    }

    showCity(data: any, value?: string, dataMap?: any, options?: PickerOptions): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(CityPickerComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        if (dataMap) componentRef.instance.dataMap = dataMap;
        if (options) componentRef.instance.options = options;
        componentRef.instance.data = data;
        if (value) {
            setTimeout(() => {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        setTimeout(() => {
            componentRef.instance.triggerShow();
        }, 200)
        return componentRef.instance.change;
    }

    showDateTime(type?: 'date' | 'datetime' | 'time', format?: FORMAT_TYPE,
        value?: Date, min?: Date, max?: Date, options?: PickerOptions): Observable<any> {
        let componentFactory = this.resolver.resolveComponentFactory(DatePickerComponent);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        if (options) componentRef.instance.options = options;
        if (format) componentRef.instance.format = format;
        if (min) componentRef.instance.min = min;
        if (max) componentRef.instance.max = max;
        if (value) {
            setTimeout(() => {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                componentRef.destroy();
            }, 100)
        });
        setTimeout(() => {
            componentRef.instance.ngOnChanges(null);
            componentRef.instance.triggerShow();
        }, 200)
        return componentRef.instance.change;
    }

}
