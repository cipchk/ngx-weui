import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WeUiModule } from 'ngx-weui';
import { AqmModule } from 'angular-qq-maps';
import { GesturePasswordModule } from 'ngx-gesture-password';
import { NotifyModule } from 'ngx-notify';
import { CountdownModule } from 'ngx-countdown';

import { DocsNavComponent } from './docs-nav/docs-nav.component';
import { EditButtonComponent } from './edit-button/edit-button.component';

const COMPONENTS = [ DocsNavComponent, EditButtonComponent ];

const THIDS = [
    CountdownModule,
    NotifyModule,
    GesturePasswordModule,
    AqmModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        WeUiModule,
        ...THIDS
    ],
    declarations: COMPONENTS,
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        WeUiModule,
        ...THIDS,
        ...COMPONENTS
    ]
})
export class SharedModule {
}
