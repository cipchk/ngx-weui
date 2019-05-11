import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadmoreComponent } from './loadmore.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadmoreComponent],
  exports: [LoadmoreComponent],
  entryComponents: [LoadmoreComponent],
})
export class LoadmoreModule {}
