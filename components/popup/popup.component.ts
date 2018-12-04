import {
  Component,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable, Observer, Subscription } from 'rxjs';
import { PopupConfig } from './popup.config';

@Component({
  selector: 'weui-popup',
  template: `
    <div class="weui-mask" [@visibility]="_visibility" (click)="hide(true)"></div>
    <div class="weui-popup" [ngClass]="{'weui-popup_toggle': _shownAnt}">
      <div class="weui-popup__hd" *ngIf="!config.is_full">
        <a href="#" class="weui-popup__action" (click)="_onCancel()">{{config.cancel}}</a>
        <a href="#" class="weui-popup__action" (click)="_onConfirm()">{{config.confirm}}</a>
      </div>
      <div [ngClass]="{'weui-popup_full': config.is_full }">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('visibility', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide <=> show', [animate(200)]),
    ]),
  ],
  host: {
    '[hidden]': '!shown',
  },
})
export class PopupComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * 配置项
   */
  @Input() config: PopupConfig;
  /** 取消回调 */
  @Output() cancel = new EventEmitter();
  /** 确认回调 */
  @Output() confirm = new EventEmitter();

  private shown: boolean = false;
  _shownAnt = false;

  private observer: Observer<boolean>;

  get _visibility(): string {
    return this._shownAnt ? 'show' : 'hide';
  }

  constructor(private DEF: PopupConfig) {}

  private parseConfig() {
    this.config = Object.assign({}, this.DEF, this.config);
  }

  ngOnInit() {
    this.parseConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) this.parseConfig();
  }

  /**
   * 显示，并支持订阅结果，如果点击取消值为false，反之 true
   */
  show(): Observable<boolean> {
    this.shown = true;
    setTimeout(() => {
      this._shownAnt = true;
    }, 10);
    return Observable.create((observer: Observer<boolean>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param [is_backdrop] 是否从背景上点击(可选)
   */
  hide(is_backdrop?: boolean) {
    if (is_backdrop === true && this.config.backdrop === false) return false;

    this._shownAnt = false;
    setTimeout(() => {
      this.shown = false;
    }, 300);
  }

  /** 关闭，等同 `hide()` 效果 */
  close() {
    this.hide(false);
  }

  _onCancel() {
    this.cancel.emit();
    this.hide(false);
    if (this.observer) {
      this.observer.next(false);
      this.observer.complete();
    }
    return false;
  }

  _onConfirm() {
    this.confirm.emit();
    this.hide(false);
    if (this.observer) {
      this.observer.next(true);
      this.observer.complete();
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (<Subscription>this.observer).unsubscribe();
    }
  }
}
