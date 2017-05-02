import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { isImage, genImageUrl } from '../utils/browser';

@Directive({ selector: '[weui-thumb]' })
export class FileThumbDirective implements OnChanges {
    @Input('weui-file') file: File;

    constructor(private el: ElementRef) { }

    private render() {
        const url = genImageUrl(this.file);
        if (!url) return;

        this.el.nativeElement.style.backgroundImage = `url(${url})`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.render();
    }

}
