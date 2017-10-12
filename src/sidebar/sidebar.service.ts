import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from "rxjs/Subject";

/**
 * @docs-private
 */
@Injectable()
export class SidebarService {
    private _openObserver: Subject<void> = new Subject<void>();
    private _closeObserver: Subject<void> = new Subject<void>();

    open(): void {
        this._openObserver.next();
    }

    close(): void {
        this._closeObserver.next();
    }

    onOpen(fn: () => void): Subscription {
        return this._openObserver.subscribe(fn);
    }

    onClose(fn: () => void): Subscription {
        return this._closeObserver.subscribe(fn);
    }
}
