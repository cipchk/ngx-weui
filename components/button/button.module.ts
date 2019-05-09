import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';
import { ButtonIconComponent } from './button-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ButtonIconComponent],
  exports: [ButtonComponent, ButtonIconComponent],
})
export class ButtonModule {}
