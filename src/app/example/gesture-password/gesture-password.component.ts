import { Component, ViewEncapsulation } from '@angular/core';

import { ERR, Options } from 'ngx-gesture-password';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'example-gesture-password',
  templateUrl: './gesture-password.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GesturePasswordComponent {
  pwd: string = '1236';
  type: string = 'check';
  options: Options | null;
  switchState: boolean = true;

  constructor(private _ns: ToastrService) {}

  onChangeOptions() {
    if (this.options) {
      this.options = null;
    } else {
      this.options = {
        bgColor: 'var(--weui-BG-1)',
        focusColor: '#5aa5fe',
        fgColor: '#878aa1',
        num: 4,
        passwords: Array(16)
          .fill(0)
          .map((_i, index) => String.fromCharCode(index + 65)),
      };
    }
    console.log(this.options);
  }

  onError(data: any) {
    console.log('error', data);
  }

  onChecked(data: any) {
    console.log('onChecked', data);
    switch (data.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this._ns.info('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this._ns.error('PASSWORD MISMATCH');
        break;
      default:
        this._ns.success('SUCCESS');
        break;
    }
  }

  onBeforeRepeat(data: any) {
    console.log('onBeforeRepeat', data);
    switch (data.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this._ns.info('至少4个节点以上');
        break;
      default:
        this._ns.info('请再次绘制相同图案');
        break;
    }
  }

  onAfterRepeat(data: any) {
    console.log('onAfterRepeat', data);
    switch (data.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this._ns.info('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this._ns.error('两次密码不匹配');
        break;
      default:
        this._ns.success('新密码已经生效');
        break;
    }
  }
}
