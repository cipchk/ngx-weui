import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TabDirective, NavbarComponent, TabbarComponent, BarComponent } from "./index";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ TabDirective, NavbarComponent, TabbarComponent, BarComponent ],
    exports: [ TabDirective, NavbarComponent, TabbarComponent ]
})
export class TabModule  {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: TabModule, providers: [  ] };
    }
}
