import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModule } from './../form/form.module';
import { SliderModule } from './../slider/slider.module';
import { MaskModule } from './../mask/mask.module';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { DialogConfig } from './dialog.config';

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
