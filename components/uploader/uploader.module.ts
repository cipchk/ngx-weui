import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UploaderFileDirective } from './uploader.directive';
import { FileThumbDirective } from './file-thumb.directive';
import { UploaderConfig } from './uploader.config';

@NgModule({
  imports: [CommonModule],
  declarations: [UploaderFileDirective, FileThumbDirective],
  exports: [UploaderFileDirective, FileThumbDirective],
})
export class UploaderModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: UploaderModule, providers: [UploaderConfig] };
  }
}
