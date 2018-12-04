import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../utils/base.service';

import {
  FORMAT_TYPE,
  DatePickerComponent,
  DatePickerType,
} from './picker-date.component';
import { PickerData } from './data';
import { PickerOptions } from './options';
import { PickerComponent } from './picker.component';
import { CityPickerComponent } from './picker-city.component';

/**
 * 多列选择器Service，可直接通过Class构造选择器
 */
@Injectable()
export class PickerService extends BaseService {

  /**
   * 构建一个多列选择器并显示
   *
   * @param data 数据源
   * @param value 默认值（限单列时会根据值自动解析，而对多列使用defaultSelect自行解析）
   * @param defaultSelect 当前默认位置，数组的长度必须等同于 groups 长度
   * @param options 配置项
   * @returns 务必订阅结果才会显示。
   */
  show(
    data: PickerData[][] | String[],
    value?: any,
    defaultSelect?: number[],
    options?: PickerOptions,
  ): Observable<any> {
    const componentRef = this.build(PickerComponent);
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    options = Object.assign({}, options, { type: 'default' });
    componentRef.instance.options = options;
    if (defaultSelect) componentRef.instance.defaultSelect = defaultSelect;
    componentRef.instance.groups = data;
    if (value) {
      setTimeout(() => {
        componentRef.instance.writeValue(value);
      }, 100);
    }
    componentRef.instance.hide.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    componentRef.instance._onShow();
    return componentRef.instance.change;
  }

  /**
   * 构建一个城市选择器并显示
   *
   * @param data 城市数据，可以参考示例中的数据格式
   * @param [value] 默认值，即城市编号
   * @param [dataMap]
   * @param options 配置项
   * @returns 务必订阅结果才会显示。
   */
  showCity(
    data: any,
    value?: string,
    dataMap?: any,
    options?: PickerOptions,
  ): Observable<any> {
    const componentRef = this.build(CityPickerComponent);
    if (dataMap) componentRef.instance.dataMap = dataMap;
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    options = Object.assign({}, options, { type: 'default' });
    componentRef.instance.options = options;
    componentRef.instance.data = data;
    if (value) {
      setTimeout(() => {
        componentRef.instance.writeValue(value);
      }, 100);
    }
    componentRef.instance.hide.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    setTimeout(() => {
      componentRef.instance._triggerShow();
    }, 200);
    return componentRef.instance.change;
  }

  /**
   * 构建一个日期时间选择器并显示
   *
   * @param [type] 类型，date-ym年月，date日期，datetime日期&时间（不包括秒），time时间（不包括秒）
   * @param [format] 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
   * @param [value] 默认显示日期
   * @param [min] 最小时间范围
   * @param [max] 最大时间范围
   * @param [options] 配置项
   * @returns 务必订阅结果才会显示。
   */
  showDateTime(
    type?: DatePickerType,
    format?: FORMAT_TYPE,
    value?: Date,
    min?: Date,
    max?: Date,
    options?: PickerOptions,
  ): Observable<any> {
    const componentRef = this.build(DatePickerComponent);
    // 通过Service打开的强制设置为 `default` 以免出现 `input`
    options = Object.assign({}, options, { type: 'default' });
    componentRef.instance.options = options;
    if (type) componentRef.instance.type = type;
    if (format) componentRef.instance.format = format;
    if (min) componentRef.instance.min = min;
    if (max) componentRef.instance.max = max;
    if (value) {
      setTimeout(() => {
        componentRef.instance.writeValue(value);
      }, 100);
    }
    componentRef.instance.hide.subscribe(() => {
      setTimeout(() => {
        this.destroy(componentRef);
      }, 100);
    });
    setTimeout(() => {
      componentRef.instance.ngOnChanges(null);
      componentRef.instance._triggerShow();
    }, 200);
    return componentRef.instance.change;
  }
}
