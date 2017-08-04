import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[weui-checklist]',
    host: {
        '(change)': '_change($event)',
        '[checked]': 'checked'
    }
})
export class ChecklistDirective {
    @Input('weui-checklist') targetArray: any[];
    @Input('weui-value') value: any;

    checked: boolean = false;
    ngAfterViewInit() {
        this.checked = this.targetArray.indexOf(this.value) !== -1;
    }

    _change($event: any) {
        if ($event.target.checked) {
            this.targetArray.push(this.value);
        }
        else {
            this.targetArray.splice(this.targetArray.indexOf(this.value), 1);
        }
    }
}
