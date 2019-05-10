import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FileThumbDirective } from './file-thumb.directive';
import { UploaderConfig } from './uploader.config';
import { UploaderFileDirective } from './uploader.directive';

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
