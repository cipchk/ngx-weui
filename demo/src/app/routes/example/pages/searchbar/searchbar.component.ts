import { Component, ViewEncapsulation } from '@angular/core';
import { WikipediaService } from "./wikipedia.service";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'example-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ WikipediaService ]
})
export class DemoSearchBarComponent {

    items: Observable<string[]>;
    value: string;
    constructor (private wikipediaService: WikipediaService) { }

    onSearch(term: string) {
        this.value = term;
        if (term) this.items = this.wikipediaService.search(term);
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
