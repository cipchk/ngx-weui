import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToptipsComponent } from './toptips.component';
import { ToptipsService } from './toptips.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToptipsComponent],
  exports: [ToptipsComponent],
  providers: [ToptipsService],
  entryComponents: [ToptipsComponent],
})
export class ToptipsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ToptipsModule, providers: [] };
  }
}
