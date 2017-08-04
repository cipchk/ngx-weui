import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { InputDirective, VCodeDirective, TextareaDirective, ChecklistDirective } from "./index";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [
        InputDirective,
        VCodeDirective,
        TextareaDirective,
        ChecklistDirective
    ],
    exports: [
        InputDirective,
        VCodeDirective,
        TextareaDirective,
        ChecklistDirective
    ]
})
export class FormModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: FormModule, providers: [] };
    }
}
