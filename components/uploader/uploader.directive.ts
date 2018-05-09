import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { UploaderOptions } from './uploader.options';
import { Uploader } from './uploader.class';

@Directive({
  selector: '[weui-uploader-file]',
})
export class UploaderFileDirective {
  /**
   * Uploader对象，必填项
   */
  @Input('weui-uploader-file') uploader: Uploader;

  constructor(protected element: ElementRef) {}

  get _options(): UploaderOptions {
    return this.uploader.options;
  }

  get _isEmptyAfterSelection(): boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  @HostListener('change')
  _onChange(): any {
    const files = this.element.nativeElement.files;
    this.uploader.addToQueue(files, this._options);
    if (this._isEmptyAfterSelection) {
      this.element.nativeElement.value = '';
    }
  }
}
