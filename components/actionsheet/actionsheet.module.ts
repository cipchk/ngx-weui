import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetService } from './actionsheet.service';
import { ActionSheetConfig } from './actionsheet.config';

@NgModule({
  imports: [CommonModule],
  declarations: [ActionSheetComponent],
  exports: [ActionSheetComponent],
  providers: [ActionSheetService],
  entryComponents: [ActionSheetComponent],
})
export class ActionSheetModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ActionSheetModule, providers: [ActionSheetConfig] };
  }
}
