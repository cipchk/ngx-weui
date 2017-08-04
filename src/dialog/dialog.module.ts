import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogService, DialogConfig, DialogComponent } from "./index";
import { FormModule } from './../form/form.module';
import { SliderModule } from './../slider/slider.module';
import { MaskModule } from './../mask/mask.module';

@NgModule({
    imports: [ CommonModule, FormsModule, MaskModule, FormModule, SliderModule ],
    declarations: [ DialogComponent ],
    exports: [ DialogComponent ],
    providers: [ DialogService ],
    entryComponents: [ DialogComponent ]
})
export class DialogModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DialogModule, providers: [ DialogConfig ] };
    }
}
