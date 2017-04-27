import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'Radio,[Radio]',
    template: `
        <input type="radio" [(ngModel)]="value" class="weui-check" />
        <span class="weui-icon-checked"></span>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
    }]
})
export class RadioComponent implements ControlValueAccessor {

    protected value: any;

    @Input() ngValue: any;

    chanage(obj: any) {

    }

    writeValue(obj: any): void {
        if (obj) this.value = obj;
    }

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
    }
}
