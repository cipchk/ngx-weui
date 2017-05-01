import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'weui-progress,[weui-progress]',
    template: `
        <div class="weui-progress">
            <div class="weui-progress__bar">
                <div class="weui-progress__inner-bar" [style.width]="value + '%'"></div>
            </div>
            <a href="#" class="weui-progress__opr" *ngIf="allowCancel" (click)="onCancel()">
                <i class="weui-icon-cancel"></i>
            </a>
        </div>
    `
})
export class ProgressComponent {

    @Input('weui-value') value: number = 0;

    @Input('weui-allow-cancel') allowCancel: boolean = true;

    @Output('weui-cancel') cancel = new EventEmitter();

    onCancel() {
        this.cancel.emit();
        return false;
    }
}
