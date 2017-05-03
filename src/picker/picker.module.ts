import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerService, PickerConfig, PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent ],
    exports: [ PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent ],
    providers: [ PickerService ],
    entryComponents: [ PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent ]
})
export class PickerModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: PickerModule, providers: [ PickerConfig ] };
    }
}
