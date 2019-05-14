import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionSheetComponent } from './actionsheet.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ActionSheetComponent],
  exports: [ActionSheetComponent],
  entryComponents: [ActionSheetComponent],
})
export class ActionSheetModule {}
