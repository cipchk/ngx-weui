import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
