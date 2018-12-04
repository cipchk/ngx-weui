import {
  Component,
  HostListener,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isImage, genImageUrl } from '../utils/browser';

/**
 * 数据对象
 */
export interface GalleryItem {
  /**
   * 远程网址
   */
  url?: string;
  /**
   * JavaScript File 对象
   */
  file?: File;
  /**
   * 文件标题
   */
  title?: string;
  /**
   * 是否允许删除，默认：`true`
   */
  canDelete?: boolean;
}

@Component({
  selector: 'weui-gallery',
  template: `
    <div *ngIf="_imgs" class="weui-galleries">
      <ng-template ngFor let-item [ngForOf]="_imgs">
        <div class="weui-gallery"
          [ngStyle]="{'display': _showd ? 'block' : 'none'}"
          [@visibility]="_visibility"
          (@visibility.start)="_antStart($event)"
          (@visibility.done)="_antDone($event)"
          (click)="_onHide()">
          <span class="weui-gallery__img" [ngStyle]="{ 'background-image': 'url(' + item?.url + ')'}"></span>
          <div class="weui-gallery__opr" *ngIf="canDelete">
            <a href="#" class="weui-gallery__del" (click)="_onDel(item)">
              <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  animations: [
    trigger('visibility', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide <=> show', [animate(200)]),
    ]),
  ],
})
export class GalleryComponent implements OnChanges {
  _imgs: any[];

  /**
   * 图片数据
   *
   * - 虽然支持传递数组，但并不支持在打开后切换图片。
   */
  @Input() imgs: string | File | string[] | GalleryItem[];

  /**
   * 是否允许删除，默认：`true`
   */
  @Input() canDelete: boolean = true;

  /**
   * 删除回调
   */
  @Output() delete = new EventEmitter<any>();

  /**
   * 隐藏回调
   */
  @Output() hide = new EventEmitter<any>();

  /**
   * 标记是否显示，支持双向绑定
   */
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();
  _showd: boolean = false;
  get _visibility(): string {
    return this.show ? 'show' : 'hide';
  }

  _antStart() {
    if (this.show) this._showd = this.show;
  }

  _antDone() {
    this._showd = this.show;
  }

  _onDel(item: any) {
    if (this.canDelete) {
      this.delete.emit(item);
      this._onHide();
    }
    return false;
  }

  _onHide() {
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
            if (item.file) item.url = genImageUrl(item.file);
            return item;
          });
        }
      }
    } else {
      if (typeof imgs === 'string') imgs = [{ url: imgs }];
      else {
        const imgUrl = genImageUrl(imgs);
        if (imgUrl) imgs = [{ url: imgUrl }];
      }
    }

    // todo: 永远只返回一个
    // 针对未来可能直接上下个
    this._imgs = Object.assign(
      [],
      imgs && (<any[]>imgs).length > 0 ? imgs.slice(0, 1) : [],
    );
  }
}
