import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SkinType } from 'ngx-weui';
import { ActionSheetService, ActionSheetData, ActionSheetComponent } from "ngx-weui/actionsheet";

@Component({
    selector: 'example-actionsheet',
    templateUrl: './actionsheet.component.html',
    styleUrls: [ './actionsheet.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoActionSheetComponent {

    @ViewChild('ios') iosAS: ActionSheetComponent;
    @ViewChild('android') androidAS: ActionSheetComponent;
    @ViewChild('auto') autoAS: ActionSheetComponent;

    data: ActionSheetData = <ActionSheetData>{
        title: '这是一段标题',
        // cancel: null, // 默认：取消，如果为null&undefined表示不显示
        menu: [
            { text: '菜单一', value: 'test', other: 1 },
            { text: '菜单三', value: 'test' }
        ]
    };

    constructor(private asSrv: ActionSheetService) { }

    onShow(type: SkinType) {
        this.data.skin = type;
        this.data = Object.assign({}, this.data);
        setTimeout(() => {
            (<ActionSheetComponent>this[`${type}AS`]).show().subscribe((res: any) => {
                console.log('type', res);
            });
        }, 10);
    }

    onShowBySrv(type: SkinType, backdrop: boolean = true) {
        this.data.skin = type;
        this.data.backdrop = backdrop;
        this.asSrv.show(this.data).subscribe((res: any) => {
            console.log(res);
        });
    }

}
