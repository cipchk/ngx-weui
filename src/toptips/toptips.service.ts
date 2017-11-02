import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { ToptipsType, ToptipsComponent } from './toptips.component';
import { BaseService } from '../utils/base.service';

@Injectable()
export class ToptipsService extends BaseService {
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) {
        super(resolver, applicationRef, injector);
    }

    /**
     * 构建一个Toptips并显示
     *
     * @param {string} text 文本
     * @param {ToptipsType} type 类型
     * @param {number} [time=2000] 显示时长后自动关闭（单位：ms）
     * @returns {ToptipsComponent}
     */
    show(text: string, type: ToptipsType, time: number = 2000) {
        const componentRef = this.build(ToptipsComponent);

        if (type) componentRef.instance.type = type;
        if (text) componentRef.instance.text = text;
        componentRef.instance.time = time;
        componentRef.instance.hide.subscribe(() => {
            setTimeout(() => {
                this.destroy(componentRef);
            }, 100);
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
