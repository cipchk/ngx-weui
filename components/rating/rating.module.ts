import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import { RatingConfig } from './rating.config';

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent],
  entryComponents: [RatingComponent],
})
export class RatingModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: RatingModule, providers: [RatingConfig] };
  }
}
