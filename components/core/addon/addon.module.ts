import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StringTemplateOutletDirective } from './string_template_outlet';

@NgModule({
  imports: [CommonModule],
  exports: [StringTemplateOutletDirective],
  declarations: [StringTemplateOutletDirective],
})
export class AddOnModule {}
