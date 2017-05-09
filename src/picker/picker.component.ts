import { Observable, Subscriber } from 'rxjs/Rx';
import { PickerData } from './data';
import { Component, forwardRef, OnDestroy, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerOptions } from './options';
import { PickerConfig } from './picker.config';

@Component({
    selector: 'weui-picker, [weui-picker]',
    template: `
        <input type="text" class="weui-input" value="{{text}}" placeholder="{{placeholder}}" 
            readonly (click)="onShow()" [disabled]="disabled" *ngIf="options.type==='form'">
        <div [hidden]="!showP">
            <div class="weui-mask" (click)="onHide(false)"
                [ngClass]="{'weui-animate-fade-in': shown, 'weui-animate-fade-out': !shown}"></div>
            <div class="weui-picker"
                [ngClass]="{'weui-animate-slide-up': shown, 'weui-animate-slide-down': !shown}">
                <div class="weui-picker__hd">
                    <a href="#" class="weui-picker__action" (click)="onCancel()">{{options.cancel}}</a>
                    <a href="#" class="weui-picker__action" (click)="onConfirm()">{{options.confirm}}</a>
                </div>
                <div class="weui-picker__bd">
                    <weui-picker-group tappable
                        *ngFor="let items of _groups; let i = index;"
                        [items]="items"
                        [defaultIndex]="_selected[i]"
                        groupIndex="{{i}}" (change)="onGroupChange($event, i)"></weui-picker-group>
                </div>
            </div>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PickerComponent),
        multi: true
    }]
})
export class PickerComponent implements ControlValueAccessor, OnDestroy, OnChanges {

    @Input() options: PickerOptions;

    _value: any;
    _selected: any[];
    _groups: PickerData[][];
    @Input() set defaultSelect(d: number[]) {
        if (d) this._selected = d;
    }
    @Input() set groups(d: PickerData[][] | String[]) {
        if (!d) throw new Error('无效数据源')
        if (d.length > 0) {
            if (typeof d[0] === 'string') {
                d = [
                    (<string[]>d).map<PickerData>((v: string) => {
                        return { label: v, value: v}
                    })
                ];
            }
        }
        this._groups = <PickerData[][]>d;
        this._selected = this._selected ? this._selected : Array(d.length).fill(0);
    }

    text: string = '';
    @Input() placeholder: string;
    @Input() disabled: boolean = false;
    @Output() change = new EventEmitter<any>();
    @Output() groupChange = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    @Output() show = new EventEmitter<any>();
    @Output() hide = new EventEmitter<any>();

    constructor(private DEF: PickerConfig) { }

    ngOnInit() {
        if (!this.options) this.parseOptions();
    }

    showP: boolean = false;
    shown: boolean = false;
    onHide(fh: boolean) {
        if (!fh && !this.options.backdrop) return false;
        this.shown = false;
        setTimeout(() => {
            this.showP = false;
            this.hide.emit();
        }, 300);
        return this;
    }

    onShow() {
        if (this.disabled) return false;
        this.showP = true;
        this.shown = true;
        this.show.emit();
        return this;
    }

    private parseOptions() {
        this.options = Object.assign(<PickerOptions>{
            type: 'form',
            cancel: '取消',
            confirm: '确定',
            backdrop: true,
            gruopCount: null,
            separator: ' '
        }, this.DEF, this.options);
    }

    private getSelecteItem() {
        let res: any[] = [];
        this._groups.forEach((items: PickerData[], idx: number) => {
            const item = items[this._selected[idx]];
            res.push(item);
        });
        return res;
    }

    setText(res: any[] = null) {
        if (res === null) res = this.getSelecteItem();
        if (res.length > 0)
            this.text = res.map((i: any) => i.label || i.value).join(this.options.separator);

        return this;
    }

    // 根据_value解析成相应值位置
    setDefault() {
        this._selected = [];
        this._groups.forEach((items: PickerData[]) => {
            let idx = items.findIndex((i: PickerData) => i.value === this._value );
            if (idx <= -1) idx = 0;
            this._selected.push(idx);
        });
        return this;
    }

    onGroupChange(data: any, groupIndex: number) {
        this._selected[groupIndex] = data.index;
        this.groupChange.emit({ item: data.item, index: data.index, groupIndex });
    }

    onCancel() {
        this.cancel.emit();
        this.onHide(true);
        return false;
    }

    onConfirm() {
        const res = this.getSelecteItem();
        this.setText(res);

        const lastItem = res[res.length - 1] || {};
        const val = lastItem.value || lastItem.label;
        this.onChange(val);
        this.onTouched();

        this.change.emit({ value: val, items: res });

        this.onHide(true);
        return false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('options' in changes) {
            this.parseOptions();
        }
    }

    ngOnDestroy(): void {
    }

    writeValue(value: any): void {
        if (value && value !== this._value) {
            this._value = value;
            // todo：当ngModel传递一个未列表中的值的情况 & 多列时数据对应问题
            this.setDefault().setText();
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }
}
