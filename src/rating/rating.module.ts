import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingConfig, RatingComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ RatingComponent ],
    exports: [ RatingComponent ],
    entryComponents: [ RatingComponent ]
})
export class RatingModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: RatingModule, providers: [ RatingConfig ] };
    }
}
