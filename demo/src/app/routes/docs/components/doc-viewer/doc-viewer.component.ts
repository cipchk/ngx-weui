import { Http } from '@angular/http';
import { Component, OnDestroy, Input, ElementRef, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'doc-viewer',
    template: `Loading document...`, 
    styleUrls: [ './doc-viewer.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DocViewerComponent {

    @Input()
    set url(url: string) {
        this._fetchDocument(url);
    }

    constructor(private el: ElementRef, private http: Http) { }

    private _cached: any = {};
    private _fetchDocument(url: string) {
        if (this._cached[url]) {
            this.el.nativeElement.innerHTML = this._cached[url];
            return;
        }

        this.http.get(url).subscribe(
            response => {
                if (response.ok) {
                    let docHtml = response.text();
                    this._cached[url] = docHtml;
                    this.el.nativeElement.innerHTML = docHtml;
                } else {
                    this.el.nativeElement.innerText =
                        `Failed to load document: ${url}. Error: ${response.status}`;
                }
            },
            error => {
                this.el.nativeElement.innerText =
                    `Nothing`;
            });
    }


}
