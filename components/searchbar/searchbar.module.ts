import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
