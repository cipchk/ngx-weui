import { Directive, Input, Renderer, ElementRef, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS, ValidatorFn, ValidationErrors } from "@angular/forms";
import { findParent, add, remove } from './../utils/dom';

@Directive({
    selector: '[weui-input]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => InputDirective),
        multi: true
    }]
})
export class InputDirective implements OnChanges, Validator {

    private parentEl: any;
    private ftEl: any;
    private pattern: RegExp;
    private _validator: ValidatorFn;
    private _onChange: () => void;

    @Input('weui-input') inputType: string;
    @Input('weui-regex') inputRegex: RegExp | string;
    @Input('weui-required') required: 'info' | 'warn' | 'waiting';
    @Input('weui-cleaner') cleaner: boolean;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.parentEl = findParent(this.el.nativeElement, '.weui-cell');
        // 检查是否有 weui-cell__ft
        this.ftEl = add(this.parentEl);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._createValidator();
        if (this._onChange) this._onChange();
    }

    private _genIcon(type: string = 'warn') {

    }

    private _createValidator(): void {
        let regex: RegExp = null;
        if (this.inputRegex) {
            if (typeof this.inputRegex === 'string') {
                regex = new RegExp(`^${this.inputRegex}$`);
            } else {
                regex = this.inputRegex;
            }
        } else {
            // 默认行为
            if (this.inputType) {
                switch (this.inputType) {
                    case 'qq':
                    case 'number':
                        regex = /^[0-9]+$/;
                        break;
                    case 'digit':
                        regex = /^[.0-9]+$/;
                        break;
                    case 'tel':
                        regex = /^[-.0-9]+$/;
                        break;
                    case 'email':
                        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        this.cleaner = true;
                        break;
                    case 'mobile':
                        regex = /^1[0-9]{10}$/;
                        this.cleaner = true;
                        break;
                    case 'idcard': // 身份证
                        regex = /^[0-9]{15,18}$/;
                        this.cleaner = true;
                        break;
                }
            }
        }

        this._validator = (control: AbstractControl): ValidationErrors | null => {
            let value: string = control.value;
            if (value == null || value.length === 0) {
                if (this.required !== undefined)
                    return { 'icon': this.required || 'warn', 'type': 'required', 'actualValue': value };

                return null;
            }
            if (this.cleaner && value.includes(' ')) {
                value = value.replace(/ /g, '');
                control.setValue(value);
            }
            return regex === null || regex.test(value) ? null : { 'icon': 'warn', 'type': 'regex', 'actualValue': value };
        };
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
    validate(c: AbstractControl): ValidationErrors | null {
        let ret = this._validator(c);
        if (ret === null) {
            this.parentEl.classList.remove('weui-cell_warn');
            remove(this.ftEl, 'i');
        } else {
            remove(this.ftEl, 'i');
            this.parentEl.classList.add('weui-cell_warn');
            let icon = `weui-icon-${ret.icon}`;
            add(this.ftEl, '.' + icon, 'i', icon);
        }
        return ret;
    }
}
