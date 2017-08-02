import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SkinType } from 'ngx-weui';
import { DialogService, DialogConfig, DialogComponent } from "ngx-weui/dialog";

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

    config: DialogConfig = <DialogConfig>{
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        cancel: '辅助操作',
        confirm: '主操作'
    };

    constructor(private srv: DialogService) { }

    onShow(type: SkinType, style: 1 | 2 | 3) {
        this.config.skin = type;
        this.config.cancel = null;
        this.config.confirm = null;
        this.config.btns = null;
        this.config.content = '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内';
        switch (style) {
            case 1:
                this.config.cancel = '辅助操作';
                this.config.confirm = '主操作';
                break;
            case 2:
                this.config.confirm = '主操作';
                break;
            case 3:
                this.config.btns = [
                    { text: '否', type: 'default', value: 1 },
                    { text: '不确定', type: 'default', value: 2 },
                    { text: '是', type: 'primary', value: 3 }
                ];
                break;
        }
        this.config = Object.assign({}, this.config);
        setTimeout(() => {
            (<DialogComponent>this[`${type}AS`]).show().subscribe((res: any) => {
                console.log('type', res);
            });
        }, 10);
    }

    onShowBySrv(type: SkinType, backdrop: boolean = true) {
        this.config.skin = type;
        this.config.backdrop = backdrop;
        this.config.content = '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内';
        this.srv.show(this.config).subscribe((res: any) => {
            console.log(res);
        });
    }

    onShowOfHtml() {
        this.config.content = `
            <p>这是一段HTML<strong>加粗</strong></p>
            <p>这是一段HTML<strong>加粗</strong></p>
        `;
        this.srv.show(this.config).subscribe((res: any) => {
            console.log(res);
        });
    }

    ngOnDestroy() {
        this.srv.destroyAll();
    }

}
