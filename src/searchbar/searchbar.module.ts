import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SearchBarComponent, SearchBarConfig } from "./index";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ SearchBarComponent ],
    exports: [ SearchBarComponent ],
    entryComponents: [ SearchBarComponent ]
})
export class SearchBarModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: SearchBarModule, providers: [ SearchBarConfig ] };
    }
}
