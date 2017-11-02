import { Component, OnDestroy, Input, ElementRef, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'doc-viewer',
    template: `Loading document...`,
    styleUrls: ['./doc-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocViewerComponent {

    @Input()
    set url(url: string) {
        this._fetchDocument(url);
    }
    @Input() error: string = 'Nothing';

    constructor(private el: ElementRef, private http: HttpClient) { }

    private _cached: any = {};
    private _fetchDocument(url: string) {
        if (this._cached[url]) {
            this.el.nativeElement.innerHTML = this._cached[url];
            return;
        }

        this.el.nativeElement.innerText = `loading...`;

        this.http.get(url, {
            responseType: 'text'
        }).subscribe(docHtml => {
            if (docHtml) {
                if (docHtml === '<html><head></head><body><div class="docs-markdown"></div></body></html>')
                    docHtml = `<p>${this.error}</p>`;
                this._cached[url] = docHtml;
                this.el.nativeElement.innerHTML = docHtml;
            } else {
                this.el.nativeElement.innerText = this.error;
            }
        },
        error => {
            this.el.nativeElement.innerText = this.error;
        });
    }


}
