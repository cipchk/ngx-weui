import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-slider',
    templateUrl: './slider.component.html',
    styleUrls: [ './slider.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class SliderComponent {
    res1: number = 0;
    res2: number = 10;

    switchState: boolean = true;

    onChange(value: any) {
        console.log('new', value)
    }
}
