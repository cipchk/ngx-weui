import { Component, Input, Output, forwardRef, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerOptions } from './options';
import { PickerComponent } from "./picker.component";

@Component({
    selector: 'weui-city-picker',
    template: `
    <weui-picker [placeholder]="placeholder"
        [groups]="groups" [defaultSelect]="selected" [disabled]="disabled" [options]="options"
        (show)="onShow()" 
        (hide)="onHide()" 
        (change)="onCityChange($event)" 
        (groupChange)="onCityGroupChange($event)" 
        (cancel)="onCityCancelChange()"></weui-picker>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CityPickerComponent),
        multi: true
    }]
})
export class CityPickerComponent implements ControlValueAccessor, OnDestroy {

    @ViewChild(PickerComponent) pickerInstance: PickerComponent;

    value: string;
    groups: any[] = [];
    selected: number[] = [];
    private _tmpData: any;

    @Input() dataMap: { label: string, value: string, items: string } = { label: 'name', value: 'code', items: 'sub' };
    @Input() set data(d: any) {
        this._tmpData = d;
        this.parseData(this._tmpData, this.dataMap.items, this.selected);
    }
    @Input() options: PickerOptions;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Output() change = new EventEmitter<any>();
    @Output() groupChange = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    @Output() show = new EventEmitter<any>();
    @Output() hide = new EventEmitter<any>();

    ngOnDestroy(): void {
        this._tmpData = null;
        this.groups = null;
    }

    private parseData(data: any, subKey: any, selected: any[] = [], group: any[] = [], newselected: any[] = []): any {
        let _selected = 0;

        if (Array.isArray(selected) && selected.length > 0) {
            let _selectedClone = selected.slice(0);
            _selected = _selectedClone.shift();
            selected = _selectedClone;
        }

        if (typeof data[_selected] === 'undefined') {
            _selected = 0;
        }

        newselected.push(_selected);

        let item = data[_selected];

        var _group = JSON.parse(JSON.stringify(data));
        _group.forEach((g: any) => {
            delete g[subKey];
            g.label = g[this.dataMap.label];
            g.value = g[this.dataMap.value];
        });
        group.push(_group);

        if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
            return this.parseData(item[subKey], subKey, selected, group, newselected);
        } else {
            this.groups = group;
            this.selected = newselected;
            return { groups: group, newselected };
        }
    }

    /**
     * 将值转换成位置
     */
    valueToSelect(data: any, subKey: any, dept: number = 1, newSelected: any[] = []): any {
        const code = (this.value.substr(0, dept * 2) + '0000').substr(0, 6);
        let _selected = data.findIndex((w:any) => w[this.dataMap.value] === code);
        if (_selected <= -1) {
            _selected = 0;
        }
        newSelected.push(_selected);
        
        let item = data[_selected];
        if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
            return this.valueToSelect(item[subKey], subKey, ++dept, newSelected);
        } else {
            this.selected = newSelected;
            setTimeout(() => {
                this.pickerInstance.setText(); 
            }, 100);
            return newSelected;
        }
    }

    onCityChange(data: any) {
        this.onChange(data.value);
        this.onTouched();

        this.change.emit(data);
    }

    onCityGroupChange(res: any) {
        this.selected[res.groupIndex] = res.index;
        if (res.groupIndex !== 2)
            this.parseData(this._tmpData, this.dataMap.items, this.selected);

        this.groupChange.emit(res);
    }

    onCityCancelChange() {
        this.cancel.emit();
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

    writeValue(value: any): void {
        if (value) {
            this.value = value;
            if (this.value && this.value.length === 6) {
                this.valueToSelect(this._tmpData, this.dataMap.items, 1);
                this.parseData(this._tmpData, this.dataMap.items, this.selected);
            }
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }

}
