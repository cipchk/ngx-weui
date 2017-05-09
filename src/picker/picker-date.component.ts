import { Component, Input, Output, forwardRef, EventEmitter, OnDestroy, ViewChild, LOCALE_ID, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PickerOptions } from './options';
import { PickerComponent } from "./picker.component";

export const FORMAT: any = {
    format: null,
    yu: '年',
    Mu: '月',
    du: '日',
    hu: '时',
    mu: '分'
};

export type FORMAT_TYPE = string | { format: string, yu?: string, Mu?: string, du?: string, hu?: string, mu?: string };

@Component({
    selector: 'weui-date-picker',
    template: `
    <weui-picker [placeholder]="placeholder"
        [groups]="groups" [defaultSelect]="selected" [disabled]="disabled" [options]="options"
        (show)="onShow()" 
        (hide)="onHide()" 
        (change)="onCityChange($event)" 
        (groupChange)="onCityGroupChange($event)" 
        (cancel)="onCityCancelChange()"></weui-picker>
    `,
    providers: [
        DatePipe, {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor, OnDestroy, OnChanges {

    @ViewChild(PickerComponent) pickerInstance: PickerComponent;

    value: Date;
    groups: any[] = [];
    selected: number[] = [];

    // todo：只限定年月日
    @Input() min: Date;
    @Input() max: Date;
    @Input() type: 'date' | 'datetime' | 'time' = 'date';

    private _format: any = Object.assign({}, FORMAT);
    @Input() set format(v: FORMAT_TYPE) {
        if (typeof v === 'string') {
            this._format = Object.assign(FORMAT, {
                format: v
            });
        } else {
            this._format = Object.assign(FORMAT, v);
        }
    }

    @Input() options: PickerOptions;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Output() change = new EventEmitter<any>();
    @Output() groupChange = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    @Output() show = new EventEmitter<any>();
    @Output() hide = new EventEmitter<any>();

    constructor(private el: ElementRef, private datePipe: DatePipe) { }

    // todo: 太粗暴，需要优化代码
    private genGroups() {
        if (!this.value) this.value = new Date();
        this.groups = [];
        this.selected = [];
        if (~this.type.indexOf('date'))
            this.genDateGroups();
        if (~this.type.indexOf('time'))
            this.genDateTimeGroups();
    }

    private genDateGroups() {
        const year = this.value.getFullYear(),
            month = this.value.getMonth() + 1,
            day = this.value.getDate();

        // year
        let _selected = 0,
            startYear = year - 10,
            endYear = year + 10;
        if (this.min) startYear = this.min.getFullYear();
        if (this.max) endYear = this.max.getFullYear();
        this.groups.push(Array(endYear - startYear + 1).fill(0).map((v: number, idx: number) => {
            const _v = startYear + idx;
            if (_v === year) _selected = idx;
            return { label: _v + this._format.yu, value: _v };
        }));
        this.selected.push(_selected);

        // month
        const cy = this.groups[0][_selected].value;
        let startMonth = 1, endMonth = 12;
        if (cy === startYear) startMonth = this.min.getMonth() + 1;
        if (cy === endYear) endMonth = this.max.getMonth() + 1;
        _selected = 0;
        this.groups.push(Array(endMonth - startMonth + 1).fill(0).map((v: number, idx: number) => {
            const _v = startMonth + idx;
            if (_v === month) _selected = idx;
            return { label: _v + this._format.Mu, value: _v };
        }));
        this.selected.push(_selected);

        // day
        const cm = this.groups[1][_selected].value;
        let startDay = 1, endDay = new Date(year, month, 0).getDate();
        if (cy === startYear && cm === startMonth) startDay = this.min.getDate();
        if (cy === endYear && cm === endMonth) endDay = this.max.getDate();
        _selected = 0;
        this.groups.push(Array(endDay - startDay + 1).fill(0).map((v: number, idx: number) => {
            const _v = startDay + idx;
            if (_v === day) _selected = idx;
            return { label: _v + this._format.du, value: _v };
        }));
        this.selected.push(_selected);
    }

    private genDateTimeGroups() {
        const hours = this.value.getHours(),
            minutes = this.value.getMinutes();
        // hours
        let _selected = 0;
        this.groups.push(Array(24).fill(0).map((v: number, idx: number) => {
            const _v = idx + 1;
            if (_v === hours) _selected = idx;
            return { label: _v + this._format.hu, value: _v };
        }));
        this.selected.push(_selected);

        // minutes
        _selected = 0;
        this.groups.push(Array(60).fill(0).map((v: number, idx: number) => {
            const _v = idx;
            if (_v === minutes) _selected = idx;
            return { label: _v + this._format.mu, value: _v };
        }));
        this.selected.push(_selected);
    }

    // 根据selected
    private genValueBySelected() {
        if (this.type === 'time') {
            const now = new Date();
            this.value = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), this.groups[0][this.selected[0]].value, this.groups[1][this.selected[1]].value, 0);
            return this;
        }
        let obj = {
            y: this.groups[0][this.selected[0]].value,
            M: this.groups[1][this.selected[1]].value - 1,
            d: this.groups[2][this.selected[2]].value,
            h: 0,
            m: 0,
            s: 0
        };
        if (~this.type.indexOf('time')) {
            obj.h = this.groups[3][this.selected[3]].value;
            obj.m = this.groups[4][this.selected[4]].value;
        }
        this.value = new Date(obj.y, obj.M, obj.d, obj.h, obj.m, obj.s);
        return this;
    }

    ngOnDestroy(): void {
        this.groups = null;
    }

    onCityChange(data: any) {
        this.genValueBySelected();
        const retVal = new Date(this.value.getTime());
        this.onChange(retVal);
        this.onTouched();

        data.value = retVal;
        let f: string = '';
        if (this._format && this._format.format)
            f = this._format.format;
        else {
            switch (this.type) {
                case 'date':
                    f = 'yyyy-MM-dd';
                    break;
                case 'datetime':
                    f = 'yyyy-MM-dd HH:mm:ss';
                    break;
                case 'time':
                    f = 'HH:mm';
                    break;
            }
        }

        data.formatValue = this.datePipe.transform(retVal, f);
        this.pickerInstance.text = data.formatValue;

        this.change.emit(data);
    }

    onCityGroupChange(res: any) {
        this.selected[res.groupIndex] = res.index;
        if (res.groupIndex !== (this.groups.length - 1)) {
            this.genValueBySelected().genGroups();
        }

        this.groupChange.emit(res);
    }

    onCityCancelChange() {
        this.cancel.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.genGroups();
    }

    triggerShow() {
        this.pickerInstance.onShow();
    }

    onShow() {
        this.show.emit();
    }

    onHide() {
        this.hide.emit();
    }

    writeValue(value: Date): void {
        if (value) {
            this.value = value;
            this.genGroups();
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }

}
