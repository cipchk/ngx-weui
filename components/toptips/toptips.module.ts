import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
