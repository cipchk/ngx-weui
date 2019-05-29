import { Directive, ElementRef, Input } from '@angular/core';
import { Uploader } from './uploader.class';
import { UploaderOptions } from './uploader.options';

@Directive({
  selector: '[weui-uploader-file]',
  exportAs: 'weuiUploaderFile',
  host: {
    '(change)': '_onChange()',
  },
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

  _onChange(): void {
    const files = this.element.nativeElement.files;
    this.uploader.addToQueue(files, this._options);
    if (this._isEmptyAfterSelection) {
      this.element.nativeElement.value = '';
    }
  }
}
