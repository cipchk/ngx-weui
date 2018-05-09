// tslint:disable

/** 所有JS接口列表 */
export type ApiMethod =
  | 'onMenuShareTimeline'
  | 'onMenuShareAppMessage'
  | 'onMenuShareQQ'
  | 'onMenuShareWeibo'
  | 'onMenuShareQZone'
  | 'startRecord'
  | 'stopRecord'
  | 'onVoiceRecordEnd'
  | 'playVoice'
  | 'pauseVoice'
  | 'stopVoice'
  | 'onVoicePlayEnd'
  | 'uploadVoice'
  | 'downloadVoice'
  | 'chooseImage'
  | 'previewImage'
  | 'uploadImage'
  | 'downloadImage'
  | 'translateVoice'
  | 'getNetworkType'
  | 'openLocation'
  | 'getLocation'
  | 'hideOptionMenu'
  | 'showOptionMenu'
  | 'hideMenuItems'
  | 'showMenuItems'
  | 'hideAllNonBaseMenuItem'
  | 'showAllNonBaseMenuItem'
  | 'closeWindow'
  | 'scanQRCode'
  | 'chooseWXPay'
  | 'openProductSpecificView'
  | 'addCard'
  | 'chooseCard'
  | 'openCard';

/** 所有菜单基本类 */
export type MenuBase =
  | 'menuItem:exposeArticle'
  | 'menuItem:setFont'
  | 'menuItem:dayMode'
  | 'menuItem:nightMode'
  | 'menuItem:refresh'
  | 'menuItem:profile'
  | 'menuItem:addContact';

/** 所有菜单传播类 */
export type MenuShare =
  | 'menuItem:share:appMessage'
  | 'menuItem:share:timeline'
  | 'menuItem:share:qq'
  | 'menuItem:share:weiboApp'
  | 'menuItem:favorite'
  | 'menuItem:share:facebook'
  | 'menuItem:share:QZone';

/** 所有菜单保护类 */
export type MenuProtected =
  | 'menuItem:editTag'
  | 'menuItem:delete'
  | 'menuItem:copyUrl'
  | 'menuItem:originPage'
  | 'menuItem:readMode'
  | 'menuItem:openWithQQBrowser'
  | 'menuItem:openWithSafari'
  | 'menuItem:share:email'
  | 'menuItem:share:brand';

export interface ConfigOptions {
  /** 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 */
  debug?: boolean;
  /** 必填，公众号的唯一标识 */
  appId: string;
  /** 必填，生成签名的时间戳 */
  timestamp: number;
  /** 必填，生成签名的随机串 */
  nonceStr: string;
  /** 必填，签名，见附录1 */
  signature: string;
  /** 必填，需要使用的JS接口列表，所有JS接口列表见附录2 */
  jsApiList: ApiMethod[];
}

/** 通过config接口注入权限验证配置 */
export declare function config(options: ConfigOptions): void;

/** 通过ready接口处理成功验证 */
export declare function ready(fn: () => void): void;

/** 通过error接口处理失败验证 */
export declare function error(fn: (res: { errMsg: string }) => void): void;

export interface CallbackBase {
  /** 接口调用成功时执行的回调函数 */
  success?(...args: any[]): void;
  /** 接口调用失败的回调函数 */
  fail?(...args: any[]): void;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?(...args: any[]): void;
}

export interface ICheckJsApi extends CallbackBase {
  /** 需要检测的JS接口列表，所有JS接口列表见附录2 */
  jsApiList: ApiMethod[];
  /** 以键值对的形式返回，可用的api值true，不可用为false */
  success(res: {
    checkResult: { [api: string]: boolean };
    errMsg: string;
  }): void;
}

/** 判断当前客户端版本是否支持指定JS接口 */
export declare function checkJsApi(params: ICheckJsApi): void;

export interface onMenuShareBase {
  /** 用户确认分享后执行的回调函数 */
  success?(): void;
  /** 用户取消分享后执行的回调函数 */
  cancel?(): void;
}

export interface onMenuShareTimelineParam extends onMenuShareBase {
  /** 分享标题 */
  title: string;
  /** 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 */
  link: string;
  /** 分享图标 */
  imgUrl: string;
}

/** 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口 */
export declare function onMenuShareTimeline(
  params: onMenuShareTimelineParam,
): void;

export interface onMenuShareAppMessageParam extends onMenuShareTimelineParam {
  /** 分享描述 */
  desc: string;
  /** 分享类型,music、video或link，不填默认为link */
  type?: 'music' | 'video' | 'link';
  /** 如果type是music或video，则要提供数据链接，默认为空 */
  dataUrl?: string;
}

/** 获取“分享给朋友”按钮点击状态及自定义分享内容接口 */
export declare function onMenuShareAppMessage(
  params: onMenuShareAppMessageParam,
): void;

export interface onMenuShareQQParam extends onMenuShareTimelineParam {
  /** 分享描述 */
  desc: string;
}

/** 获取“分享给朋友”按钮点击状态及自定义分享内容接口 */
export declare function onMenuShareQQ(params: onMenuShareQQParam): void;

export interface onMenuShareWeiboParam extends onMenuShareTimelineParam {
  /** 分享描述 */
  desc: string;
}

/** 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口 */
export declare function onMenuShareWeibo(params: onMenuShareWeiboParam): void;

export interface onMenuShareQZoneParam extends onMenuShareTimelineParam {
  /** 分享描述 */
  desc: string;
}

/** 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口 */
export declare function onMenuShareQZone(params: onMenuShareQZoneParam): void;

export type ImageSizeType = 'original' | 'compressed';
export type ImageSourceType = 'album' | 'camera';

export interface chooseImageParam extends CallbackBase {
  /** 最多可以选择的图片张数，默认9 */
  count?: number;
  /** 可以指定是原图还是压缩图，默认二者都有 */
  sizeType?: ImageSizeType[];
  /** 可以指定来源是相册还是相机，默认二者都有 */
  sourceType?: ImageSourceType[];
  /** 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片 */
  success(res: {
    sourceType: string;
    localIds: string[];
    errMsg: string;
  }): void;
}

/** 拍照或从手机相册中选图接口 */
export declare function chooseImage(params: chooseImageParam): void;

export interface previewImageParam extends CallbackBase {
  /** 当前显示图片的http链接 */
  current: string;
  /** 需要预览的图片http链接列表 */
  urls: string[];
}

/** 预览图片接口 */
export declare function previewImage(params: previewImageParam): void;

export interface uploadImageParam extends CallbackBase {
  /** 需要上传的图片的本地ID，由chooseImage接口获得 */
  localId: string;
  /** 默认为1，显示进度提示 */
  isShowProgressTips?: number;
  /** 返回图片的服务器端ID(即 media_id) */
  success(res: { serverId: string }): void;
}

/**
 * 上传图片接口
 * 备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
 */
export declare function uploadImage(params: uploadImageParam): void;

export interface downloadImageParam extends CallbackBase {
  /** 需要下载的图片的服务器端ID，由uploadImage接口获得 */
  serverId: string;
  /** 默认为1，显示进度提示 */
  isShowProgressTips?: number;
  /** 返回图片下载后的本地ID */
  success(res: { localId: string }): void;
}

/** 下载图片接口 */
export declare function downloadImage(params: downloadImageParam): void;

export interface getLocalImgDataParam extends CallbackBase {
  /** 图片的localID */
  localId: string;
  /** localData是图片的base64数据，可以用img标签显示 */
  success(res: { localData: string }): void;
}

/**
 * 获取本地图片接口
 * 备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。具体可参考《iOS网页开发适配指南》
 */
export declare function getLocalImgData(params: getLocalImgDataParam): void;

/** 开始录音接口 */
export declare function startRecord(): void;

export interface startRecordParam extends CallbackBase {
  success(res: { localId: string }): void;
}

/** 停止录音接口 */
export declare function startRecord(params: startRecordParam): void;

export interface onVoiceRecordEndParam extends CallbackBase {
  /** 录音时间超过一分钟没有停止的时候会执行 complete 回调 */
  complete(res: { localId: string }): void;
}

/**
 * 监听录音自动停止接口
 * 注：这里回调的是 `complete`
 */
export declare function onVoiceRecordEnd(params: onVoiceRecordEndParam): void;

export interface playVoiceParam extends CallbackBase {
  /** 需要播放的音频的本地ID，由stopRecord接口获得 */
  localId: string;
}

/** 播放语音接口 */
export declare function playVoice(params: playVoiceParam): void;

export interface pauseVoiceParam extends CallbackBase {
  /** 需要暂停的音频的本地ID，由stopRecord接口获得 */
  localId: string;
}

/** 暂停播放接口 */
export declare function pauseVoice(params: pauseVoiceParam): void;

export interface stopVoiceParam extends CallbackBase {
  /** 需要停止的音频的本地ID，由stopRecord接口获得 */
  localId: string;
}

/** 停止播放接口 */
export declare function stopVoice(params: stopVoiceParam): void;

export interface onVoicePlayEndParam extends CallbackBase {
  /** 返回音频的本地ID */
  success(res: { localId: string }): void;
}

/** 监听语音播放完毕接口 */
export declare function onVoicePlayEnd(params: onVoicePlayEndParam): void;

export interface uploadVoiceParam extends CallbackBase {
  /** 需要上传的音频的本地ID，由stopRecord接口获得 */
  localId: string;
  /** 默认为1，显示进度提示 */
  isShowProgressTips?: number;
  /** 返回音频的服务器端ID */
  success(res: { serverId: string }): void;
}

/**
 * 上传语音接口
 * 备注：上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id，参考文档 .目前多媒体文件下载接口的频率限制为10000次/天，如需要调高频率，请登录微信公众平台，在开发 - 接口权限的列表中，申请提高临时上限。
 */
export declare function uploadVoice(params: uploadVoiceParam): void;

export interface downloadVoiceParam extends CallbackBase {
  /** 需要下载的音频的服务器端ID，由uploadVoice接口获得 */
  serverId: string;
  /** 默认为1，显示进度提示 */
  isShowProgressTips?: number;
  /** 返回音频的本地ID */
  success(res: { localId: string }): void;
}

/** 下载语音接口 */
export declare function downloadVoice(params: downloadVoiceParam): void;

export interface translateVoiceParam extends CallbackBase {
  /** 需要识别的音频的本地Id，由录音相关接口获得 */
  localId: string;
  /** 默认为1，显示进度提示 */
  isShowProgressTips?: number;
  /** 语音识别的结果 */
  success(res: { translateResult: string }): void;
}

/** 识别音频并返回识别结果接口 */
export declare function translateVoice(params: translateVoiceParam): void;

/** 网络类型 */
export type networkType = '2g' | '3g' | '4g' | 'wifi';

export interface getNetworkTypeParam extends CallbackBase {
  /** 返回网络类型2g，3g，4g，wifi */
  success(res: { networkType: networkType }): void;
}

/** 获取网络状态接口 */
export declare function getNetworkType(params: getNetworkTypeParam): void;

export interface openLocationParam extends CallbackBase {
  /** 纬度，浮点数，范围为90 ~ -90 */
  latitude: number;
  /** 经度，浮点数，范围为180 ~ -180。 */
  longitude: number;
  /** 位置名 */
  name: string;
  /** 地址详情说明 */
  address: string;
  /** 地图缩放级别,整形值,范围从1~28。默认为最大 */
  scale: number;
  /** 在查看位置界面底部显示的超链接,可点击跳转 */
  infoUrl: string;
}

/** 使用微信内置地图查看位置接口 */
export declare function openLocation(params: openLocationParam): void;

export interface getLocationSuccessData {
  /** 纬度，浮点数，范围为90 ~ -90 */
  latitude: number;
  /** 经度，浮点数，范围为180 ~ -180。 */
  longitude: number;
  /** 速度，以米/每秒计 */
  speed: number;
  /** 位置精度 */
  accuracy: number;
}

export interface getLocationParam extends CallbackBase {
  /** 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' */
  type: 'wgs84' | 'gcj02';
  success(res: getLocationSuccessData): void;
}

/** 获取地理位置接口 */
export declare function getLocation(params: getLocationParam): void;

export interface startSearchBeaconsParam extends CallbackBase {
  /** 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面 */
  ticket: string;
  /** 开启查找完成后的回调函数 */
  complete(argv: any): void;
}

/**
 * 开启查找周边ibeacon设备接口
 * 注：这里成功的回调是 `complete`
 */
export declare function startSearchBeacons(
  params: startSearchBeaconsParam,
): void;

export interface stopSearchBeaconsParam extends CallbackBase {
  /** 关闭查找完成后的回调函数 */
  complete(argv: any): void;
}

/**
 * 关闭查找周边ibeacon设备接口
 * 注：这里成功的回调是 `complete`
 */
export declare function stopSearchBeacons(params: stopSearchBeaconsParam): void;

export interface onSearchBeaconsParam extends CallbackBase {
  /** 回调函数，可以数组形式取得该商家注册的在周边的相关设备列表 */
  complete(argv: any): void;
}

/**
 * 监听周边ibeacon设备接口
 * 注：这里成功的回调是 `complete`
 */
export declare function onSearchBeacons(params: onSearchBeaconsParam): void;

/** 关闭当前网页窗口接口 */
export declare function closeWindow(): void;

export interface hideMenuItemsParam extends CallbackBase {
  /** 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮 */
  menuList: Array<MenuShare | MenuProtected>;
}

/** 批量隐藏功能按钮接口 */
export declare function hideMenuItems(params: hideMenuItemsParam): void;

export interface showMenuItemsParam extends CallbackBase {
  /** 要显示的菜单项 */
  menuList: Array<MenuShare | MenuProtected>;
}

/** 批量显示功能按钮接口 */
export declare function showMenuItems(params: showMenuItemsParam): void;

/** 隐藏所有非基础按钮接口 */
export declare function hideAllNonBaseMenuItem(): void;

/** 显示所有功能按钮接口 */
export declare function showAllNonBaseMenuItem(): void;

/** 扫二维码类型 */
export type scanType = 'qrCode' | 'barCode';

export interface scanQRCodeParam extends CallbackBase {
  /** 默认为0，扫描结果由微信处理，1则直接返回扫描结果 */
  needResult: 0 | 1;
  /** 可以指定扫二维码还是一维码，默认二者都有 */
  scanType: scanType[];
  /** 当needResult 为 1 时，扫码返回的结果 */
  success(res: { resultStr: string }): void;
}

/** 调起微信扫一扫接口 */
export declare function scanQRCode(params: scanQRCodeParam): void;

export interface openProductSpecificViewParam extends CallbackBase {
  /** 商品id */
  productId: string;
  /** 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页 */
  viewType: '0' | '1' | '2';
}

/** 跳转微信商品页接口 */
export declare function openProductSpecificView(
  params: openProductSpecificViewParam,
): void;

export interface chooseCardParam extends CallbackBase {
  /** 门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表，非必填。 */
  shopId?: string;
  /** 卡券类型，用于拉起指定卡券类型的卡券列表。当cardType为空时，默认拉起所有卡券的列表，非必填。 */
  cardType?: string;
  /** 卡券ID，用于拉起指定cardId的卡券列表，当cardId为空时，默认拉起所有卡券的列表，非必填。 */
  cardId?: string;
  /** 时间戳。 */
  timestamp: number;
  /** 随机字符串。 */
  nonceStr: string;
  /** 签名方式，目前仅支持SHA1 */
  signType: string;
  /** 签名。 */
  cardSign: string;
  /** 用户选中的卡券列表信息 */
  success(res: { cardList: string[] }): void;
}

/**
 * 拉取适用卡券列表并获取用户选择信息
 * 特别提醒: 拉取列表仅与用户本地卡券有关，拉起列表异常为空的情况通常有三种：签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。
 */
export declare function chooseCard(params: chooseCardParam): void;

export interface addCardListItem {
  /** 卡券Id */
  cardId: string;
  /** 卡券扩展字段 */
  cardExt: string;
}

export interface addCardParam extends CallbackBase {
  /** 需要添加的卡券列表 */
  cardList: addCardListItem[];
  /** 添加的卡券列表信息 */
  success(res: { cardList: string[] }): void;
}

/**
 * 批量添加卡券接口
 * 建议: 开发者一次添加的卡券不超过5张，否则会遇到超时报错。
 */
export declare function addCard(params: addCardParam): void;

export interface openCardListItem {
  /** 卡券Id */
  cardId: string;
  /** 指定的卡券code码，只能被领一次。自定义code模式的卡券必须填写，非自定义code和预存code模式的卡券不必填写。详情见：是否自定义code码 */
  code: string;
}

export interface openCardParam extends CallbackBase {
  /** 需要添加的卡券列表 */
  cardList: openCardListItem[];
}

/** 查看微信卡包中的卡券接口 */
export declare function openCard(params: openCardParam): void;

export interface chooseWXPayParam extends CallbackBase {
  /** 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符 */
  timestamp: number;
  /** 支付签名随机串，不长于 32 位 */
  nonceStr: string;
  /** 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***） */
  package: string;
  /** 签名方式，默认为'SHA1'，使用新版支付需传入'MD5' */
  signType: 'SHA1' | 'MD5';
  /** 支付签名 */
  paySign: string;
  /** 支付成功后的回调函数 */
  success(res: any): void;
}

/** 发起一个微信支付请求 */
export declare function chooseWXPay(params: chooseWXPayParam): void;
