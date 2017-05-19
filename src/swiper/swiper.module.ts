import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SwiperComponent, SwiperConfig } from "./index";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ SwiperComponent ],
    exports: [ SwiperComponent ],
    providers: [ SwiperConfig ]
})
export class SwiperModule  {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: SwiperModule, providers: [ SwiperConfig ] };
    }
}
