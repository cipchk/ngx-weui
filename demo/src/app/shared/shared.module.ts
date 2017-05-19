import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, JsonpModule } from '@angular/http';

import { WeUiModule, ButtonConfig } from 'ngx-weui';

import { CountdownModule } from 'ngx-countdown';
import { NotifyModule } from 'ngx-notify';
import { GesturePasswordModule } from 'ngx-gesture-password';

import { ChecklistDirective } from "./directives/checklist";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule, JsonpModule,

        WeUiModule.forRoot(),
        CountdownModule,
        NotifyModule.forRoot({
            notify: {
                progress: false
            }
        }),
        GesturePasswordModule
    ],
    providers: [
        // { provide: ButtonConfig, useFactory: ()=> { return Object.assign(new ButtonConfig(), { type: 'warn' }); } }
    ],
    declarations: [
        ChecklistDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule, JsonpModule,
        RouterModule,
        
        ChecklistDirective,
        WeUiModule,

        CountdownModule, NotifyModule, GesturePasswordModule
    ],
    entryComponents: [
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
