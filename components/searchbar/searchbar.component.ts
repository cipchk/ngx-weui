import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchBarConfig } from './searchbar.config';

@Component({
  selector: 'weui-searchbar',
  templateUrl: './searchbar.component.html',
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
  @Output() readonly search = new EventEmitter<string>();
  /** 取消回调 */
  @Output() readonly cancel = new EventEmitter();
  /** 清空回调 */
  @Output() readonly clear = new EventEmitter();
  /** 提交回调（指的是键盘回车后） */
  @Output() readonly submit = new EventEmitter<string>();

  _focus: boolean = false;
  @ViewChild('term') _term: ElementRef;

  private _sub: Subscription;
  private _subject = new Subject<string>();

  constructor(DEF: SearchBarConfig) {
    Object.assign(this, DEF);
  }

  ngOnInit() {
    this._sub = this._subject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
      )
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
