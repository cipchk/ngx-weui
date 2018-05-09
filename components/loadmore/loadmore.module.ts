import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoadmoreComponent } from './loadmore.component';
import { LoadmoreConfig } from './loadmore.config';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadmoreComponent],
  exports: [LoadmoreComponent],
  entryComponents: [LoadmoreComponent],
})
export class LoadmoreModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: LoadmoreModule, providers: [LoadmoreConfig] };
  }
}
