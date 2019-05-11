import { Injectable } from '@angular/core';
import { LoaderService } from 'ngx-weui/core';

@Injectable({ providedIn: 'root' })
export class JWeiXinService {
  constructor(private load: LoaderService) {}

  /**
   * 懒加载jweixin.js
   *
   * @param jweixinUrl 默认：//res.wx.qq.com/open/js/jweixin-1.2.0.js
   */
  get(jweixinUrl?: string): Promise<boolean> {
    return new Promise(resolve => {
      this.load
        .loadScript(jweixinUrl || '//res.wx.qq.com/open/js/jweixin-1.2.0.js')
        .then(res => {
          resolve(res.loaded === true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
