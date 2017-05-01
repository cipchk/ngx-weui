import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SkinType } from 'ngx-weui';
import { DialogService, DialogData, DialogComponent } from "ngx-weui/dialog";

@Component({
    selector: 'example-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoDialogComponent {

    @ViewChild('ios') iosAS: DialogComponent;
    @ViewChild('android') androidAS: DialogComponent;
    @ViewChild('auto') autoAS: DialogComponent;

    data: DialogData = <DialogData>{
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        cancel: '辅助操作',
        confirm: '主操作'
    };

    constructor(private asSrv: DialogService) { }

    onShow(type: SkinType, style: 1 | 2 | 3) {
        this.data.skin = type;
        this.data.cancel = null;
        this.data.confirm = null;
        this.data.btns = null;
        switch (style) {
            case 1:
                this.data.cancel = '辅助操作';
                this.data.confirm = '主操作';
                break;
            case 2:
                this.data.confirm = '主操作';
                break;
            case 3:
                this.data.btns = [
                    { text: '否', type: 'default', value: 1 },
                    { text: '不确定', type: 'default', value: 2 },
                    { text: '是', type: 'primary', value: 3 }
                ];
                break;
        }
        this.data = Object.assign({}, this.data);
        setTimeout(() => {
            (<DialogComponent>this[`${type}AS`]).show().subscribe((res: any) => {
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
