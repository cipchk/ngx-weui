import { Observable, Subscription } from 'rxjs/Rx';
import { Component, Input, EventEmitter, Output, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { PickerData } from './data';

declare const window: any;
const getWindowHeight = (): number => {
    return window.innerHeight;
};

@Component({
    selector: 'weui-picker-group, [weui-picker-group]',
    template: `
        <ng-content></ng-content>
        <div class="weui-picker__mask"></div>
        <div class="weui-picker__indicator"></div>
        <div class="weui-picker__content" [ngStyle]="{
            'transform': 'translate(0,' + distance + 'px)',
            'transition': animating ? 'transform .3s' : 'none'
        }">
            <div class="weui-picker__item" *ngFor="let item of items"
                [ngClass]="{'weui-picker__item_disabled': item.disabled}">{{item.label || item.value}}</div>
        </div>
    `,
    host: {
        '[class.weui-picker__group]': 'true'
    }
})
export class PickerGroupComponent implements OnDestroy, OnChanges {

    @Input() value: any;
    @Input() items: PickerData[];
    @Input() groupIndex: number;
    @Output() change = new EventEmitter<any>();

    private defaults: any = {
        offset: 3,           // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
        rowHeight: 34,       // 列表每一行的高度
        bodyHeight: 7 * 34,  // picker的高度，用于辅助点击滚动的计算
        inertiaTime: 150,    // 惯性滑动的保持时间，此值直接影响“灵敏度” (单位：ms)
        slideDuration: 300   // 惯性滑动的动画时间，表现为最终可视化的效果
    };

    private startTime: number; // 开始触摸的时间
    private startY: number;    // 保存开始按下的位置 (touchstart)
    private endY: number;      // 保存结束时的位置 (touchend)
    private speed: number;     // 手滑动的速度 (用途：速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离)
    private animating: boolean = false;
    private distance = 0;

    ngOnInit() {
        //this.init();
    }

    ngOnChanges(changes: SimpleChanges): void {
        //  && !changes.value.firstChange
        if ('value' in changes) {
            this.setDefault();
        }
    }

    @HostListener('touchstart', ['$event'])
    handleTouchStart(e: TouchEvent): void {
        if (this.items.length <= 1) return;

        this.startY = e.changedTouches[0].pageY;
        this.startTime = +new Date();
    }

    @HostListener('touchmove', ['$event'])
    handleTouchMove(e: TouchEvent): void {
        if (this.items.length <= 1) return;

        const endTime = +new Date();
        this.endY = e.changedTouches[0].pageY;

        // 计算滑动的速度: 距离 / 时间
        const _distance: number = this.endY - this.startY;
        this.speed = _distance / (endTime - this.startTime);

        // 重新设置开始时间、开始位置
        this.startTime = endTime;
        this.startY = this.endY;
        this.animating = false;          // ms
        this.distance += _distance; // 内容移动的距离

        e.preventDefault();
    }

    @HostListener('touchend', ['$event'])
    handleTouchEnd(event: TouchEvent): void {
        if (!this.startY) return;
        this.endY = event.changedTouches[0].pageY;

        /**
         * 思路:
         * 根据最后一次touchmove事件的速度(speed)，判断是否执行惯性滑动；
         * 如果speed大于1、小于5，则根据速度乘以惯性滑动的时间(如150ms)，计算出应该滑动的距离；
         * 如果speed大于5，则按照屏幕的高度(减去列表高度的一半)，作为该滑动的距离。
         */
        const _speed = Math.abs(this.speed);
        if (_speed >= 5) {
            const windowY = getWindowHeight() - (this.defaults.bodyHeight / 2);
            this.stop(windowY - this.endY);
        } else if (_speed >= 1) {
            const diff = this.speed * this.defaults.inertiaTime; // 滑行 150ms,这里直接影响“灵敏度”
            this.stop(diff);
        } else {
            this.stop(0);
        }
        this.startY = null;
    }

    private setDefault(): void {
        let index = 0;
        if (this.value) { // 有传入value，则按value找可匹配的选项
            const len = this.items && this.items.length || 0;
            for (; index < len; index++) {
                const item = this.items[index];
                if (this.value === item.value) {
                    this.onChange(item, index);
                    this.distance = (this.defaults.offset - index) * this.defaults.rowHeight;
                    return; // 已找到匹配选项，直接返回
                }
            }
            console.warn('Picker has not match defaultValue:', this.value);
        }

        // 没有传入value，或者 有value但是没有匹配的选项
        index = this._getDefaultIndex();
        this.onChange(this.items[index], index);
        this.distance = this._getDefaultTranslate(this.defaults.offset, this.defaults.rowHeight);
    }

    private stop(diff: number): void {
        let dist = this.distance + diff;

        // 移动到最接近的那一行
        dist = Math.round(dist / this.defaults.rowHeight) * this.defaults.rowHeight;
        const max = this._getMax(this.defaults.offset, this.defaults.rowHeight);
        const min = this._getMin(this.defaults.offset, this.defaults.rowHeight, this.items.length);

        // 不要超过最大值或者最小值
        dist = Math.max(Math.min(dist, max), min);

        // 如果是 disabled 的就跳过
        let index = this.defaults.offset - dist / this.defaults.rowHeight;
        while (!!this.items[index] && this.items[index].disabled) {
            diff > 0 ? ++index : --index;
        }
        dist = (this.defaults.offset - index) * this.defaults.rowHeight;

        this.animating = true;
        this.distance = dist; // px

        // 触发选择事件
        this.onChange(this.items[index], index);
    }

    private onChange(item: PickerData, index: number = 0): void {
        this.change.emit({ item, index });
    }

    private _getMax(offset: number, rowHeight: number): number {
        return offset * rowHeight;
    }

    private _getMin(offset: number, rowHeight: number, length: number): number {
        return -(rowHeight * (length - offset - 1));
    }

    private _getDefaultIndex(): number {
        let current = Math.floor(this.items.length / 2);
        let count = 0;
        while (!!this.items[current] && this.items[current].disabled) {
            current = ++current % this.items.length;
            count++;

            if (count > this.items.length) {
                throw new Error('No selectable item.');
            }
        }

        return current;
    }

    private _getDefaultTranslate(offset: number, rowHeight: number): number {
        const currentIndex = this._getDefaultIndex();
        return (offset - currentIndex) * rowHeight;
    }

    ngOnDestroy(): void {
    }
}
