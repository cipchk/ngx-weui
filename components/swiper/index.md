---
title: weui-pagination
subtitle: 分页器
config: SwiperConfig
module: SwiperModule
---

Swiper触摸滑动，是[swiper](http://idangero.us/swiper/)的简单封装而已，默认 `ngx-weui` 并不强制依赖 `swiper`，所以如果你需要这个模块，还需要配置自行安装 swiper 插件：

```bash
npm install swiper --save
npm install --save-dev @types/swiper
```

最后 .angular-cli.json 导入配置：

```json
"styles": [
    "./node_modules/swiper/dist/css/swiper.css"
],
"scripts": [
    "./node_modules/swiper/dist/js/swiper.js"
]
```

使用示例：

```html
<weui-swiper [options]="options">
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" *ngFor="let i of [1, 2, 3, 4]">Slide {{i}}</div>
    </div>
    <div class="swiper-pagination"></div>
</div>
</weui-swiper>
```

组件内容的HTML跟swiper所需要的DOM结构完全一样。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
options | 等同于swiper[参数项](http://idangero.us/swiper/api/) | `any` | -
swiper | Swiper 实例对象，可以通过 `@ViewChild` 访问到它 | `any` | -
