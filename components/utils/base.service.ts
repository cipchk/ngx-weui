import {
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
} from '@angular/core';

declare const document: any;

export abstract class BaseService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
  ) {}

  protected list: ComponentRef<any>[] = [];

  /**
   * 销毁
   *
   * @param component 下标（从0开始或组件引用对象），或不指定时，销毁最新一个
   */
  destroy(component?: number | ComponentRef<any>) {
    if (typeof component === 'number') component = this.list[<number>component];
    if (!component) component = this.list.pop();
    if (component) (<ComponentRef<any>>component).destroy();
  }

  /**
   * 销毁所有
   */
  destroyAll() {
    for (const component of this.list) this.destroy(component);
  }

  /** 动态构建组件 */
  protected build<T>(component: { new (...args: any[]): T }): ComponentRef<T> {
    const componentFactory = this.resolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    this.list.push(componentRef);
    const componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });
    document.body.appendChild(componentRootNode);
    return componentRef;
  }
}
