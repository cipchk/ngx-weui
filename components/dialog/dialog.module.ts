import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormModule } from 'ngx-weui/form';
import { MaskModule } from 'ngx-weui/mask';
import { SliderModule } from 'ngx-weui/slider';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [CommonModule, FormsModule, MaskModule, FormModule, SliderModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: [DialogService],
  entryComponents: [DialogComponent],
})
export class DialogModule {}
