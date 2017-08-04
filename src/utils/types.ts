/**
 * 按钮类型
 */
export type ButtonType = 'default' | 'primary' | 'warn';

/**
 * 文本框类型
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'url';

/**
 * 文本框数据项
 */
export type InputData = { text: string, [key: string]: any };

/**
 * 样式类型
 */
export type SkinType = 'ios' | 'android' | 'auto';

/**
 * 已经实现的动画效果
 */
export type AnimateType = 'none' | 'slide';
