import { NwSafeAny } from 'ngx-weui/core';

export interface PickerOptions {
  /**
   * 类型
   * default：无任何显示
   * form：会以表单的形式出现
   * @see https://cipchk.github.io/ngx-weui/#/example/picker
   */
  type?: 'default' | 'form';

  /**
   * 提示分隔符信息，当type==='form'时有效
   */
  separator?: string;

  /**
   * 取消按钮文本，默认：`取消`
   */
  cancel?: string;

  /**
   * 确定按钮文本，默认：`确定`
   */
  confirm?: string;

  /**
   * 允许点击背景关闭，默认：`true`
   */
  backdrop?: boolean;

  /**
   * 类名
   */
  className?: string;
}

export interface PickerChangeData {
  value: NwSafeAny;
  items: PickerData[];
}

export interface PickerDateChangeData {
  value: Date;
  formatValue: string;
  items: PickerData[];
}

export interface PickerData {
  [key: string]: NwSafeAny;

  /**
   * 显示文本
   */
  label: string;

  /**
   * 值
   */
  value: NwSafeAny;

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

export type PickerDateType = 'date-ym' | 'date' | 'datetime' | 'time';

export type PickerDateFormatType = {
  format: string | null;
  yu?: string;
  Mu?: string;
  du?: string;
  hu?: string;
  mu?: string;
};

export type PickerDateFormatFullType = string | PickerDateFormatType;

export interface PickerBaseConfig {
  /**
   * 标题
   */
  title?: string;
  /**
   * 配置项
   */
  options?: PickerOptions;
  placeholder?: string;
  disabled?: boolean;
  value?: NwSafeAny;
}

export interface PickerCreateConfig extends PickerBaseConfig {
  /**
   * 数据源
   */
  data: PickerData[][] | string[];
  /**
   * 默认值（限单列时会根据值自动解析，而对多列使用defaultSelect自行解析）
   */
  value?: NwSafeAny;
  /**
   * 当前默认位置，数组的长度必须等同于 groups 长度
   */
  defaultSelect?: number[];
}

export interface PickerCityDataMap {
  /**
   * 标签映射键值，默认：`name`
   */
  label: string;
  /**
   * 值映射键值，默认：`code`
   */
  value: string;
  /**
   * 子项列表映射键值，默认：`sub`
   */
  items: string;
}

export interface PickerCityData {
  [key: string]: NwSafeAny;
  name: string;
  code: string;
  sub?: PickerCityData[];
}

export interface PickerCityConfig extends PickerBaseConfig {
  /**
   * 城市数据，可以参考示例中的数据格式
   */
  data: PickerCityData[];
  /**
   * 默认值，即城市编号
   */
  value?: string;
  /**
   * 映射键值配置
   */
  dataMap?: PickerCityDataMap;
}

export interface PickerDateTimeConfig extends PickerBaseConfig {
  /**
   * 类型
   * + `date-ym` 年月
   * + `date` 日期
   * + `datetime` 日期&时间（不包括秒）
   * + `time` 时间（不包括秒）
   */
  type?: PickerDateType;
  /**
   * 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
   */
  format?: PickerDateFormatFullType;
  /**
   * 默认显示日期
   */
  value?: Date;
  /**
   * 最小时间范围，当前只限定年月日，暂不包括时间范围
   */
  min?: Date;
  /**
   * 最大时间范围，当前只限定年月日，暂不包括时间范围
   */
  max?: Date;
}

export interface PickerGroupChange {
  item: PickerData;
  index: number;
  groupIndex: number;
}
