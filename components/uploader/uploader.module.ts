import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileThumbDirective } from './file-thumb.directive';
import { UploaderFileDirective } from './uploader.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [UploaderFileDirective, FileThumbDirective],
  exports: [UploaderFileDirective, FileThumbDirective],
})
export class UploaderModule {}
