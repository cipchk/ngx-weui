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

export interface PickerData {
  [key: string]: any;

  /**
   * 显示文本
   */
  label: string;

  /**
   * 值
   */
  value: any;

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

export const FORMAT: any = {
  format: null,
  yu: '年',
  Mu: '月',
  du: '日',
  hu: '时',
  mu: '分',
};

export type DatePickerType = 'date-ym' | 'date' | 'datetime' | 'time';

export type FORMAT_TYPE =
  | string
  | {
      format: string;
      yu?: string;
      Mu?: string;
      du?: string;
      hu?: string;
      mu?: string;
    };

export interface PickerBaseConfig {
  title?: string;
  options?: PickerOptions;
  placeholder?: string;
  /**
   * 配置项
   */
  disabled?: boolean;
  value?: any;
}

export interface PickerCreateConfig extends PickerBaseConfig {
  /**
   * 数据源
   */
  data: PickerData[][] | string[];
  /**
   * 默认值（限单列时会根据值自动解析，而对多列使用defaultSelect自行解析）
   */
  value?: any;
  /**
   * 当前默认位置，数组的长度必须等同于 groups 长度
   */
  defaultSelect?: number[];
}

export interface PickerCityConfig extends PickerBaseConfig {
  /**
   * 城市数据，可以参考示例中的数据格式
   */
  data: any;
  /**
   * 默认值，即城市编号
   */
  value?: string;
  dataMap?: any;
}

export interface PickerDateTimeConfig extends PickerBaseConfig {
  /**
   * 类型，date-ym年月，date日期，datetime日期&时间（不包括秒），time时间（不包括秒）
   */
  type?: DatePickerType;
  /**
   * 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
   */
  format?: FORMAT_TYPE;
  /**
   * 默认显示日期
   */
  value?: Date;
  /**
   * 最小时间范围
   */
  min?: Date;
  /**
   * 最大时间范围
   */
  max?: Date;
}

export interface PickerGroupChange {
  item: PickerData;
  index: number;
  groupIndex: number;
}
