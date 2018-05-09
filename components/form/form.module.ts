import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputDirective } from './input.directive';
import { VCodeDirective } from './vcode.directive';
import { TextareaDirective } from './textarea.directive';
import { ChecklistDirective } from './check.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    InputDirective,
    VCodeDirective,
    TextareaDirective,
    ChecklistDirective,
  ],
  exports: [
    InputDirective,
    VCodeDirective,
    TextareaDirective,
    ChecklistDirective,
  ],
})
export class FormModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: FormModule, providers: [] };
  }
}
