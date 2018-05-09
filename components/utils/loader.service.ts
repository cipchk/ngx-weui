import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private list: any = {};

  constructor(@Inject(DOCUMENT) private doc: any) {}

  load(paths: string | string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const promises: Promise<any>[] = [];

      if (!Array.isArray(paths)) paths = [paths];

      (<string[]>paths).forEach(path => {
        if (path.endsWith('.css')) {
          promises.push(this.loadCss(path));
        } else {
          promises.push(this.loadScript(path));
        }
      });

      Promise.all(promises)
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          resolve(false);
        });
    });
  }

  loadScript(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.list[path] === true) {
        resolve(<any>{
          path: path,
          loaded: true,
          status: 'Loaded',
        });
        return;
      }

      this.list[path] = true;

      const node = this.doc.createElement('script');
      node.type = 'text/javascript';
      node.src = path;
      node.charset = 'utf-8';
      node.defer = true;
      node.onload = () => {
        resolve(<any>{
          path: path,
          loaded: true,
          status: 'Loaded',
        });
      };
      node.onerror = (error: any) =>
        resolve(<any>{
          path: path,
          loaded: false,
          status: 'Loaded',
        });
      this.doc.getElementsByTagName('head')[0].appendChild(node);
    });
  }

  loadCss(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.list[path] === true) {
        resolve(<any>{
          path: path,
          loaded: true,
          status: 'Loaded',
        });
        return;
      }

      this.list[path] = true;

      const node = this.doc.createElement('link');
      node.rel = 'stylesheet';
      node.type = 'text/css';
      node.href = path;
      this.doc.getElementsByTagName('head')[0].appendChild(node);
      resolve(<any>{
        path: path,
        loaded: true,
        status: 'Loaded',
      });
    });
  }
}
