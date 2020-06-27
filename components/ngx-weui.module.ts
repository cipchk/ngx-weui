import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-weui/accordion';
import { ActionSheetModule } from 'ngx-weui/actionsheet';
import { ButtonModule } from 'ngx-weui/button';
import { CellModule } from 'ngx-weui/cell';
import { ChartG2Module } from 'ngx-weui/chart-g2';
import { warnDeprecation } from 'ngx-weui/core';
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

/**
 * @deprecated Use secondary entry eg: `import { ButtonModule } from 'ngx-weui/button';`.
 */
@NgModule({ exports: MODULES })
export class WeUiModule {
  constructor() {
    warnDeprecation(
      "The `WeUiModule` has been deprecated and will be removed in 10.0.0. Please use secondary entry instead.\ne.g. `import { ButtonModule } from 'ngx-weui/button';`",
    );
  }
}
