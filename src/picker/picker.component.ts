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
            readonly (click)="onShow()">
        <div [hidden]="!showd">
            <div class="weui-mask" (click)="onHide(false)"
                [ngClass]="{'weui-animate-fade-in': show, 'weui-animate-fade-out': !show}"></div>
            <div class="weui-picker"
                [ngClass]="{'weui-animate-slide-up': show, 'weui-animate-slide-down': !show}">
                <div class="weui-picker__hd">
                    <a href="#" class="weui-picker__action" (click)="onCancel()">{{options.cancel}}</a>
                    <a href="#" class="weui-picker__action" (click)="onConfirm()">{{options.confirm}}</a>
                </div>
                <div class="weui-picker__bd">
                    <weui-picker-group tappable
                        *ngFor="let item of _itemsValues; let i = index;"
                        [items]="item"
                        [value]="values[i]"
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

    text: string = '';
    _itemsValues: PickerData[][] = [];
    @Input('options') options: PickerOptions;

    private isAsync: boolean = false;
    @Input('items') set items(d: PickerData[] | PickerData[][] | 'async') {
        if (!d) return;
        if (d === 'async') {
            // todo
            // if (!this.options.gruopCount) throw new Error('当使用异常加载数据时，必须指定gruopCount');
            // this._itemsValues = Array(this.options.gruopCount).fill([]);
            // this.isAsync = true;
        } else {
            if (d.length > 0 && Array.isArray(d[0]))
                this._itemsValues = this.parseItem(<PickerData[][]>d);
            else
                this._itemsValues = this.parseItem([d]);
        }
    }
    @Input('values') values: any[] = [];

    @Input('placeholder') placeholder: string;

    showd: boolean = false;
    @Input() show: boolean = false;
    @Output('change') change = new EventEmitter<any>();
    @Output('groupChange') groupChange = new EventEmitter<any>();
    @Output('cancel') cancel = new EventEmitter<any>();

    constructor(private DEF: PickerConfig) { }

    ngOnInit() {
        if (!this.options) this.parseOptions();
    }

    onHide(fh: boolean) {
        if (!fh && !this.options.backdrop) return false;
        this.show = false;
        setTimeout(() => {
            this.showd = false;
        }, 300);
    }

    onShow() {
        this.showd = true;
        this.show = true;
    }

    private parseOptions() {
        this.options = Object.assign(<PickerOptions>{
            type: 'form',
            cancel: '取消',
            confirm: '确定',
            backdrop: true,
            gruopCount: null
        }, this.DEF, this.options);
    }

    private parseItem(arr: any[][]): PickerData[][] {
        return arr.map<PickerData[]>((val: any[]) => {
            if (val && val.length) {
                if (typeof val[0] !== 'object')
                    return val.map<PickerData>((v: string) => {
                        return <PickerData>{ label: v, value: v };
                    });
                else {
                    return <PickerData[]>val;
                }
            }
            return <PickerData[]>[];
        });
    }

    private _choValues: any[] = [];
    onGroupChange(data: any, groupIndex: number) {
        this._choValues[groupIndex] = data;
        this.groupChange.emit({ data, groupIndex });
    }

    onCancel() {
        this.cancel.emit();
        this.onHide(true);
        return false;
    }

    private setText() {
        let text:string[] = [];
        this._choValues.map((v: any) => {
            text.push(v.item.label || v.item.value);
        });
        if (text.length > 0)
            this.text = text.join(' ');
    }

    onConfirm() {
        this.setText();
        const lastItem = this._choValues[this._choValues.length - 1].item || {};
        this.onChange(lastItem.value || lastItem.label);
        this.onTouched();
        this.change.emit(this._choValues);
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
        if (value) {
            this.setText();
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }
}
