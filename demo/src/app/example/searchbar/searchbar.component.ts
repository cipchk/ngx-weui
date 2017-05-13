import { Component, ViewEncapsulation } from '@angular/core';
import { TaobaoService } from "./tb.service";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'example-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ TaobaoService ]
})
export class DemoSearchBarComponent {

    items: Observable<string[]>;
    value: string;
    constructor (private tbService: TaobaoService) { }

    onSearch(term: string) {
        this.value = term;
        if (term) this.items = this.tbService.search(term);
    }

    onCancel() {
        console.log('onCancel')
    }

    onClear() {
        console.log('onCancel')
    }

    onSubmit(value: string) {
        console.log('onSubmit', value);
    }
} 
