import { Component, ViewEncapsulation, Input } from '@angular/core';
@Component({
    selector: 'example-msg',
    template: `
    <Page [ngClass]="'msg'"
      [title]="'Msg'"
      [subTitle]="'提示页'">

      <button weui-button weui-type="default" [routerLink]="['/' + url, 'msg_success']">成功提示页</button>
      <button weui-button weui-type="default" [routerLink]="['/' + url, 'msg_fail']">失败提示页</button>

    </Page>
    `,
    encapsulation: ViewEncapsulation.None
})
export class DemoMsgComponent {
    @Input() url: string = 'example';
}
