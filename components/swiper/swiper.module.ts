import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SwiperComponent } from './swiper.component';
import { SwiperConfig } from './swiper.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SwiperComponent],
  exports: [SwiperComponent],
  providers: [SwiperConfig],
})
export class SwiperModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SwiperModule, providers: [SwiperConfig] };
  }
}
