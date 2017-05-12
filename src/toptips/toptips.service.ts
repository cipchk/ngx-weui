import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef } from '@angular/core';
import { ToptipsComponent } from "./index";
import { ToptipsType } from "./toptips.component";

@Injectable()
export class ToptipsService {
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) { }

    /**
     * 构建一个Toptips并显示
     * 
     * @param {string} text 文本
     * @param {ToptipsType} type 类型
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
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

    /**
     * 构建一个Warn Toptips并显示
     * 
     * @param {string} text 文本
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    warn(text: string, time: number = 2000) {
        return this.show(text, 'warn', time);
    }

    /**
     * 构建一个Info Toptips并显示
     * 
     * @param {string} text 文本
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    info(text: string, time: number = 2000) {
        return this.show(text, 'info', time);
    }

    /**
     * 构建一个Primary Toptips并显示
     * 
     * @param {string} text 文本
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    primary(text: string, time: number = 2000) {
        return this.show(text, 'primary', time);
    }

    /**
     * 构建一个Success Toptips并显示
     * 
     * @param {string} text 文本
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    success(text: string, time: number = 2000) {
        return this.show(text, 'primary', time);
    }

    /**
     * 构建一个Default Toptips并显示
     * 
     * @param {string} text 文本
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    default(text: string, time: number = 2000) {
        return this.show(text, 'default', time);
    }
}
