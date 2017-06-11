import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class LoaderService {

    private list: any = {};
    
    load(paths: string | string[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let promises: Promise<any>[] = [];

            if (!Array.isArray(paths)) paths = [ paths ];

            (<string[]>paths).forEach(path => {
                if (path.endsWith('.css')) {
                    promises.push(this.loadCss(path));
                } else {
                    promises.push(this.loadScript(path));
                }
            });

            Promise.all(promises).then(res => {
                resolve(true);
            }).catch(err => {
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
                    status: 'Loaded'
                });
                return;
            }

            this.list[path] = true;

            let node = document.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            node.charset = 'utf-8';
            node.defer = true;
            node.onload = () => {
                resolve(<any>{
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
            };
            node.onerror = (error: any) => resolve(<any>{
                path: path,
                loaded: false,
                status: 'Loaded'
            });
            document.getElementsByTagName('head')[0].appendChild(node);
        });
    }

    loadCss(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.list[path] === true) {
                resolve(<any>{
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }

            this.list[path] = true;

            let node = document.createElement('link');
            node.rel = 'stylesheet';
            node.type = 'text/css';
            node.href = path;
            document.getElementsByTagName('head')[0].appendChild(node);
            resolve(<any>{
                path: path,
                loaded: true,
                status: 'Loaded'
            });
        });
    }
}
