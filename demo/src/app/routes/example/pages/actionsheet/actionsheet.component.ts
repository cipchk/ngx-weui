import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActionSheetService, ActionSheetData, ActionSheetComponent } from "ngx-weui";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'example-actionsheet',
    templateUrl: './actionsheet.component.html',
    styleUrls: [ './actionsheet.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoActionSheetComponent {

    @ViewChild('ios') iosAS: ActionSheetComponent;
    @ViewChild('android') androidAS: ActionSheetComponent;

    data: ActionSheetData = <ActionSheetData>{
        skin: 'ios',
        title: '这是一段标题',
        // cancel: null, // 默认：取消，如果为null&undefined表示不显示
        menu: [
            { text: '菜单一', value: 'test', other: 1 },
            { text: '菜单三', value: 'test' }
        ]
    };

    constructor(private asSrv: ActionSheetService) {

    }

    onShow(type: 'ios' | 'android') {
        this.data.skin = type;
        if (type === 'ios') {
            this.iosAS.show().subscribe((res: any) => {
                console.log(res);
            });
        } else {
            this.androidAS.show().subscribe((res: any) => {
                console.log(res);
            });
        }
    }

    onShowBySrv(type: 'ios' | 'android') {
        this.data.skin = type;
        this.asSrv.show(this.data).subscribe((res: any) => {
            console.log(res);
        });
    }

}
