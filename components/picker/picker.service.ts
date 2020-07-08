import { ComponentRef, Injectable } from '@angular/core';
import { BaseService } from 'ngx-weui/core';
import { Observable } from 'rxjs';
import { PickerBaseComponent } from './picker-base.component';
import { CityPickerComponent } from './picker-city.component';
import { DatePickerComponent } from './picker-date.component';
import { PickerComponent } from './picker.component';
import {
  DatePickerType,
  FORMAT_TYPE,
  PickerBaseConfig,
  PickerCityConfig,
  PickerCreateConfig,
  PickerData,
  PickerDateTimeConfig,
  PickerOptions,
} from './picker.types';

/**
 * 多列选择器Service，可直接通过Class构造选择器
 */
@Injectable({ providedIn: 'root' })
export class PickerService extends BaseService {
  private attachBase(ref: ComponentRef<PickerBaseComponent>, config: PickerBaseConfig): void {
    const instance = ref.instance;
    const { options, title, placeholder, disabled } = config;
    instance.options = options!;
    instance.title = title!;
    instance.placeholder = placeholder!;
    instance.disabled = disabled!;
    const value = (config as any).value;
    if (value) {
      setTimeout(() => {
        instance.writeValue(value);
      }, 100);
    }
    instance.hide.subscribe(() => {
      setTimeout(() => {
        this.destroy(ref);
      }, 100);
    });
  }

  create(config: PickerCreateConfig): Observable<any> {
    const { options, defaultSelect, data } = config;
    const componentRef = this.build(PickerComponent);
    const instance = componentRef.instance;
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    config.options = { ...options, type: 'default' };
    this.attachBase(componentRef, config);
    if (defaultSelect) {
      instance.defaultSelect = defaultSelect;
    }
    instance.groups = data;
    instance._onShow();
    return instance.change;
  }

  /**
   * @deprecated Use `create()` instead and going to be removed in 11.0.0
   *
   * 构建一个多列选择器并显示
   */
  show(data: PickerData[][] | string[], value?: any, defaultSelect?: number[], options?: PickerOptions): Observable<any> {
    return this.create({ data, value, defaultSelect, options });
  }

  /**
   * 构建一个城市选择器并显示
   */
  city(config: PickerCityConfig): Observable<any> {
    const { dataMap, data, options } = config;
    const componentRef = this.build(CityPickerComponent);
    const instance = componentRef.instance;
    if (dataMap) {
      instance.dataMap = dataMap;
    }
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    config.options = { ...options, type: 'default' };
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
  showCity(data: any, value?: string, dataMap?: any, options?: PickerOptions): Observable<any> {
    return this.city({ data, value, dataMap, options });
  }

  /**
   * 构建一个日期时间选择器并显示
   */
  dateTime(config: PickerDateTimeConfig): Observable<any> {
    const { options, type, format, min, max } = config;
    const componentRef = this.build(DatePickerComponent);
    const instance = componentRef.instance;
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    config.options = { ...options, type: 'default' };
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
    type?: DatePickerType,
    format?: FORMAT_TYPE,
    value?: Date,
    min?: Date,
    max?: Date,
    options?: PickerOptions,
  ): Observable<any> {
    return this.dateTime({ type, format, value, min, max, options });
  }
}
