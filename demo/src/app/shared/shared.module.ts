import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, JsonpModule } from '@angular/http';

import { WeUiModule } from 'ngx-weui';

import { ChecklistDirective } from "./directives/checklist";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule, JsonpModule,

        WeUiModule.forRoot()
    ],
    providers: [
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
        WeUiModule
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
