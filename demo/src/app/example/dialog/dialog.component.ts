import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';

import { SkinType, InputType } from 'ngx-weui';
import { DialogService, DialogConfig, DialogComponent } from 'ngx-weui/dialog';
import { ToastService } from 'ngx-weui/toast';

@Component({
    selector: 'example-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoDialogComponent implements OnDestroy {

    @ViewChild('ios') iosAS: DialogComponent;
    @ViewChild('android') androidAS: DialogComponent;
    @ViewChild('auto') autoAS: DialogComponent;

    private DEFCONFIG: DialogConfig = <DialogConfig>{
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        cancel: '辅助操作',
        confirm: '主操作',
        inputPlaceholder: '必填项',
        inputError: '请填写或选择项',
        inputRequired: true,
        inputAttributes: {
            maxlength: 140,
            cn: 2
        },
        inputOptions: [
            { text: '请选择' },
            { text: '杜蕾斯', value: 'durex', other: 1 },
            { text: '杰士邦', value: 'jissbon' },
            { text: '多乐士', value: 'donless' },
            { text: '处男', value: 'first' }
        ]
    };
    config: DialogConfig = {};

    constructor(private srv: DialogService, private toastService: ToastService) {
    }

    onShow(type: SkinType, style: 1 | 2 | 3) {
        this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            skin: type,
            cancel: null,
            confirm: null,
            btns: null,
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        });
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
        setTimeout(() => {
            (<DialogComponent>this[`${type}AS`]).show().subscribe((res: any) => {
                console.log('type', res);
            });
        }, 10);
        return false;
    }

    onShowBySrv(type: SkinType, backdrop: boolean = true) {
        this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            skin: type,
            backdrop: backdrop,
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
        });
        this.srv.show(this.config).subscribe((res: any) => {
            console.log(res);
        });
        return false;
    }

    onShowOfHtml() {
        this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            content: `
                <p>这是一段HTML<strong>加粗</strong></p>
                <p>这是一段HTML<strong>加粗</strong></p>
            `
        });
        this.srv.show(this.config).subscribe((res: any) => {
            console.log(res);
        });
        return false;
    }

    promptValue: any;
    promptTypes: string[] = ['text', 'email', 'url', 'range', 'textarea', 'select', 'radio', 'checkbox'];
    onShowPrompt(inputType: InputType, useSrv: boolean = false) {
        const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            skin: 'auto',
            type: 'prompt',
            confirm: '确认',
            cancel: '取消',
            input: inputType,
            inputValue: undefined,
            inputRegex: null
        });
        if (inputType === 'range') {
            cog.inputValue = 10;
        }
        if (inputType === 'select') {
            cog.inputValue = cog.inputOptions[0];
        }
        if (inputType === 'checkbox') {
            cog.inputValue = cog.inputOptions.slice(1, 3);
        }
        if (useSrv) {
            setTimeout(() => {
                this.srv.show(cog).subscribe((res: any) => {
                    if (res.result)
                        this.toastService.show(`结果：${JSON.stringify(res.result)}`);
                    console.log('prompt from service', res);
                });
            });
        } else {
            this.config = cog;
            this.autoAS.show().subscribe((res: any) => {
                if (res.result) {
                    this.toastService.show(`结果：${JSON.stringify(res.result)}`);
                }
                console.log('prompt from component', res);
            });
        }
        return false;
    }

    ngOnDestroy() {
        this.srv.destroyAll();
    }

}
