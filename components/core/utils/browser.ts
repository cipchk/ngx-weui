import { ɵgetDOM as getDOM } from '@angular/platform-browser';

declare const window: any;

/**
 * 检查是否安卓系统
 */
export function isAndroid() {
  return /android (\d+)/.test(
    getDOM()
      .getUserAgent()
      .toLowerCase(),
  );
}

/**
 * 检查是否IOS系统
 */
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(getDOM().getUserAgent());
}

/**
 * 检查File是否为图像文件
 */
export function isImage(file: File) {
  if (!(file instanceof window.File)) return false;
  const type = `|${file.type.slice(file.type.lastIndexOf('/') + 1)}|`;
  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
}

/**
 * 生成可预览的图像地址
 */
export function genImageUrl(file: File) {
  if (isImage(file)) return window.URL.createObjectURL(file);
  return '';
}
