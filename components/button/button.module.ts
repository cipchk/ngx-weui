import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonIconComponent } from './button-icon.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ButtonIconComponent],
  exports: [ButtonComponent, ButtonIconComponent],
})
export class ButtonModule {}
