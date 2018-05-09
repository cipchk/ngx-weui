import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JWeiXinService } from 'ngx-weui/jweixin';

/**
 * 微信JS-SDK服务器
 */
@Injectable()
export class WXService {
  private static DEFAULTSHARE: any = {
    title: 'Site Name',
    desc: '',
    link: '',
    imgUrl: '',
  };
  constructor(private wxService: JWeiXinService, private http: HttpClient) {}

  private share: any;
  config(shareData: any): Promise<boolean> {
    this.share = shareData;
    return new Promise((resolve, reject) => {
      this.wxService.get().then(res => {
        if (!res) {
          reject('jweixin.js 加载失败');
          return;
        }

        wx.ready(() => {
          this._onMenuShareTimeline()
            ._onMenuShareAppMessage()
            ._onMenuShareQQ()
            ._onMenuShareQZone()
            ._onMenuShareWeibo();

          resolve();
        });
        wx.error(() => {
          reject('config 注册失败');
        });

        this.http
          .get('/wx-config')
          .pipe(
            catchError((error: Response | any) => {
              reject('无法获取签名数据');
              return Observable.throw('error');
            }),
          )
          .subscribe((ret: any) => {
            if (!ret.success) {
              reject('jsapi 获取失败');
              return;
            }
            wx.config(ret);
          });
      });
    });
  }

  private _onMenuShareTimeline() {
    wx.onMenuShareTimeline(
      Object.assign({}, WXService.DEFAULTSHARE, this.share),
    );
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage(
      Object.assign({}, WXService.DEFAULTSHARE, this.share),
    );
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone(Object.assign({}, WXService.DEFAULTSHARE, this.share));
    return this;
  }
}
