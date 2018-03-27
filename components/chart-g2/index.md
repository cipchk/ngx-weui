---
subtitle: G2-mobile图表
module: ChartG2Module
---

[g2-mobile](https://antv.alipay.com/g2-mobile/doc/index.html) 由阿里团队开发的针对移动端的图表，GZIP后（23KB）左右，还是蛮适合移动端的。

`weui-chart-g2` 对其进行封装；但 `ngx-weui` 本身并没有强制依赖 g2-mobile 依赖包。所以，如果你需要这个模块，那么有两种办法可以解决依赖：

**使用CND**

```html
<!-- index.html -->
<script src="https://a.alipayobjects.com/g/datavis/g2-mobile-all/2.1.14/index.js"></script>
```

**Npm**

```bash
npm install g2-mobile --save-dev
```

然后 .angular-cli.json 导入配置：

```javascript
"scripts": [
    "./node_modules/g2-mobile/index.js"
]
```

**使用示例：**

```html
<canvas weui-chart-g2 #c1="chart-g2" style="width:100%;height:200px;"></canvas>
```

```typescript
@ViewChild('c1') c1: ChartG2Directive;
renderC1() {
    const chart = this.c1.chart;
    chart.source([
        { "tem": 10, "city": "tokyo" },
        { "tem": 4, "city": "newYork" },
        { "tem": 3, "city": "berlin" }
    ]);
    chart.interval().position('city*tem').color('city');
    chart.render();
}
```

有关更多细节参考API以及[官网文档](https://antv.alipay.com/g2-mobile/demo/index.html)。
