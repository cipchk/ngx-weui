import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';
import { SearchBarConfig } from './searchbar.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
  entryComponents: [SearchBarComponent],
})
export class SearchBarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SearchBarModule, providers: [SearchBarConfig] };
  }
}
