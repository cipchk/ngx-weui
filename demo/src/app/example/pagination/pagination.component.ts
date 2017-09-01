import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoPaginationComponent {

    prev = `<i class="iconfont icon-left"></i> Prev`;
    next = `Next <i class="iconfont icon-right"></i>`;
    cur = 1;
    total = 10;

    change(value: number) {
        this.cur = value;
        console.log('pi=', value);
    }
}
