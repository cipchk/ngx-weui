import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Uploader, UploaderOptions } from 'ngx-weui/uploader';

@Component({
  selector: 'example-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoUploaderComponent {
  subTitle: string;
  private _url: string;

  @Input()
  set url(v: string) {
    this.subTitle = `上传组件，一般配合<a class="link" href="#/${v}/gallery">组件Gallery</a>来使用。`;
    this._url = v;
  }
  get url() {
    return this._url;
  }

  constructor() {
    this.url = 'example';
  }

  uploader: Uploader = new Uploader({
    url: './upload.php',
    headers: [{ name: 'auth', value: 'test' }],
    params: {
      a: 1,
      b: new Date(),
      c: 'test',
      d: 12.123,
    },
    // 自定义transport
    // uploadTransport: function(item: FileItem) {
    //     return Observable.create(observer => {
    //         setTimeout(() => {
    //             observer.next(true);
    //             observer.complete();
    //         }, 1000 * 3);
    //     });
    // },
    onFileQueued() {
      console.log('onFileQueued', arguments);
    },
    onFileDequeued() {
      console.log('onFileDequeued', arguments);
    },
    onStart() {
      console.log('onStart', arguments);
    },
    onCancel() {
      console.log('onCancel', arguments);
    },
    onFinished() {
      console.log('onFinished', arguments);
    },
    onUploadStart() {
      console.log('onUploadStart', arguments);
    },
    onUploadProgress() {
      console.log('onUploadProgress', arguments);
    },
    onUploadSuccess() {
      console.log('onUploadSuccess', arguments);
    },
    onUploadError() {
      console.log('onUploadError', arguments);
    },
    onUploadComplete() {
      console.log('onUploadComplete', arguments);
    },
    onUploadCancel() {
      console.log('onUploadCancel', arguments);
    },
    onError() {
      console.log('onError', arguments);
    },
  } as UploaderOptions);

  img: any;
  imgShow: boolean = false;
  onGallery(item: any) {
    this.img = [{ file: item._file, item }];
    this.imgShow = true;
  }

  onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }
}
