import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityPickerComponent } from './picker-city.component';
import { DatePickerComponent } from './picker-date.component';
import { PickerGroupComponent } from './picker-group.component';
import { PickerComponent } from './picker.component';

const COMPONENTS = [PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent];

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: COMPONENTS,
})
export class PickerModule {}
