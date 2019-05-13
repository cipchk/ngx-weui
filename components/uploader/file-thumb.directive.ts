import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { genImageUrl } from 'ngx-weui/core';

/**
 * 创建缩略图
 */
@Directive({ selector: '[weui-thumb]' })
export class FileThumbDirective implements OnChanges {
  /**
   * 文件对象，必填项
   */
  @Input('weui-thumb') file: File;

  constructor(private el: ElementRef) {}

  private render() {
    const url = genImageUrl(this.file);
    if (!url) return;

    this.el.nativeElement.style.backgroundImage = `url(${url})`;
  }

  ngOnChanges(): void {
    this.render();
  }
}
