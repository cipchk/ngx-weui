import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './../button/button.module';

import { PaginationComponent, PaginationConfig } from "./index";

@NgModule({
    imports: [ CommonModule, ButtonModule.forRoot() ],
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: PaginationModule, providers: [ PaginationConfig ] };
    }
}
