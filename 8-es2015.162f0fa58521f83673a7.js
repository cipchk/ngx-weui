(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{tNdM:function(e,i,n){"use strict";n.r(i),n.d(i,"routes",(function(){return v})),n.d(i,"ExampleModule",(function(){return _}));var a=n("tyNb"),t=n("dH7C"),l=n("PCNd"),o=n("fXoL");let c=(()=>{class e{constructor(){this.menus=[{name:"\u5e03\u5c40 Layout",icon:"icon_nav_form",show:!1,items:[{label:"Flex",id:"flex"},{label:"Grid",id:"grid"},{label:"Article",id:"article"},{label:"Footer",id:"footer"},{label:"Preview",id:"preview"},{label:"Panel",id:"panel"}]},{name:"\u5bfc\u822a Navigation",icon:"icon_nav_nav",show:!1,items:[{label:"Navbar",id:"navbar"},{label:"Tabbar",id:"tabbar"},{label:"Sidebar",id:"sidebar"},{label:"Popup",id:"popup"},{label:"Pagination \u5206\u9875\u5668",id:"pagination"}]},{name:"\u6570\u636e\u5f55\u5165 Data Entry",icon:"icon_nav_form",show:!1,items:[{label:"Button",id:"button"},{label:"Input",id:"input"},{label:"Slider",id:"slider"},{label:"Picker",id:"picker"},{label:"Uploader",id:"uploader"},{label:"Rating",id:"rating"},{label:"Loadmore",id:"loadmore"},{label:"Progress",id:"progress"},{label:"Stepper \u6b65\u8fdb\u5668",id:"stepper"}]},{name:"\u6570\u636e\u5c55\u793a Data Display",icon:"icon_nav_form",show:!1,items:[{label:"Accordion",id:"accordion"},{label:"Badge",id:"badge"},{label:"Icons",id:"icons"},{label:"List",id:"list"},{label:"Gallery",id:"gallery"},{label:"Swiper",id:"swiper"}]},{name:"\u64cd\u4f5c\u53cd\u9988 Feedback",icon:"icon_nav_feedback",show:!1,items:[{label:"Actionsheet",id:"actionsheet"},{label:"Dialog",id:"dialog"},{label:"Msg",id:"msg"},{label:"Msg",id:"msg_fail",show:!1},{label:"Msg",id:"msg_success",show:!1},{label:"Toast",id:"toast"},{label:"Toptips",id:"toptips"}]},{name:"\u624b\u52bf Gesture",icon:"icon_nav_feedback",show:!1,items:[{label:"Pull To Refresh",id:"ptr"},{label:"Infinite Loader",id:"infiniteloader"}]},{name:"\u7ec4\u5408\u7ec4\u4ef6 Combination",icon:"icon_nav_search",show:!1,items:[{label:"Search Bar",id:"searchbar"}]},{name:"\u5176\u4ed6 Other",icon:"icon_nav_layout",show:!1,items:[{label:"\u5fae\u4fe1JS-SDK",id:"jweixin"},{label:"Mask",id:"mask"}]},{name:"Third Party",icon:"icon_nav_layout",show:!1,items:[{label:"Chart G2-Mobile",id:"chart-g2"},{label:"Countdown",id:"countdown"},{label:"Gesture Password",id:"gesture-password"},{label:"QQ Map",id:"map-qq"}]}]}getMenu(e){for(const i of this.menus){const n=i.items.find(i=>i.id===e);if(n)return n}}}return e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=o.Ib({token:e,factory:e.\u0275fac}),e})();var s=n("ofXK"),r=n("p/Uq");function b(e,i){if(1&e&&o.Nb(0,"component-container",1),2&e){const e=o.cc();o.hc("menu",e.menu)("url","example")}}let d=(()=>{class e{constructor(e,i){this.route=e,this.menuService=i}ngOnInit(){this.route.params.subscribe(e=>{this.menu=this.menuService.getMenu(e.id)})}}return e.\u0275fac=function(i){return new(i||e)(o.Mb(a.a),o.Mb(c))},e.\u0275cmp=o.Gb({type:e,selectors:[["example-container"]],decls:1,vars:1,consts:[[3,"menu","url",4,"ngIf"],[3,"menu","url"]],template:function(e,i){1&e&&o.wc(0,b,1,2,"component-container",0),2&e&&o.hc("ngIf",i.menu)},directives:[s.m,r.a],encapsulation:2}),e})();var u=n("ZZ2P"),m=n("J+xj"),p=n("fdnq");const f=function(e){return["/example",e]};function h(e,i){if(1&e&&(o.Sb(0,"a",10),o.Sb(1,"div",11),o.Sb(2,"p"),o.yc(3),o.Rb(),o.Rb(),o.Nb(4,"div",12),o.Rb()),2&e){const e=o.cc().$implicit;o.hc("routerLink",o.lc(2,f,e.id)),o.zb(3),o.zc(e.label)}}function w(e,i){1&e&&o.wc(0,h,5,4,"a",9),2&e&&o.hc("ngIf",!1!==i.$implicit.show)}function g(e,i){if(1&e&&(o.Sb(0,"weui-accordion-panel",3),o.Sb(1,"div",4),o.Sb(2,"p",5),o.yc(3),o.Rb(),o.Nb(4,"img",6),o.Rb(),o.Sb(5,"div",7),o.wc(6,w,1,1,"ng-template",8),o.Rb(),o.Rb()),2&e){const e=i.$implicit;o.hc("active",e.show),o.zb(3),o.zc(e.name),o.zb(1),o.jc("src","./assets/images/",e.icon,".png",o.sc),o.zb(2),o.hc("ngForOf",e.items)}}const v=[{path:"",component:(()=>{class e{constructor(e){this.menuService=e,this.title='<img src="./assets/images/logo.png" alt="weui" height="21px" />'}onSelecte(e){this.menuService.menus.forEach((i,n)=>{i.show=n===e})}}return e.\u0275fac=function(i){return new(i||e)(o.Mb(c))},e.\u0275cmp=o.Gb({type:e,selectors:[["example-home"]],decls:3,vars:5,consts:[[3,"ngClass","title","subTitle"],[1,"home-accordion",3,"activeFirst","select"],["class","weui-accordion-panel",3,"active",4,"ngFor","ngForOf"],[1,"weui-accordion-panel",3,"active"],["heading","",1,"weui-flex","js_category"],[1,"weui-flex__item"],["alt","",3,"src"],[1,"weui-cells","page__category-content"],["ngFor","",3,"ngForOf"],["class","weui-cell weui-cell_access js_item",3,"routerLink",4,"ngIf"],[1,"weui-cell","weui-cell_access","js_item",3,"routerLink"],[1,"weui-cell__bd"],[1,"weui-cell__ft"]],template:function(e,i){1&e&&(o.Sb(0,"Page",0),o.Sb(1,"weui-accordion",1),o.ac("select",(function(e){return i.onSelecte(e)})),o.wc(2,g,7,4,"weui-accordion-panel",2),o.Rb(),o.Rb()),2&e&&(o.hc("ngClass","home")("title",i.title)("subTitle","A UI library by WeChat official design team, includes the most useful widgets/modules in mobile web applications."),o.zb(1),o.hc("activeFirst",!1),o.zb(1),o.hc("ngForOf",i.menuService.menus))},directives:[u.a,s.k,m.a,s.l,p.a,s.m,a.g],encapsulation:2}),e})()},{path:":id",component:d}];let _=(()=>{class e{}return e.\u0275mod=o.Kb({type:e}),e.\u0275inj=o.Jb({factory:function(i){return new(i||e)},providers:[c],imports:[[l.a,t.a,a.h.forChild(v)]]}),e})()}}]);