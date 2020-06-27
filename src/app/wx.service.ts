import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
          this._onMenuShareTimeline()._onMenuShareAppMessage()._onMenuShareQQ()._onMenuShareQZone()._onMenuShareWeibo();

          resolve();
        });
        wx.error(() => {
          reject('config 注册失败');
        });

        this.http
          .get('/wx-config')
          .pipe(
            catchError(() => {
              reject('无法获取签名数据');
              return throwError('error');
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
    wx.onMenuShareTimeline({ ...WXService.DEFAULTSHARE, ...this.share });
    return this;
  }

  private _onMenuShareAppMessage() {
    wx.onMenuShareAppMessage({ ...WXService.DEFAULTSHARE, ...this.share });
    return this;
  }

  private _onMenuShareQQ() {
    wx.onMenuShareQQ({ ...WXService.DEFAULTSHARE, ...this.share });
    return this;
  }

  private _onMenuShareWeibo() {
    wx.onMenuShareWeibo({ ...WXService.DEFAULTSHARE, ...this.share });
    return this;
  }

  private _onMenuShareQZone() {
    wx.onMenuShareQZone({ ...WXService.DEFAULTSHARE, ...this.share });
    return this;
  }
}
