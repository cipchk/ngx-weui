import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { genImageUrl, InputBoolean } from 'ngx-weui/core';

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
  exportAs: 'weuiGallery',
  templateUrl: './gallery.component.html',
  animations: [
    trigger('visibility', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide <=> show', [animate(200)]),
    ]),
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
  @Input() @InputBoolean() canDelete: boolean = true;

  /**
   * 删除回调
   */
  @Output() readonly delete = new EventEmitter<any>();

  /**
   * 隐藏回调
   */
  @Output() readonly hide = new EventEmitter<any>();

  /**
   * 标记是否显示，支持双向绑定
   */
  @Input() @InputBoolean() show: boolean = false;
  @Output() readonly showChange = new EventEmitter<boolean>();

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
    if (changes.imgs) this.parseImgs();
  }

  private parseImgs() {
    let imgs = this.imgs as any;
    if (Array.isArray(imgs)) {
      if (imgs.length > 0) {
        if (typeof imgs[0] === 'string') {
          imgs = (imgs as string[]).map((url: string) => {
            return { url };
          });
        } else {
          imgs = (imgs as GalleryItem[]).map((item: GalleryItem) => {
            if (item.file) item.url = genImageUrl(item.file);
            return item;
          });
        }
      }
    } else {
      if (typeof imgs === 'string') {
        imgs = [{ url: imgs }];
      } else {
        const imgUrl = genImageUrl(imgs);
        if (imgUrl) {
          imgs = [{ url: imgUrl }];
        }
      }
    }

    // todo: 永远只返回一个
    // 针对未来可能直接上下个
    this._imgs = imgs && (imgs as any[]).length > 0 ? imgs.slice(0, 1) : [];
  }
}
