import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { PopupConfig } from './popup.config';

@NgModule({
  imports: [CommonModule],
  declarations: [PopupComponent],
  exports: [PopupComponent],
  entryComponents: [PopupComponent],
})
export class PopupModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PopupModule, providers: [PopupConfig] };
  }
}
