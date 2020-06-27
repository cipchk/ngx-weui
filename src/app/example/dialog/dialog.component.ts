import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { InputType, SkinType } from 'ngx-weui';
import { DialogComponent, DialogConfig, DialogService } from 'ngx-weui/dialog';
import { ToastService } from 'ngx-weui/toast';

@Component({
  selector: 'example-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoDialogComponent implements OnDestroy {
  @ViewChild('ios', { static: true }) iosAS: DialogComponent;
  @ViewChild('android', { static: true }) androidAS: DialogComponent;
  @ViewChild('auto', { static: true }) autoAS: DialogComponent;

  private DEFCONFIG: DialogConfig = {
    title: '弹窗标题',
    content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    cancel: '辅助操作',
    confirm: '主操作',
    inputPlaceholder: '必填项',
    inputError: '请填写或选择项',
    inputRequired: true,
    inputAttributes: {
      maxlength: 140,
      cn: 2,
    },
    inputOptions: [
      { text: '请选择' },
      { text: '杜蕾斯', value: 'durex', other: 1 },
      { text: '杰士邦', value: 'jissbon' },
      { text: '多乐士', value: 'donless' },
      { text: '处男', value: 'first' },
    ],
  } as DialogConfig;
  config: DialogConfig = {};

  constructor(private srv: DialogService, private toastService: ToastService) { }

  onShow(type: SkinType, style: 1 | 2 | 3) {
    this.config = {
      ...this.DEFCONFIG,
      ...{
        skin: type,
        cancel: undefined,
        confirm: undefined,
        btns: undefined,
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      },
    } as DialogConfig;
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
          { text: '是', type: 'primary', value: 3 },
        ];
        break;
    }
    setTimeout(() => {
      (this[`${type}AS`] as DialogComponent).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }

  onShowBySrv(type: SkinType, backdrop: boolean = true) {
    this.config = {
      ...this.DEFCONFIG,
      ...({
        skin: type,
        backdrop,
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      } as DialogConfig),
    };
    this.srv.show(this.config).subscribe((res: any) => {
      console.log(res);
    });
    return false;
  }

  onShowOfHtml() {
    this.config = {
      ...this.DEFCONFIG,
      ...({
        content: `
                <p>这是一段HTML<strong>加粗</strong></p>
                <p>这是一段HTML<strong>加粗</strong></p>
            `,
      } as DialogConfig),
    };
    this.srv.show(this.config).subscribe((res: any) => {
      console.log(res);
    });
    return false;
  }

  promptValue: any;
  promptTypes: string[] = ['text', 'email', 'url', 'range', 'textarea', 'select', 'radio', 'checkbox'];
  onShowPrompt(inputType: InputType, useSrv: boolean = false) {
    const cog = {
      ...this.DEFCONFIG,
      ...({
        skin: 'auto',
        type: 'prompt',
        confirm: '确认',
        cancel: '取消',
        input: inputType,
        inputValue: undefined,
        inputRegex: undefined,
      } as DialogConfig),
    } as DialogConfig;
    if (inputType === 'range') {
      cog.inputValue = 10;
    }
    if (inputType === 'select') {
      cog.inputValue = cog.inputOptions![0];
    }
    if (inputType === 'checkbox') {
      cog.inputValue = cog.inputOptions!.slice(1, 3);
    }
    if (useSrv) {
      setTimeout(() => {
        this.srv.show(cog).subscribe((res: any) => {
          if (res.result) this.toastService.show(`结果：${JSON.stringify(res.result)}`);
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
