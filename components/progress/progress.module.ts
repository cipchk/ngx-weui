import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressComponent],
  exports: [ProgressComponent],
  entryComponents: [ProgressComponent],
})
export class ProgressModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ProgressModule, providers: [] };
  }
}
