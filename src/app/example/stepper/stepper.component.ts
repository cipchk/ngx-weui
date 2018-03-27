import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoStepperComponent {
    val1: number = 1;
    val2: number = 1;
    val3: number = 1;
}
