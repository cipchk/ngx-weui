import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PickerService } from 'ngx-weui/picker';
import { DATA } from './cn';

@Component({
  selector: 'example-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoPickerComponent implements OnDestroy {
  DT: any = {
    min: new Date(2015, 1, 5),
    max: new Date(),
  };
  res: any = {
    city: '310105',
    date: new Date(),
  };

  cityStatus: boolean = false;
  cityOptions: any = {};
  cityData: any = DATA;

  items: string[] = Array(6)
    .fill('')
    .map((_v: string, idx: number) => `Item${idx}`);
  itemGroup: any = [
    [
      {
        label: 'Item1',
        value: 1,
      },
      {
        label: 'Item2 (Disabled)',
        disabled: true,
        value: 2,
      },
      {
        label: 'Item3',
        value: 3,
      },
      {
        label: 'Item4',
        value: 4,
      },
      {
        label: 'Item5',
        value: 5,
      },
    ],
  ];

  mData: any;
  dateFormat: any = { hu: '', mu: '' };

  srvRes: any = '';

  constructor(private srv: PickerService) {}

  cityChange(item: any): void {
    console.log(item);
  }

  onSave(): void {
    alert('请求数据：' + JSON.stringify(this.res));
    return;
  }

  onCityChange(data: any): void {
    console.log('onCityChange', data);
  }
  onCityGroupChange(data: any): void {
    console.log('onCityGroupChange', data);
  }
  onCityCancel(): void {
    console.log('onCityCancel');
  }
  onItemChange(data: any): void {
    console.log('onItemChange', data);
  }
  onItemGroupChange(data: any): void {
    console.log('onItemGroupChange', data);
  }
  onItemCancel(): void {
    console.log('onItemCancel');
  }

  onMItemChange(data: any): void {
    console.log('onMItemChange', data);
  }
  onMItemGroupChange(data: any): void {
    console.log('onMItemGroupChange', data);
  }
  onMItemCancel(): void {
    console.log('onMItemCancel');
  }
  onShowBySrv(type: string): void {
    switch (type) {
      case 'city':
        this.srv.city({ data: this.cityData, title: `This is title` }).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;
      case 'date-ym':
        this.srv.dateTime({ type }).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;
      case 'date':
        this.srv.dateTime({ type }).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;
      case 'datetime':
        this.srv.dateTime({ type }).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;
      case 'time':
        this.srv.dateTime({ type }).subscribe((res: any) => {
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

  ngOnDestroy(): void {
    this.srv.destroyAll();
  }
}
