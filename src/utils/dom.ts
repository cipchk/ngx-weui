/**
 * 向上查找父节点
 *
 * @param {*} el
 * @param {string} selector
 */
export function findParent(el: any, selector: string): any {
    let retEl = null;
    while (el) {
        if (el.matches(selector)) {
            retEl = el;
            break;
        }
        el = el.parentElement;
    }
    return retEl;
}

/**
 * 查找并创建
 *
 * @export
 * @param {*} el
 * @param {string} [selector='.weui-cell__ft']
 * @param {string} [tagName='div']
 * @param {string} [className='weui-cell__ft']
 */
export function add(el: any, selector: string = '.weui-cell__ft', tagName: string = 'div', className: string = 'weui-cell__ft', cssText: string = '') {
    let ret = el.querySelector(selector);
    if (!ret) {
        ret = document.createElement(tagName);
        ret.className = className;
        if (cssText)
            ret.style.cssText = cssText;
        el.appendChild(ret);
    }
    return ret;
}

/**
 * 移除
 *
 * @export
 * @param {*} el
 * @param {string} selector
 */
export function remove(el: any, selector: string) {
    const ret = el.querySelector(selector);
    if (ret) {
        el.removeChild(ret);
    }
}
