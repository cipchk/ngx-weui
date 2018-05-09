import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ButtonConfig } from './button.config';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ButtonModule, providers: [ButtonConfig] };
  }
}
