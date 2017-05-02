import { Component, HostListener, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { isImage, genImageUrl } from '../utils/browser';

export interface GalleryItem {
    url?: string;
    file?: File;
    title?: string;
    canDelete?: boolean;
}

@Component({
    selector: '[weui-gallery],weui-gallery',
    template: `
        <div *ngIf="_imgs" class="weui-galleries">
            <ng-template ngFor let-item [ngForOf]="_imgs">
                <div class="weui-gallery" 
                    [ngStyle]="{'display': showd ? 'block' : 'none'}"
                    [@visibility]="visibility"
                    (@visibility.start)="antStart($event)"
                    (@visibility.done)="antDone($event)"
                    (click)="onHide()"> 
                    <span class="weui-gallery__img"
                        [ngStyle]="{ 'background-image': 'url(' + item?.url + ')'}"></span>
                    <div class="weui-gallery__opr" *ngIf="canDelete">
                        <a href="#" class="weui-gallery__del" (click)="onDel(item)">
                            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                        </a>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1 })),
        state('hide', style({ opacity: 0 })),
        transition('hide <=> show', [animate(200)])
    ])]
})
export class GalleryComponent implements OnChanges {

    _imgs: any[];

    @Input('weui-imgs') imgs: string | File | string[] | GalleryItem[];
    @Input('weui-can-delete') canDelete: boolean = true;
    @Output('weui-delete') delete = new EventEmitter<any>();
    @Output('weui-hide') hide = new EventEmitter<any>();

    @Input() show: boolean = false;
    @Output() showChange = new EventEmitter<boolean>();
    showd: boolean = false;
    get visibility(): string {
        return this.show ? 'show' : 'hide';
    }

    antStart() { if (this.show) this.showd = this.show; }

    antDone() { this.showd = this.show; }

    onDel(item: any) {
        if (this.canDelete) {
            this.delete.emit(item);
            this.onHide();
        }
        return false;
    }

    onHide() {
        this.show = false;
        this.showChange.emit(this.show);
        this.hide.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('imgs' in changes) this.parseImgs();
    }

    private parseImgs() {
        let imgs = this.imgs;
        if (Array.isArray(imgs)) {
            if (imgs.length > 0) {
                if (typeof imgs[0] === 'string') {
                    imgs = (<string[]>imgs).map((url: string) => {
                        return { url: url };
                    });
                } else {
                    imgs = (<GalleryItem[]>imgs).map((item: GalleryItem) => {
                        if (item.file)
                            item.url = genImageUrl(item.file);
                        return item;
                    });
                }
            }
        } else {
            if (typeof imgs === 'string')
                imgs = [{ url: imgs }];
            else {
                const imgUrl = genImageUrl(imgs);
                if (imgUrl) imgs = [{ url: imgUrl }];
            }
        }

        // todo: 永远只返回一个
        // 针对未来可能直接上下个
        this._imgs = Object.assign([], imgs && (<any[]>imgs).length > 0 ? imgs.slice(0, 1) : []);
    }
}
