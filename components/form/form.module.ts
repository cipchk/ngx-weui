import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChecklistDirective } from './check.directive';
import { InputDirective } from './input.directive';
import { TextareaDirective } from './textarea.directive';
import { VCodeDirective } from './vcode.directive';

const COMPONENTS = [InputDirective, VCodeDirective, TextareaDirective, ChecklistDirective];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class FormModule {}
