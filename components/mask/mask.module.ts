import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaskComponent } from './mask.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskComponent],
  exports: [MaskComponent],
  entryComponents: [MaskComponent],
})
export class MaskModule {}
