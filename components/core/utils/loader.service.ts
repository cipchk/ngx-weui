import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private list: any = {};

  constructor(@Inject(DOCUMENT) private doc: any) {}

  load(paths: string | string[]): Promise<boolean> {
    return new Promise(resolve => {
      const promises: Array<Promise<any>> = [];

      if (!Array.isArray(paths)) {
        paths = [paths];
      }

      (paths as string[]).forEach(path => {
        if (path.endsWith('.css')) {
          promises.push(this.loadCss(path));
        } else {
          promises.push(this.loadScript(path));
        }
      });

      Promise.all(promises)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  loadScript(path: string): Promise<any> {
    return new Promise(resolve => {
      if (this.list[path] === true) {
        resolve({
          path,
          loaded: true,
          status: 'Loaded',
        } as any);
        return;
      }

      this.list[path] = true;

      const node = this.doc.createElement('script');
      node.type = 'text/javascript';
      node.src = path;
      node.charset = 'utf-8';
      node.defer = true;
      node.onload = () => {
        resolve({
          path,
          loaded: true,
          status: 'Loaded',
        } as any);
      };
      node.onerror = () =>
        resolve({
          path,
          loaded: false,
          status: 'Loaded',
        } as any);
      this.doc.getElementsByTagName('head')[0].appendChild(node);
    });
  }

  loadCss(path: string): Promise<any> {
    return new Promise(resolve => {
      if (this.list[path] === true) {
        resolve({
          path,
          loaded: true,
          status: 'Loaded',
        } as any);
        return;
      }

      this.list[path] = true;

      const node = this.doc.createElement('link');
      node.rel = 'stylesheet';
      node.type = 'text/css';
      node.href = path;
      this.doc.getElementsByTagName('head')[0].appendChild(node);
      resolve({
        path,
        loaded: true,
        status: 'Loaded',
      } as any);
    });
  }
}
