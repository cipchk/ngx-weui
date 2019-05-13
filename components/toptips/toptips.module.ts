import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToptipsComponent } from './toptips.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToptipsComponent],
  exports: [ToptipsComponent],
  entryComponents: [ToptipsComponent],
})
export class ToptipsModule {}
