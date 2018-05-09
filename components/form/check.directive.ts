import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[weui-checklist]',
  host: {
    '(change)': '_change($event)',
    '[checked]': 'checked',
  },
})
export class ChecklistDirective {
  @Input('weui-checklist') targetArray: any[];

  checked: boolean = false;
  private _value: any;

  @Input('weui-value')
  set value(val: any) {
    this._value = val;
    this.checked = this.targetArray.indexOf(val) !== -1;
  }

  _change($event: any) {
    if ($event.target.checked) {
      this.targetArray.push(this._value);
    } else {
      this.targetArray.splice(this.targetArray.indexOf(this._value), 1);
    }
  }
}
