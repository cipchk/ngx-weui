import { Component, Input, Inject, HostBinding, ViewEncapsulation } from '@angular/core';
import { AccordionComponent } from './accordion.component';

@Component({
    selector: 'weui-accordion-panel',
    template: `
    <div role="tab" (click)="_toggle($event)"><ng-content select="[heading]"></ng-content></div>
    <div role="tabpanel" class="weui-accordion-content"
        [class.weui-accordion-content-active]="active"><ng-content></ng-content></div>
    `,
    host: {
        'style': 'display: block',
        '[class.weui-accordion-panel-disabled]': 'disabled'
    },
    styles: [
        `
        .weui-accordion-content { max-height: 0; }
        .weui-accordion-content-active { max-height: inherit; }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccordionPanelComponent {
    /**
     * 是否禁止
     * 
     * @type {boolean}
     */
    @Input() disabled: boolean = false;

    private _active: boolean = false;

    /**
     * 是否展开
     * 
     * @type {boolean}
     */
    @Input()
    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        if (value) this.accordion._closeOthers(this);
        this._active = value;
    }

    constructor( @Inject(AccordionComponent) protected accordion: AccordionComponent) { }

    ngOnInit() {
        this.accordion._add(this);
    }

    ngOnDestroy() {
        this.accordion._remove(this);
    }

    _toggle(event: Event) {
        if (!this.disabled) {
            this.active = !this.active;
            this.accordion.select.emit(this.accordion._index(this));
        }
    }
}
