import { ɵgetDOM as getDOM } from '@angular/platform-browser';

/**
 * 判断是否安卓系统 
 * 
 * @export
 * @returns 
 */
export function isAndroid() {
    return /android (\d+)/.test(getDOM().getUserAgent().toLowerCase());
}
