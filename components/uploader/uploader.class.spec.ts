import { fakeAsync, tick } from '@angular/core/testing';
import * as sinon from 'sinon';
import { Uploader } from './uploader.class';

describe('Uploader: Class', () => {
  let instance: Uploader;
  let xhr: any;
  let requests: any[];

  function addFiles(count: number = 1, ext: string = 'png', type: string = 'image/png') {
    for (let i = 0; i < count; i++) {
      const textFileAsBlob = new Blob(['a' + i], { type });
      const f = new File([textFileAsBlob], `${i + 1}.${ext}`);
      instance.addToQueue([f]);
    }
  }

  beforeEach(() => {
    instance = new Uploader({});
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = req => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('#setOptions should be set alias,auto,size,limit,types', () => {
    const args = {
      alias: 'image',
      auto: true,
      size: 10,
      limit: 10,
      types: ['jpg', 'png'],
    };
    instance.setOptions(args);
    // tslint:disable-next-line:forin
    for (const k in args) {
      expect(instance.options[k]).toBe(args[k], `参数${k}值应该是：${args[k]}`);
    }
  });

  describe('#addToQueue', () => {
    it('should be add file to queue', () => {
      addFiles(1, 'png');
      expect(instance.queue.length).toBe(1);
      expect(instance.queue[0].file.name).toBe('1.png');
    });

    it('should be filter valid', () => {
      instance.setOptions({ types: ['xxx'] });
      const files = [
        { e: 'pdf', t: 'application/pdf' },
        { e: 'psd', t: 'image/psd' },
        { e: 'png', t: 'image/png' },
        { e: 'mp4', t: 'video/mp4' },
        { e: 'mp3', t: 'audio/mp3' },
      ];
      for (const item of files) {
        instance.clearQueue();
        addFiles(1, item.e, item.t);
        expect(instance.queue.length).toBe(0, `the ${item.e} file need invalid`);
      }
    });
  });

  it('#removeFromQueue should be return 1', () => {
    addFiles(2, 'png');
    expect(instance.queue.length).toBe(2);
    instance.removeFromQueue(instance.queue[0]);
    expect(instance.queue.length).toBe(1);
  });

  it('#clearQueue should be return 0', () => {
    addFiles(1, 'png');
    expect(instance.queue.length).toBe(1);
    instance.clearQueue();
    expect(instance.queue.length).toBe(0);
  });

  it('#uploadItem should be isUploading=true', () => {
    addFiles(1, 'png');
    expect(instance.isUploading).toBe(false);
    instance.uploadItem(instance.queue[0]);
    expect(instance.isUploading).toBe(true);
  });

  it('#cancelItem should be', fakeAsync(() => {
    addFiles(1, 'png');
    instance.uploadItem(instance.queue[0]);
    instance.cancelItem(instance.queue[0]);
    tick(100);
    expect(instance.queue[0].isCancel).toBe(true);
  }));
});
