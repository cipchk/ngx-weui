import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoGalleryComponent {

    show: boolean = true;
    onDelete(item: any) {
        console.log(item);
    }

} 
