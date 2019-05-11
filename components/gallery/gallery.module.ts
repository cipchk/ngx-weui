import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
  entryComponents: [GalleryComponent],
})
export class GalleryModule {}
