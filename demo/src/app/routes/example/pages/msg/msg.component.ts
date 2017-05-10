import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'example-msg',
    template: `
    <Page [ngClass]="'msg'"
      [title]="'Msg'"
      [subTitle]="'提示页'">

      <button weui-button weui-type="default" routerLink="success">成功提示页</button>
      <button weui-button weui-type="default" routerLink="fail">失败提示页</button>

    </Page>
    `,
    encapsulation: ViewEncapsulation.None
})
export class DemoMsgComponent {
    
}
