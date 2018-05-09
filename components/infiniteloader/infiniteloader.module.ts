import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteLoaderComponent } from './infiniteloader.component';
import { InfiniteLoaderConfig } from './infiniteloader.config';

@NgModule({
  imports: [CommonModule],
  declarations: [InfiniteLoaderComponent],
  exports: [InfiniteLoaderComponent],
  entryComponents: [InfiniteLoaderComponent],
})
export class InfiniteLoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InfiniteLoaderModule,
      providers: [InfiniteLoaderConfig],
    };
  }
}
