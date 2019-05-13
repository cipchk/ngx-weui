import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteLoaderComponent } from './infiniteloader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InfiniteLoaderComponent],
  exports: [InfiniteLoaderComponent],
})
export class InfiniteLoaderModule {}
