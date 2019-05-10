import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ActionSheetComponent } from './actionsheet.component';
import { ActionSheetConfig } from './actionsheet.config';
import { ActionSheetService } from './actionsheet.service';

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
