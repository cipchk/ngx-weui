import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';

import { RatingComponent, RatingConfig } from 'ngx-weui/rating';

@Component({
    selector: 'example-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoRatingComponent {
    config: RatingConfig = {
        max: 10
    };
    customIconsCog: RatingConfig = {
        states: [
            { off: 'weui-icon-circle', on: 'weui-icon-download' },
            { off: 'weui-icon-circle', on: 'weui-icon-info' },
            { off: 'weui-icon-circle', on: 'weui-icon-warn' },
            { off: 'weui-icon-circle', on: 'weui-icon-waiting' },
            { off: 'weui-icon-circle', on: 'weui-icon-search' }
        ]
    };
    customIconsAndClassCog: RatingConfig = {
        cls: 'rating',
        stateOff: 'off',
        stateOn: 'on'
    };

    rate: number = 3;

    readonly: boolean = false;
}
