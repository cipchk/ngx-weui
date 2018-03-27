import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
    selector: 'example-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoProgressComponent implements OnDestroy {

    uploading: boolean = false;
    res: any = {
        g1: { value: 0, doing: false },
        g2: { value: 10, doing: false },
        g3: { value: 50, doing: false }
    };
    subscription: Subscription = null;

    onUpload() {
        this.onCancelAll();
        this.uploading = true;
        this.res = {
            g1: { value: 0, doing: true },
            g2: { value: 10, doing: true },
            g3: { value: 50, doing: true }
        };

        this.subscription = Observable.timer(0, 40).subscribe((res: any) => {
            let endCount = 0;
            Object.keys(this.res).forEach((key: string) => {
                const item = this.res[key];
                if (!item.doing) {
                    ++endCount;
                    return ;
                }
                ++item.value;
                if (item.value >= 100) item.doing = false;
            });
            if (endCount === 3) this.onCancelAll();
        });
    }

    onCancelAll() {
        this.uploading = false;
        if (this.subscription) this.subscription.unsubscribe();
    }

    onCancel(type: string) {
        this.res[type].doing = false;
    }

    ngOnDestroy(): void {
        this.onCancelAll();
    }

}
