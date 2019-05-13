import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injector,
} from '@angular/core';

export abstract class BaseService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private doc: any,
  ) {}

  protected list: Array<ComponentRef<any>> = [];

  /**
   * 销毁
   *
   * @param component 下标（从0开始或组件引用对象），或不指定时，销毁最新一个
   */
  destroy(component?: number | ComponentRef<any>) {
    if (typeof component === 'number') component = this.list[component as number];
    if (!component) component = this.list.pop();
    if (component) (component as ComponentRef<any>).destroy();
  }

  /**
   * 销毁所有
   */
  destroyAll() {
    for (const component of this.list) this.destroy(component);
  }

  /** 动态构建组件 */
  protected build<T>(component: new (...args: any[]) => T): ComponentRef<T> {
    const componentFactory = this.resolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    this.list.push(componentRef);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });
    this.doc.body.appendChild(componentRootNode);
    return componentRef;
  }
}
