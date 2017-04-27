import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormComponent } from './form.component';
import { FormCellComponent } from './form-cell.component';
import { RadioComponent } from './radio.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [
        FormComponent,
        FormCellComponent,
        RadioComponent
    ],
    exports: [
        FormComponent,
        FormCellComponent,
        RadioComponent
    ]
})
export class FormModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: FormModule, providers: [] };
    }
}
