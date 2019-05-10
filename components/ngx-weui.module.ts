import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-weui/accordion';
import { ActionSheetModule } from 'ngx-weui/actionsheet';
import { ButtonModule } from 'ngx-weui/button';
import { CellModule } from 'ngx-weui/cell';
import { ChartG2Module } from 'ngx-weui/chart-g2';
import { DialogModule } from 'ngx-weui/dialog';
import { FormModule } from 'ngx-weui/form';
import { GalleryModule } from 'ngx-weui/gallery';
import { InfiniteLoaderModule } from 'ngx-weui/infiniteloader';
import { JWeiXinModule } from 'ngx-weui/jweixin';
import { LoadmoreModule } from 'ngx-weui/loadmore';
import { MaskModule } from 'ngx-weui/mask';
import { PaginationModule } from 'ngx-weui/pagination';
import { PickerModule } from 'ngx-weui/picker';
import { PopupModule } from 'ngx-weui/popup';
import { ProgressModule } from 'ngx-weui/progress';
import { PTRModule } from 'ngx-weui/ptr';
import { RatingModule } from 'ngx-weui/rating';
import { SearchBarModule } from 'ngx-weui/searchbar';
import { SidebarModule } from 'ngx-weui/sidebar';
import { SliderModule } from 'ngx-weui/slider';
import { StepperModule } from 'ngx-weui/stepper';
import { SwiperModule } from 'ngx-weui/swiper';
import { TabModule } from 'ngx-weui/tab';
import { ToastModule } from 'ngx-weui/toast';
import { ToptipsModule } from 'ngx-weui/toptips';
import { UploaderModule } from 'ngx-weui/uploader';

export * from 'ngx-weui/core';
export * from 'ngx-weui/cell';
export * from 'ngx-weui/button';
export * from 'ngx-weui/form';
export * from 'ngx-weui/slider';
export * from 'ngx-weui/uploader';
export * from 'ngx-weui/actionsheet';
export * from 'ngx-weui/dialog';
export * from 'ngx-weui/loadmore';
export * from 'ngx-weui/progress';
export * from 'ngx-weui/gallery';
export * from 'ngx-weui/picker';
export * from 'ngx-weui/searchbar';
export * from 'ngx-weui/tab';
export * from 'ngx-weui/toast';
export * from 'ngx-weui/toptips';
export * from 'ngx-weui/popup';
export * from 'ngx-weui/ptr';
export * from 'ngx-weui/infiniteloader';
export * from 'ngx-weui/sidebar';
export * from 'ngx-weui/swiper';
export * from 'ngx-weui/chart-g2';
export * from 'ngx-weui/jweixin';
export * from 'ngx-weui/accordion';
export * from 'ngx-weui/mask';
export * from 'ngx-weui/rating';
export * from 'ngx-weui/stepper';
export * from 'ngx-weui/pagination';
export * from 'ngx-weui/version';

@NgModule({
  imports: [
    CellModule.forRoot(),
    FormModule.forRoot(),
    SliderModule.forRoot(),
    UploaderModule.forRoot(),
    ActionSheetModule.forRoot(),
    DialogModule.forRoot(),
    LoadmoreModule.forRoot(),
    ProgressModule.forRoot(),
    GalleryModule.forRoot(),
    PickerModule.forRoot(),
    SearchBarModule.forRoot(),
    ToastModule.forRoot(),
    ToptipsModule.forRoot(),
    PopupModule.forRoot(),
    PTRModule.forRoot(),
    InfiniteLoaderModule.forRoot(),
    SidebarModule.forRoot(),
    SwiperModule.forRoot(),
    ChartG2Module.forRoot(),
    JWeiXinModule.forRoot(),
    AccordionModule.forRoot(),
    MaskModule.forRoot(),
    RatingModule.forRoot(),
    StepperModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [
    CellModule,
    ButtonModule,
    FormModule,
    SliderModule,
    UploaderModule,
    ActionSheetModule,
    DialogModule,
    LoadmoreModule,
    ProgressModule,
    GalleryModule,
    PickerModule,
    SearchBarModule,
    TabModule,
    ToastModule,
    ToptipsModule,
    PopupModule,
    PTRModule,
    InfiniteLoaderModule,
    SidebarModule,
    SwiperModule,
    ChartG2Module,
    JWeiXinModule,
    AccordionModule,
    MaskModule,
    RatingModule,
    StepperModule,
    PaginationModule,
  ],
})
export class WeUiModule {}
