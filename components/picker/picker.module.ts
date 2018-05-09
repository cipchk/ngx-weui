import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerComponent } from './picker.component';
import { PickerGroupComponent } from './picker-group.component';
import { DatePickerComponent } from './picker-date.component';
import { CityPickerComponent } from './picker-city.component';
import { PickerService } from './picker.service';
import { PickerConfig } from './picker.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PickerComponent,
    PickerGroupComponent,
    DatePickerComponent,
    CityPickerComponent,
  ],
  exports: [
    PickerComponent,
    PickerGroupComponent,
    DatePickerComponent,
    CityPickerComponent,
  ],
  providers: [PickerService],
  entryComponents: [
    PickerComponent,
    PickerGroupComponent,
    DatePickerComponent,
    CityPickerComponent,
  ],
})
export class PickerModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PickerModule, providers: [PickerConfig] };
  }
}
