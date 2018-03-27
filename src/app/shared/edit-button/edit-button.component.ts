import { Component, Input } from '@angular/core';

@Component({
    selector: 'edit-button',
    template: `
    <a href="{{_full}}" title="在Github上编辑此页" target="_blank" class="edit-button">
        <i class="fa fa-edit"></i>
    </a>
    `
})
export class EditButtonComponent {

    _full: string;

    @Input()
    set item(data: any) {
        this._full = `https://github.com/cipchk/ngx-weui/edit/master${data.path}`;
    }
}
