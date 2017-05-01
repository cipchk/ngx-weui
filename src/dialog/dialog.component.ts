import { Component, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { isAndroid } from '../utils/browser';
import { DialogData } from './data';
import { DialogConfig } from './dialog.config';

@Component({
    selector: 'weui-dialog, [weui-dialog]',
    template: `
        <div class="weui-mask" (click)="hide(true)"></div>
        <div class="weui-dialog" [ngClass]="{'weui-skin_android': data.skin === 'android'}">
            <div class="weui-dialog__hd" *ngIf="data.title"><strong class="weui-dialog__title">{{data.title}}</strong></div>
            <div class="weui-dialog__bd" *ngIf="data.content">{{data.content}}</div>
            <div class="weui-dialog__ft">
                <a href="#" *ngFor="let item of data.btns" 
                    class="weui-dialog__btn weui-dialog__btn_{{item.type}}"
                    (click)="onSelect(item)">{{item.text}}</a>
            </div>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1, display: 'block' })),
        state('hide', style({ opacity: 0, display: 'none' })),
        transition('hide <=> show', [animate(200)])
    ])]
})
export class DialogComponent implements OnDestroy {

    @Input('weui-data') data: DialogData;
    @Output('weui-close') close = new EventEmitter();

    private observer: Observer<any>;

    private shown: boolean = false;

    @HostBinding('@visibility') get visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    constructor(private DEF: DialogConfig) { }

    show(): Observable<any> {
        this.data = Object.assign({
            backdrop: false
        }, this.DEF, this.data);
        if (this.data.skin === 'auto') {
            this.data.skin = isAndroid() ? 'android' : 'ios';
        }
        // 重组btns
        if (!this.data.btns) {
            this.data.btns = [];
            if (this.data.cancel) {
                this.data.btns.push({ text: this.data.cancel, type: this.data.cancelType, value: false });
            }
            if (this.data.confirm) {
                this.data.btns.push({ text: this.data.confirm, type: this.data.confirmType, value: true });
            }
        }

        this.shown = true;
        return Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        });
    }

    hide(is_backdrop?: boolean) {
        if (is_backdrop === true && this.data.backdrop === false) return false;

        this.shown = false;
        this.close.emit();
    }

    onSelect(menu: any) {
        this.observer.next(menu);
        this.observer.complete();
        this.hide();
        return false;
    }

    ngOnDestroy(): void {
        if (this.observer && this.observer instanceof Subscription) {
            (<Subscription>this.observer).unsubscribe();
        }
    }

}
