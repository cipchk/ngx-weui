import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'weui-city-picker',
    template: `
    <weui-picker [placeholder]="placeholder"
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
export class CityPickerComponent implements ControlValueAccessor {

    value: string;
    @Input() data: any;
    @Input('placeholder') placeholder: string;
    @Output('change') change = new EventEmitter<any>();
    @Output('groupChange') groupChange = new EventEmitter<any>();
    @Output('cancel') cancel = new EventEmitter<any>();

    onCityChange(data: any) {
        console.log(data);
        this.change.emit(0);
    }

    onCityGroupChange(data: any) {
        console.log(data);
        this.groupChange.emit(0);
    }

    onCityCancelChange() {
        this.cancel.emit();
    }
    
    writeValue(value: any): void {
        if (value) {
        }
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }

}
