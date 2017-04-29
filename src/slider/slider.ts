import { Directive, forwardRef, ElementRef, OnDestroy, HostListener, ContentChild, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[weui-slider]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SliderDirective),
        multi: true
    }]
})
export class SliderDirective implements ControlValueAccessor, OnDestroy, OnChanges {

    private _state: any = null;

    private _value: number = 0;

    private isInit: boolean = false;
    private trackEl: any;
    private handlerEl: any;
    private onStart: any;
    private onMove: any;

    @Input('weui-min') min: number = 0;
    @Input('weui-max') max: number = 100;
    @Input('weui-step') step: number = 1;
    @Input('weui-enabled') enabled: boolean = true;
    @Output('weui-change') change = new EventEmitter();

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.isInit = true;
        this.trackEl = this.el.nativeElement.querySelector('.weui-slider__track');
        this.handlerEl = this.el.nativeElement.querySelector('.weui-slider__handler');
        if (this.trackEl === null || this.handlerEl === null)
            throw new Error('失效DOM结构');

        this.onStart = this._onStart.bind(this);
        this.onMove = this._onMove.bind(this);
        this.handlerEl.addEventListener('touchstart', this.onStart, false);
        this.handlerEl.addEventListener('touchmove', this.onMove, false);
    }

    ngOnDestroy(): void {
        this.handlerEl.removeEventListener('touchstart', this.onStart, false);
        this.handlerEl.removeEventListener('touchmove', this.onMove, false);
    }

    private refresh() {
        const el = this.el.nativeElement;
        this._state = {
            enabled: this.enabled,
            left: el.getBoundingClientRect().left,
            size: el.querySelector('.weui-slider__inner').offsetWidth,
            percentage: [0, 0, 0],
            x: 0
        };
        this.max = +this.max;
        this.min = +this.min;
        this.step = +this.step;

        this.setValue(this._value);
        this.layout();
    }

    private setValue(value: number) {
        if (this.max > this.min) {
            this._state.percentage = [100 * (value - this.min) / (this.max - this.min), 0, this.step * 100 / (this.max - this.min)];
        } else {
            this._state.percentage = [0, 0, 100];
        }
    }

    private layout() {
        this.trackEl.style.width = this._state.percentage[0] + '%';
        this.handlerEl.style.left = this._state.percentage[0] + '%';
    }

    private _onStart($event: any) {
        if (this._state === null) this.refresh();

        this._state.x = ($event.touches[0] || $event.changedTouches[0]).pageX;
    }

    private _onMove($event: any) {
        if (!this._state.enabled) return false;

        const pageX = ($event.touches[0] || $event.changedTouches[0]).pageX;

        const xDiff = pageX - this._state.x;
        if (xDiff >= 15 || xDiff <= 15) {
            this._state.percentage[0] = this.getPercentage(pageX, $event);
            this.layout();
            this.calculateValue(this._state.percentage[0]);
        }
    }

    private getPercentage(pageX: number, $event: any): number {
	    const distanceToSlide = pageX - this._state.left;
        let percentage = distanceToSlide / this._state.size * 100;
        percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
        return Math.max(0, Math.min(100, percentage));
    }

    private calculateValue(percentage: number) {
        let rawValue = percentage / 100 * (this.max - this.min);
        // adjustment = this.min
        let value = this.min + Math.round(rawValue / this.step) * this.step;
        if (value < this.min)
            value = this.min;
        else if (value > this.max)
            value = this.max;
        
        this._value = value;
        this.onChange(this._value);
        this.onTouched();
        this.change.emit(this._value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isInit)
            this.refresh();
    }

    writeValue(value: any): void {
        if (value) {
            this._value = +value;
            this.refresh();
            this.calculateValue(this._state.percentage[0]);
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }
}
