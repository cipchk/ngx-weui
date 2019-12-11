import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DemoAccordionComponent } from './accordion/accordion.component';
import { DemoActionSheetComponent } from './actionsheet/actionsheet.component';
import { ArticleComponent } from './article/article.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { DemoChartG2Component } from './chart-g2/chart-g2.component';
import { ContainerComponent } from './container.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DemoDialogComponent } from './dialog/dialog.component';
import { FlexComponent } from './flex/flex.component';
import { FooterComponent } from './footer/footer.component';
import { DemoGalleryComponent } from './gallery/gallery.component';
import { GesturePasswordComponent } from './gesture-password/gesture-password.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { DemoInfiniteLoaderComponent } from './infiniteloader/infiniteloader.component';
import { InputComponent } from './input/input.component';
import { JWeiXinComponent } from './jweixin/jweixin.component';
import { ListComponent } from './list/list.component';
import { DemoLoadmoreComponent } from './loadmore/loadmore.component';
import { DemoMapQQComponent } from './map-qq/map-qq.component';
import { DemoMaskComponent } from './mask/mask.component';
import { DemoMsgFailComponent } from './msg/fail.component';
import { DemoMsgComponent } from './msg/msg.component';
import { DemoMsgSuccessComponent } from './msg/success.component';
import { DemoNavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { DemoPaginationComponent } from './pagination/pagination.component';
import { PanelComponent } from './panel/panel.component';
import { DemoPickerComponent } from './picker/picker.component';
import { DemoPopupComponent } from './popup/popup.component';
import { PreviewComponent } from './preview/preview.component';
import { DemoProgressComponent } from './progress/progress.component';
import { DemoPTRComponent } from './ptr/ptr.component';
import { DemoRatingComponent } from './rating/rating.component';
import { DemoSearchBarComponent } from './searchbar/searchbar.component';
import { DemoSidebarComponent } from './sidebar/sidebar.component';
import { SliderComponent } from './slider/slider.component';
import { DemoStepperComponent } from './stepper/stepper.component';
import { DemoSwiperComponent } from './swiper/swiper.component';
import { DemoTabbarComponent } from './tabbar/tabbar.component';
import { DemoToastComponent } from './toast/toast.component';
import { DemoToptipsComponent } from './toptips/toptips.component';
import { DemoUploaderComponent } from './uploader/uploader.component';

const COMPONENTS = [
  ContainerComponent,
  PageComponent,
  DemoAccordionComponent,
  ButtonComponent,
  InputComponent,
  ListComponent,
  SliderComponent,
  DemoUploaderComponent,
  DemoActionSheetComponent,
  DemoDialogComponent,
  ArticleComponent,
  FlexComponent,
  BadgeComponent,
  FooterComponent,
  GridComponent,
  IconsComponent,
  PanelComponent,
  PreviewComponent,
  DemoLoadmoreComponent,
  DemoProgressComponent,
  DemoGalleryComponent,
  DemoPickerComponent,
  DemoSearchBarComponent,
  DemoNavbarComponent,
  DemoTabbarComponent,
  DemoToastComponent,
  DemoToptipsComponent,
  DemoMsgComponent,
  DemoMsgFailComponent,
  DemoMsgSuccessComponent,
  DemoPopupComponent,
  DemoPTRComponent,
  DemoInfiniteLoaderComponent,
  DemoSidebarComponent,
  DemoSwiperComponent,
  CountdownComponent,
  GesturePasswordComponent,
  DemoChartG2Component,
  DemoMapQQComponent,
  JWeiXinComponent,
  DemoMaskComponent,
  DemoRatingComponent,
  DemoStepperComponent,
  DemoPaginationComponent,
];

@NgModule({
  imports: [SharedModule],
  declarations: COMPONENTS,
  entryComponents: [PageComponent],
  exports: COMPONENTS,
})
export class ExampleCoreModule { }
