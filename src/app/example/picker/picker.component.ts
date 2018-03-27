import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PickerData, PickerOptions, PickerService } from 'ngx-weui/picker';
import { DATA } from './cn';

@Component({
    selector: 'example-picker',
    templateUrl: './picker.component.html',
    styleUrls: ['./picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoPickerComponent implements OnDestroy {
    DT: any = {
        min: new Date(2015, 1, 5),
        max: new Date()
    };
    res: any = {
        city: '310105',
        date: new Date()
    };

    constructor(private srv: PickerService) {}

    cityChange(item: any) {
        console.log(item);
    }

    onSave() {
        alert('请求数据：' + JSON.stringify(this.res));
        return false;
    }

    cityStatus: boolean = false;
    cityOptions: any = {

    };
    cityData: any = DATA;

    onCityChange(data: any) {
        console.log('onCityChange', data);
    }
    onCityGroupChange(data: any) {
        console.log('onCityGroupChange', data);
    }
    onCityCancel() {
        console.log('onCityCancel');
    }

    items: string[] = Array(6).fill('').map((v: string, idx: number) => `Item${idx}`);
    itemGroup: any = [
        [
            {
                label: 'Item1',
                value: 1
            },
            {
                label: 'Item2 (Disabled)',
                disabled: true,
                value: 2
            },
            {
                label: 'Item3',
                value: 3
            },
            {
                label: 'Item4',
                value: 4
            },
            {
                label: 'Item5',
                value: 5
            }
        ]
    ];
    onItemChange(data: any) {
        console.log('onItemChange', data);
    }
    onItemGroupChange(data: any) {
        console.log('onItemGroupChange', data);
    }
    onItemCancel() {
        console.log('onItemCancel');
    }

    mData: any;

    onMItemChange(data: any) {
        console.log('onMItemChange', data);
    }
    onMItemGroupChange(data: any) {
        console.log('onMItemGroupChange', data);
    }
    onMItemCancel() {
        console.log('onMItemCancel');
    }

    srvRes: any = '';
    onShowBySrv(type: string) {
        switch (type) {
            case 'city':
                this.srv.showCity(this.cityData).subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
            case 'date-ym':
                this.srv.showDateTime(type).subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
            case 'date':
                this.srv.showDateTime(type).subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
            case 'datetime':
                this.srv.showDateTime(type).subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
            case 'time':
                this.srv.showDateTime(type).subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
            case 'data':
                this.srv.show(this.items, 'Item3').subscribe((res: any) => {
                    this.srvRes = res.value;
                });
                break;
        }
    }

    ngOnDestroy() {
        this.srv.destroyAll();
    }
}
