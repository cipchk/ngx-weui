---
subtitle: 微信JS SDK
module: JWeiXinModule
---

`ngx-weui` 只对js-sdk提供以下特性：

+ 完整 js-sdk 的接口声明文件。
+ 懒加载 **jweixin-1.2.0.js** 文件。

> ## 声明文件使用说明（非常重要）

> `ngx-weui` 允许你单独使用这份声明文件，而无须任何模块的导入。

> ```typescript
> import * as wx from 'ngx-weui/jweixin/wx';

> wx.config({

> });
> ```

> **但，由于当前Angular的版本BUG，此声明文件无法被使用，我会跟进该BUG直到解决它。**

因此，暂时无法享受智能提醒带来的快感，当前可以在 `typings.d.ts` 使用定义 `wx` 变量：

```ts
declare var wx: any;
```

做为过渡吧。

# 通过config接口注入权限验证配置

由于Angular是一个SPA，因此，每一次路由的变动都需要重要注册一次，最简单的办法是在**根组件**里面订阅 `router.events` 并在每一次切换时重新注册。

```ts
export class AppComponent {

    constructor(private router: Router, private wxService: JWeiXinService) {}

    ngOnInit() {
        this.wxService.get().then((res) => {
            if (!res) {
                console.warn('jweixin.js 加载失败');
                return;
            }

            this.router.events.subscribe((r) => {
                if (!(r instanceof NavigationEnd)) return;
                // 1、通过config接口注入权限验证配置
                wx.config({});
                // 2、通过ready接口处理成功验证
                wx.ready(() => {
                    // 注册各种onMenuShareTimeline & onMenuShareAppMessage
                });
                // 2、通过error接口处理失败验证
                wx.error(() => {

                });
            });
        });
    }
}
```

当然以上办法有一个最大的弊端，我们无法很优雅的定制我们分享的内容，即 `title`、`desc`、`imgUrl` 等之类的信息。**所有通过抓取的都是流氓且不靠谱的行为**，故而，我建议创建一个 Service　类，然后在你需要的页面加载并使用它，以下是一个范本：

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWeiXinService } from 'ngx-weui/jweixin';

declare var wx: any;

/**
 * 微信JS-SDK服务器
 */
@Injectable()
export class WXService {
    private static DEFAULTSHARE: any = {
        title: 'Site Name',
        desc: '',
        link: '',
        imgUrl: ''
    };
    constructor(private wxService: JWeiXinService, private http: Http) { }

    private share: any;
    config(shareData: any): Promise<boolean> {
        this.share = shareData;
        return new Promise((resolve, reject) => {
            this.wxService.get().then((res) => {
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
                    .map(res => { return res.json(); })
                    .catch((error: Response | any) => {
                        reject('无法获取签名数据');
                        return Observable.throw('error');
                    })
                    .subscribe((res) => {
                        if (!res.success) {
                            reject('jsapi 获取失败');
                            return;
                        }
                        wx.config(res);
                    });
            });
        });
    }

    private _onMenuShareTimeline() {
        wx.onMenuShareTimeline(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareAppMessage() {
        wx.onMenuShareAppMessage(Object.assign({}, WXService.DEFAULTSHARE, this.share));
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
```

最后，你可以优雅的调用它。

```ts
export class JWeiXinComponent {
    constructor(private wxService: WXService) { }

    status: string;
    ngOnInit() {
        this.wxService.config({
            title: '新标题'
        }).then(() => {
            // 其它操作，可以确保注册成功以后才有效
            this.status = '注册成功';
        }).catch((err: string) => {
            this.status = `注册失败，原因：${err}`
        });
    }
}
 ```

