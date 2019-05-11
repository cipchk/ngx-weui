import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepperComponent } from './stepper.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [StepperComponent],
  exports: [StepperComponent],
})
export class StepperModule {}
