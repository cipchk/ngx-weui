import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormModule } from './../form/form.module';
import { MaskModule } from './../mask/mask.module';
import { SliderModule } from './../slider/slider.module';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog.config';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [CommonModule, FormsModule, MaskModule, FormModule, SliderModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [DialogService],
  entryComponents: [DialogComponent],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DialogModule, providers: [DialogConfig] };
  }
}
