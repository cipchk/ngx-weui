import { NgModule, ModuleWithProviders } from '@angular/core';

import { CellModule } from './cell/cell.module';
import { ButtonModule } from './button/button.module';
import { FormModule } from './form/form.module';
import { SliderModule } from './slider/slider.module';
import { UploaderModule } from './uploader/uploader.module';
import { ActionSheetModule } from './actionsheet/actionsheet.module';
import { DialogModule } from './dialog/dialog.module';
import { LoadmoreModule } from './loadmore/loadmore.module';
import { ProgressModule } from './progress/progress.module';
import { GalleryModule } from './gallery/gallery.module';
import { PickerModule } from './picker/picker.module';
import { SearchBarModule } from './searchbar/searchbar.module';
import { TabModule } from './tab/tab.module';
import { ToastModule } from './toast/toast.module';
import { ToptipsModule } from './toptips/toptips.module';
import { PopupModule } from './popup/popup.module';
import { PTRModule } from './ptr/ptr.module';
import { InfiniteLoaderModule } from './infiniteloader/infiniteloader.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { SwiperModule } from './swiper/swiper.module';
import { ChartG2Module } from './chart-g2/chart-g2.module';
import { JWeiXinModule } from './jweixin/jweixin.module';
import { AccordionModule } from './accordion/accordion.module';
import { MaskModule } from './mask/mask.module';
import { RatingModule } from './rating/rating.module';
import { StepperModule } from './stepper/stepper.module';
import { PaginationModule } from './pagination/pagination.module';

export * from './utils/types';
export * from './cell';
export * from './button';
export * from './form';
export * from './slider';
export * from './uploader';
export * from './actionsheet';
export * from './dialog';
export * from './loadmore';
export * from './progress';
export * from './gallery';
export * from './picker';
export * from './searchbar';
export * from './tab';
export * from './toast';
export * from './toptips';
export * from './popup';
export * from './ptr';
export * from './infiniteloader';
export * from './sidebar';
export * from './swiper';
export * from './chart-g2';
export * from './jweixin';
export * from './accordion';
export * from './mask';
export * from './rating';
export * from './stepper';
export * from './pagination';
export * from './version';

const MODULES = [
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
];

@NgModule({
  imports: [
    CellModule.forRoot(),
    ButtonModule.forRoot(),
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
    TabModule.forRoot(),
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
  exports: MODULES,
})
export class WeUiRootModule { }

@NgModule({ exports: MODULES })
export class WeUiModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: WeUiRootModule };
  }
}
