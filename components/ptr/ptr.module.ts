import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PTRComponent } from './ptr.component';
import { PTRConfig } from './ptr.config';

@NgModule({
  imports: [CommonModule],
  declarations: [PTRComponent],
  exports: [PTRComponent],
  entryComponents: [PTRComponent],
})
export class PTRModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PTRModule, providers: [PTRConfig] };
  }
}
