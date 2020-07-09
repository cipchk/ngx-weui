import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

@Injectable()
export abstract class BaseService {
  protected list: Array<ComponentRef<any>> = [];
  protected abstract readonly resolver: ComponentFactoryResolver;
  protected abstract readonly applicationRef: ApplicationRef;
  protected abstract readonly injector: Injector;
  protected abstract readonly doc: Document;

  /**
   * 销毁
   *
   * @param component 下标（从0开始或组件引用对象），或不指定时，销毁最新一个
   */
  destroy(component?: number | ComponentRef<any>): void {
    if (typeof component === 'number') {
      component = this.list[component as number];
    }
    if (!component) {
      component = this.list.pop();
    }
    if (component) {
      (component as ComponentRef<any>).destroy();
    }
  }

  /**
   * 销毁所有
   */
  destroyAll(): void {
    for (const component of this.list) {
      this.destroy(component);
    }
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
