import { Component, HostListener, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { SearchBarConfig } from "./searchbar.config";
import { Subject, Subscription } from "rxjs/Rx";

@Component({
    selector: '[weui-searchbar],weui-searchbar',
    template: `
        <div class="weui-search-bar" [ngClass]="{'weui-search-bar_focusing': focus}">
            <form class="weui-search-bar__form" (ngSubmit)="onSubmit($event)">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input #term type="search" autocomplete="off" name="q" class="weui-search-bar__input"
                        [placeholder]="placeholder" [(ngModel)]="q" (ngModelChange)="onSearch()"
                        (focus)="focus=true" (blur)="onBlur()" />
                    <a href="javascript:" class="weui-icon-clear" (click)="onClear()"></a>
                </div>
                <label class="weui-search-bar__label" (click)="doFocus()">
                    <i class="weui-icon-search"></i>
                    <span>{{placeholder}}</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" (click)="onCancel()">{{cancelText}}</a>
        </div>
    `
})
export class SearchBarComponent implements OnDestroy {
    q: string = '';
    @Input() set value(_value: string) {
        this.q = _value;
    }
    @Input() placeholder: string;
    @Input() cancelText: string;
    @Input() debounceTime: number;
    @Output() searchTerm = new EventEmitter<string>();
    @Output() cancel = new EventEmitter();
    @Output() clear = new EventEmitter();
    @Output() submit = new EventEmitter<string>();

    focus: boolean = false;
    @ViewChild('term') term: ElementRef;

    private _sub: Subscription;
    private _subject = new Subject<string>();

    constructor(DEF: SearchBarConfig) {
        Object.assign(this, DEF);
    }

    ngOnInit() {
        this._sub = this._subject
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe((q: string) => {
                this.searchTerm.emit(q);
            });
    }

    doFocus() {
        this.term.nativeElement.focus();
    }

    onBlur() {
        if (this.q === '') this.focus = false;
    }

    onSearch() {
        this._subject.next(this.q);
    }

    onCancel() {
        this.q = '';
        this.onBlur();
        this._subject.next('');
        this.cancel.emit();
    }

    onClear() {
        this.q = '';
        this.doFocus();
        this._subject.next('');
        this.clear.emit();
    }

    onSubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();

        this._subject.next(this.q);
        this.submit.emit(this.q);
        return false;
    }

    ngOnDestroy(): void {
        if (this._sub) this._sub.unsubscribe();
    }

}
