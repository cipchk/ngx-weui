import { Component } from '@angular/core';

@Component({
  selector: 'app-issue',
  template: `
    <div class="weui-article">
      <h2>ngx-weui</h2>
      <weui-date-picker
        placeholder="选择时间"
        [(ngModel)]="time"
        type="datetime"
        [format]="format"
        name="date2"
      ></weui-date-picker>
      <p>result: {{ time }}</p>
      <button (click)="clear()">clear</button>
    </div>
  `,
})
export class IssueComponent {
  time: any;
  format: any = { hu: '', mu: '' };

  clear() {
    this.time = null;
  }
}
