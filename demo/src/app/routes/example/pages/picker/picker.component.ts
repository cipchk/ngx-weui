import { Observable, Subscriber } from 'rxjs/Rx';
import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PickerData, PickerOptions } from 'ngx-weui/picker'
import { CN } from './cn'

@Component({
    selector: 'example-picker',
    templateUrl: './picker.component.html',
    styleUrls: ['./picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoPickerComponent {
    res: any = {
        city: 'Item1',
        mitem: 10
    };

    ngOnInit() {
        const charCode = 'A'.charCodeAt(0);
        const options1: any[] = [];
        for (let i = 0; i < 26; i++) {
            const c = String.fromCharCode(charCode + i);
            options1[i] = { label: '字母' + c, value: c };
        }

        const options2: any[] = [];
        for (let i = 0; i < 100; i++) {
            options2[i] = { label: '数字' + (i + 1), value: i + 1 };
        }
        this.mData = [options1, options2];
    }

    onSave() {
        alert('请求数据：' + JSON.stringify(this.res));
        return false;
    }

    cityStatus: boolean = false;
    cityOptions: any = {
        
    };
    cityData: any = CN;
    
    onCityChange(data: any) {
        console.log('onCityChange', data);
    }
    onCityGroupChange(data: any) {
        console.log('onCityGroupChange', data);
    }
    onCityCancel() {
        console.log('onCityCancel');
    }

    itemData: any = [
        {
            label: 'Item1'
        },
        {
            label: 'Item2 (Disabled)',
            disabled: true
        },
        {
            label: 'Item3'
        },
        {
            label: 'Item4'
        },
        {
            label: 'Item5'
        }
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
} 
