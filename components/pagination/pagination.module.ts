import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ButtonModule } from 'ngx-weui/button';

import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './pagination.config';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PaginationModule, providers: [PaginationConfig] };
  }
}
