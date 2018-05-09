import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { isImage, genImageUrl } from '../utils/browser';

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

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }
}
