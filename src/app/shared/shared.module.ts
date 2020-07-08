import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AqmModule } from 'angular-qq-maps';
import { CountdownModule } from 'ngx-countdown';
import { GesturePasswordModule } from 'ngx-gesture-password';
import { ToastrModule } from 'ngx-toastr';
// import { SHARED_WEUI_MODULES } from './shared-weui.module';
// tslint:disable-next-line: import-blacklist
import { WeUiModule } from 'ngx-weui';

import { DocsNavComponent } from './docs-nav/docs-nav.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { ThemeBtnComponent } from './theme-btn/theme-btn.component';

const COMPONENTS = [DocsNavComponent, EditButtonComponent, ThemeBtnComponent];
const SHARED_WEUI_MODULES: any[] = [];
const THIDS = [CountdownModule, ToastrModule, GesturePasswordModule, AqmModule, WeUiModule];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...SHARED_WEUI_MODULES, ...THIDS],
  declarations: COMPONENTS,
  exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...SHARED_WEUI_MODULES, ...THIDS, ...COMPONENTS],
})
export class SharedModule {}
