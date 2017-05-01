import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

declare const window: any;

@Directive({ selector: '[weui-thumb]' })
export class FileThumbDirective implements OnChanges {
    @Input('weui-file') file: File;

    constructor(private el: ElementRef) { }

    private isImage() {
        if (!this.file) return false;
        let type = '|' + this.file.type.slice(this.file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }

    private render() {
        if (!(this.file instanceof window.File) || !this.isImage())
            return;

        const url = `url(${window.URL.createObjectURL(this.file)})`;
        this.el.nativeElement.style.backgroundImage = url;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.render();
    }

}
