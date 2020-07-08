import { ComponentRef, Injectable } from '@angular/core';
import { BaseService, NwSafeAny } from 'ngx-weui/core';
import { Observable } from 'rxjs';
import { PickerBaseComponent } from './picker-base.component';
import { CityPickerComponent } from './picker-city.component';
import { DatePickerComponent } from './picker-date.component';
import { PickerComponent } from './picker.component';
import {
  PickerBaseConfig,
  PickerChangeData,
  PickerCityConfig,
  PickerCityData,
  PickerCityDataMap,
  PickerCreateConfig,
  PickerData,
  PickerDateChangeData,
  PickerDateFormatFullType,
  PickerDateTimeConfig,
  PickerDateType,
  PickerOptions,
} from './picker.types';

/**
 * 多列选择器Service，可直接通过Class构造选择器
 */
@Injectable({ providedIn: 'root' })
export class PickerService extends BaseService {
  private attachBase(ref: ComponentRef<PickerBaseComponent>, config: PickerBaseConfig): void {
    const instance = ref.instance;
    const { options, title, placeholder, disabled, value } = config;
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    config.options = { ...options, type: 'default' };
    instance.options = config.options;
    instance.title = title!;
    instance.placeholder = placeholder!;
    instance.disabled = disabled!;
    if (value) {
      setTimeout(() => instance.writeValue(value), 100);
    }
    instance.hide.subscribe(() => setTimeout(() => this.destroy(ref), 100));
  }

  create(config: PickerCreateConfig): Observable<PickerChangeData> {
    const { defaultSelect, data } = config;
    const componentRef = this.build(PickerComponent);
    const instance = componentRef.instance;
    if (defaultSelect) {
      instance.defaultSelect = defaultSelect;
    }
    instance.groups = data;
    this.attachBase(componentRef, config);
    instance._onShow();
    return instance.change;
  }

  /**
   * @deprecated Use `create()` instead and going to be removed in 11.0.0
   *
   * 构建一个多列选择器并显示
   */
  show(
    data: PickerData[][] | string[],
    value?: NwSafeAny,
    defaultSelect?: number[],
    options?: PickerOptions,
  ): Observable<PickerChangeData> {
    return this.create({ data, value, defaultSelect, options });
  }

  /**
   * 构建一个城市选择器并显示
   */
  city(config: PickerCityConfig): Observable<PickerChangeData> {
    const { dataMap, data } = config;
    const componentRef = this.build(CityPickerComponent);
    const instance = componentRef.instance;
    if (dataMap) {
      instance.dataMap = dataMap;
    }
    this.attachBase(componentRef, config);
    instance.data = data;
    setTimeout(() => {
      instance._triggerShow();
    }, 200);
    return instance.change;
  }

  /**
   * @deprecated Use `city()` instead and going to be removed in 11.0.0
   *
   * 构建一个城市选择器并显示
   */
  showCity(data: PickerCityData[], value?: string, dataMap?: PickerCityDataMap, options?: PickerOptions): Observable<PickerChangeData> {
    return this.city({ data, value, dataMap, options });
  }

  /**
   * 构建一个日期时间选择器并显示
   */
  dateTime(config: PickerDateTimeConfig): Observable<PickerDateChangeData> {
    const { type, format, min, max } = config;
    const componentRef = this.build(DatePickerComponent);
    const instance = componentRef.instance;
    this.attachBase(componentRef, config);
    if (type) {
      instance.type = type;
    }
    if (format) {
      instance.format = format;
    }
    if (min) {
      instance.min = min;
    }
    if (max) {
      instance.max = max;
    }
    setTimeout(() => {
      instance.ngOnChanges();
      instance._triggerShow();
    }, 200);
    return instance.change;
  }

  /**
   * @deprecated Use `dateTime()` instead and going to be removed in 11.0.0
   *
   * 构建一个日期时间选择器并显示
   */
  showDateTime(
    type?: PickerDateType,
    format?: PickerDateFormatFullType,
    value?: Date,
    min?: Date,
    max?: Date,
    options?: PickerOptions,
  ): Observable<PickerDateChangeData> {
    return this.dateTime({ type, format, value, min, max, options });
  }
}
