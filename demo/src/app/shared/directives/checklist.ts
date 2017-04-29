import { Directive, ElementRef } from '@angular/core';

@Directive(
    {
        selector: '[checklist]',
        inputs: [
            'targetArray: checklist'
        ],
        host: {
            '(change)': 'onChange($event)',
            '[checked]': 'isChecked()'
        }
    }
)
export class ChecklistDirective {
    el: ElementRef;
    targetArray: [string];
    constructor(el: ElementRef) {
        this.el = el;
    }

    onChange($event: any) {
        if ($event.target.checked) {
            this.targetArray.push($event.target.value);
        }
        else {
            this.targetArray.splice(this.targetArray.indexOf(this.el.nativeElement.value), 1);
        }
    }

    isChecked() {
        return (this.targetArray.indexOf(this.el.nativeElement.value) !== -1);
    }
}
