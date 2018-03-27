import { Component, ViewEncapsulation } from '@angular/core';
import { WXService } from "../../wx.service";

@Component({
    selector: 'example-jweixin',
    templateUrl: './jweixin.component.html',
    styleUrls: ['./jweixin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [WXService]
})
export class JWeiXinComponent {
    constructor(private wxService: WXService) { }

    status: string;
    ngOnInit() {
        this.wxService.config({
            title: '新标题'
        }).then(() => {
            // 其它操作，可以确保注册成功以后才有效
            this.status = '注册成功';
        }).catch((err: string) => {
            this.status = `注册失败，原因：${err}`
        });
    }
}
