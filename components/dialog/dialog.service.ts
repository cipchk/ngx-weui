import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Optional, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../utils/base.service';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';

@Injectable()
export class DialogService extends BaseService {
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) {
        super(resolver, applicationRef, injector);
    }

    /**
     * 创建一个对话框并显示
     *
     * @param data 对话框配置项
     * @returns 可订阅来获取结果
     */
    show(data: DialogConfig): Observable<any> {
        const componentRef = this.build(DialogComponent);

        componentRef.instance.config = data;
        componentRef.instance.close.subscribe(() => {
            setTimeout(() => {
                this.destroy(componentRef);
            }, 300);
        });
        return componentRef.instance.show();
    }
}
