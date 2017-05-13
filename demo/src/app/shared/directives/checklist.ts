import { Directive, ElementRef } from '@angular/core';

@Directive(
    {
        selector: '[checklist]',
        inputs: [
            'targetArray: checklist'
        ],
        host: {
            '(change)': 'onChange($event)',
            '[checked]': 'checked'
        }
    }
)
export class ChecklistDirective {
    el: ElementRef;
    targetArray: [string];
    constructor(el: ElementRef) {
        this.el = el;
    }

    checked: boolean = false;
    ngAfterViewInit() {
        setTimeout(() => {
            this.checked = this.targetArray.indexOf(this.el.nativeElement.value) !== -1;
        })
    }

    onChange($event: any) {
        if ($event.target.checked) {
            this.targetArray.push($event.target.value);
        }
        else {
            this.targetArray.splice(this.targetArray.indexOf(this.el.nativeElement.value), 1);
        }
        console.log('change')
    }
}
