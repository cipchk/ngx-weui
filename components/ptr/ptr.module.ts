import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PTRComponent } from './ptr.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PTRComponent],
  exports: [PTRComponent],
  entryComponents: [PTRComponent],
})
export class PTRModule {}
