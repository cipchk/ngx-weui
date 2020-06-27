import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AqmModule } from 'angular-qq-maps';
import { CountdownModule } from 'ngx-countdown';
import { GesturePasswordModule } from 'ngx-gesture-password';
import { ToastrModule } from 'ngx-toastr';

import { DocsNavComponent } from './docs-nav/docs-nav.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { SHARED_WEUI_MODULES } from './shared-weui.module';

const COMPONENTS = [DocsNavComponent, EditButtonComponent];

const THIDS = [CountdownModule, ToastrModule, GesturePasswordModule, AqmModule];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...SHARED_WEUI_MODULES, ...THIDS],
  declarations: COMPONENTS,
  exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...SHARED_WEUI_MODULES, ...THIDS, ...COMPONENTS],
})
export class SharedModule {}
