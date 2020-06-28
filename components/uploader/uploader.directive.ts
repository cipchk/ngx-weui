import { Directive, Input } from '@angular/core';
import { Uploader } from './uploader.class';

@Directive({
  selector: '[weui-uploader-file]',
  exportAs: 'weuiUploaderFile',
  host: {
    '(change)': '_onChange($event)',
  },
})
export class UploaderFileDirective {
  /**
   * Uploader对象，必填项
   */
  @Input('weui-uploader-file') uploader: Uploader;

  _onChange(e: Event): void {
    const hie = e.target as HTMLInputElement;
    this.uploader.addToQueue((hie.files! as unknown) as File[], this.uploader.options);
    if (!!(hie.attributes as any).multiple) {
      hie.value = '';
    }
  }
}
