import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChecklistDirective } from './check.directive';
import { InputDirective } from './input.directive';
import { TextareaDirective } from './textarea.directive';
import { VCodeDirective } from './vcode.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputDirective, VCodeDirective, TextareaDirective, ChecklistDirective],
  exports: [InputDirective, VCodeDirective, TextareaDirective, ChecklistDirective],
})
export class FormModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: FormModule, providers: [] };
  }
}
