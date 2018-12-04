import {
  Component,
  HostListener,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SearchBarConfig } from './searchbar.config';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
selector: 'weui-searchbar',
template: `
  <div class="weui-search-bar" [ngClass]="{'weui-search-bar_focusing': _focus}">
    <form class="weui-search-bar__form" (ngSubmit)="_onSubmit($event)">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input #term type="search" autocomplete="off" name="q" class="weui-search-bar__input"
          [placeholder]="placeholder" [(ngModel)]="_q" (ngModelChange)="_onSearch()"
          (focus)="_focus=true" (blur)="_onBlur()" />
        <a href="javascript:" class="weui-icon-clear" (click)="_onClear()"></a>
      </div>
      <label class="weui-search-bar__label" (click)="_doFocus()">
        <i class="weui-icon-search"></i>
        <span>{{placeholder}}</span>
      </label>
    </form>
    <a href="javascript:" class="weui-search-bar__cancel-btn" (click)="_onCancel()">{{cancelText}}</a>
  </div>
  `,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  _q: string = '';
  @Input()
  set value(_value: string) {
    this._q = _value;
  }
  /**
   * 占位符，默认：`搜索`
   */
  @Input() placeholder: string;

  /**
   * 取消按键文字，默认：`取消`
   */
  @Input() cancelText: string;
  /**
   * 去抖时长（单位：ms），默认：`300`
   */
  @Input() debounceTime: number;
  /** 搜索回调 */
  @Output() search = new EventEmitter<string>();
  /** 取消回调 */
  @Output() cancel = new EventEmitter();
  /** 清空回调 */
  @Output() clear = new EventEmitter();
  /** 提交回调（指的是键盘回车后） */
  @Output() submit = new EventEmitter<string>();

  _focus: boolean = false;
  @ViewChild('term') _term: ElementRef;

  private _sub: Subscription;
  private _subject = new Subject<string>();

  constructor(DEF: SearchBarConfig) {
    Object.assign(this, DEF);
  }

  ngOnInit() {
    this._sub = this._subject
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((q: string) => {
        this.search.emit(q);
      });
  }

  _doFocus() {
    this._term.nativeElement.focus();
  }

  _onBlur() {
    if (this._q === '') this._focus = false;
  }

  _onSearch() {
    this._subject.next(this._q);
  }

  _onCancel() {
    this._q = '';
    this._onBlur();
    this._subject.next('');
    this.cancel.emit();
  }

  _onClear() {
    this._q = '';
    this._doFocus();
    this._subject.next('');
    this.clear.emit();
  }

  _onSubmit(e: any) {
    e.preventDefault();
    e.stopPropagation();

    this._subject.next(this._q);
    this.submit.emit(this._q);
    return false;
  }

  ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }
}
