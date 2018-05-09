import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskComponent } from './mask.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskComponent],
  exports: [MaskComponent],
  entryComponents: [MaskComponent],
})
export class MaskModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: MaskModule, providers: [] };
  }
}
