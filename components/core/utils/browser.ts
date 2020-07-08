import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { NwSafeAny } from '../types';

declare const window: NwSafeAny;

/**
 * 是否服务端渲染
 */
export const isSSR = !(typeof document === 'object' && !!document);

export function isPlatform(type: 'android' | 'ios'): boolean {
  const body = getDOM().getDefaultDocument().querySelector('body') as HTMLBodyElement;
  return body && body.getAttribute('data-platform') === type;
}

/**
 * 检查是否安卓系统
 */
export function isAndroid(): boolean {
  return isPlatform('android') ? true : /android (\d+)/.test(getDOM().getUserAgent().toLowerCase());
}

/**
 * 检查是否IOS系统
 */
export function isIOS(): boolean {
  return isPlatform('ios') ? true : /iPad|iPhone|iPod/.test(getDOM().getUserAgent());
}

/**
 * 检查File是否为图像文件
 */
export function isImage(file: File): boolean {
  if (isSSR && !(file instanceof window.File)) {
    return false;
  }
  const type = `|${file.type.slice(file.type.lastIndexOf('/') + 1)}|`;
  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
}

/**
 * 生成可预览的图像地址
 */
export function genImageUrl(file: File): string {
  if (!isSSR && isImage(file)) {
    return window.URL.createObjectURL(file);
  }
  return '';
}
