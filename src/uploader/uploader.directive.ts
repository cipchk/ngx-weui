import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { Uploader, UploaderOptions } from "./index";

@Directive({
    selector: '[weui-uploader-file]'
})
export class UploaderFileDirective {
    @Input('weui-uploader') uploader: Uploader;

    constructor(protected element: ElementRef) { }

    get options(): UploaderOptions {
        return this.uploader.options;
    }

    get isEmptyAfterSelection(): boolean {
        return !!this.element.nativeElement.attributes.multiple;
    }

    @HostListener('change')
    onChange(): any {
        const files = this.element.nativeElement.files;
        this.uploader.addToQueue(files, this.options);
        if (this.isEmptyAfterSelection) {
            this.element.nativeElement.value = '';
        }
    }
}
