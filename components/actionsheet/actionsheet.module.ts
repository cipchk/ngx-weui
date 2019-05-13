import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetService } from './actionsheet.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ActionSheetComponent],
  exports: [ActionSheetComponent],
  providers: [ActionSheetService],
  entryComponents: [ActionSheetComponent],
})
export class ActionSheetModule {}
