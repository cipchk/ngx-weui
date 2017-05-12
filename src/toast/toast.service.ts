import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ToastComponent } from "./index";
import { Observable, Observer } from "rxjs/Rx";

declare const document: any;

@Injectable()
export class ToastService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    /**
     * 构建toast并显示
     * 
     * @param {string} [text] 文本（可选）
     * @param {number} [time] 显示时长后自动关闭（单位：ms）（可选）
     * @param {string} [icon] icon图标Class名（可选）
     * @param {('success' | 'loading')} [type] 类型（可选）
     * @returns {ToastComponent}
     */
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
    
    /**
     * 构建成功toast并显示
     * 
     * @param {string} [text] 文本（可选）
     * @param {number} [time] 显示时长后自动关闭（单位：ms）（可选）
     * @param {string} [icon] icon图标Class名（可选）
     * @returns {ToastComponent}
     */
    success(text?: string, time?: number, icon?: string) {
        return this.show(text, time, icon, 'success');
    }

    /**
     * 构建加载中toast并显示
     * 
     * @param {string} [text] 文本（可选）
     * @param {number} [time] 显示时长后自动关闭（单位：ms）（可选）
     * @param {string} [icon] icon图标Class名（可选）
     * @returns {ToastComponent}
     */
    loading(text?: string, time?: number, icon?: string) {
        return this.show(text, time, icon, 'loading');
    }
}
