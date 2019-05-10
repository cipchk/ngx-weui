import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CityPickerComponent } from './picker-city.component';
import { DatePickerComponent } from './picker-date.component';
import { PickerGroupComponent } from './picker-group.component';
import { PickerComponent } from './picker.component';
import { PickerConfig } from './picker.config';
import { PickerService } from './picker.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent],
  exports: [PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent],
  providers: [PickerService],
  entryComponents: [PickerComponent, PickerGroupComponent, DatePickerComponent, CityPickerComponent],
})
export class PickerModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PickerModule, providers: [PickerConfig] };
  }
}
