import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { ChartG2Directive } from 'ngx-weui/chart-g2'

@Component({
    selector: 'example-chart-g2',
    templateUrl: './chart-g2.component.html',
    styleUrls: ['./chart-g2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoChartG2Component {
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

    @ViewChild('c2') c2: ChartG2Directive;
    renderC2() {
        let data = [
            { "time": '周一', "tem": 10, "city": "beijing" },
            { "time": '周二', "tem": 22, "city": "beijing" },
            { "time": '周三', "tem": 20, "city": "beijing" },
            { "time": '周四', "tem": 26, "city": "beijing" },
            { "time": '周五', "tem": 20, "city": "beijing" },
            { "time": '周六', "tem": 26, "city": "beijing" },
            { "time": '周日', "tem": 28, "city": "beijing" },
            { "time": '周一', "tem": 5, "city": "newYork" },
            { "time": '周二', "tem": 12, "city": "newYork" },
            { "time": '周三', "tem": 26, "city": "newYork" },
            { "time": '周四', "tem": 20, "city": "newYork" },
            { "time": '周五', "tem": 28, "city": "newYork" },
            { "time": '周六', "tem": 26, "city": "newYork" },
            { "time": '周日', "tem": 20, "city": "newYork" }
        ];
        let defs = {
            time: {
                tickCount: 7,
                range: [0, 1]
            },
            tem: {
                tickCount: 5,
                min: 0
            }
        };
        //配置time刻度文字样式
        let label = {
            fill: '#979797',
            font: '14px san-serif',
            offset: 6
        };

        let Util = this.c2.GM.Util;
        this.c2.chart.axis('time', {
            label: function (text, index, total) {
                var cfg = Util.mix({}, label);
                // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
                if (index === 0) {
                    cfg.textAlign = 'start';
                }
                if (index > 0 && index === total - 1) {
                    cfg.textAlign = 'end';
                }
                return cfg;
            }
        });
        this.c2.chart.axis('tem', {
            label: {
                fontSize: 14
            }
        });
        this.c2.chart.source(data, defs);
        this.c2.chart.line().position('time*tem').color('city').shape('smooth');
        this.c2.chart.render();
    }

    @ViewChild('c3') c3: ChartG2Directive;
    renderC3() {
        this.c3.GM.Global.pixelRatio = 2;//双精度
        var Shape = this.c3.GM.Shape;
        var G = this.c3.GM.G;
        var data = [{ pointer: '当前收益', value: 5, length: 2, y: 1.05 }];
        //自定义绘制数据的的形状      
        Shape.registShape('point', 'dashBoard', {
            getShapePoints: function (cfg) {
                var x = cfg.x;
                var y = cfg.y;
                return [
                    { x: x, y: y },
                    { x: x, y: 0.5 }
                ]
            },
            drawShape: function (cfg, canvas) {
                var point1 = cfg.points[0];
                var point2 = cfg.points[1];
                point1 = this.parsePoint(point1);
                point2 = this.parsePoint(point2);
                G.drawLines([point1, point2], canvas, {
                    stroke: '#18b7d6',
                    lineWidth: 2
                });
                var text = cfg.origin._origin.value.toString();
                G.drawText(text + '%', cfg.center, canvas, {
                    fillStyle: '#f75b5b',
                    font: '30px Arial',
                    textAlign: 'center',
                    textBaseline: 'bottom'
                });
                G.drawText(cfg.origin._origin.pointer, cfg.center, canvas, {
                    fillStyle: '#ccc',
                    textAlign: 'center',
                    textBaseline: 'top'
                });
            }
        });
        var chart = this.c3.chart;
        chart.source(data, {
            'value': { type: 'linear', min: 0, max: 15, tickCount: 6 },
            'length': { type: 'linear', min: 0, max: 10 },
            y: { type: 'linear', min: 0, max: 1 }
        });
        chart.coord('polar', {
            inner: 0,
            startAngle: -1.25 * Math.PI,
            endAngle: 0.25 * Math.PI
        });
        //配置value轴刻度线
        chart.axis('value', {
            tickLine: {
                strokeStyle: '#b9e6ef',
                lineWidth: 2,
                value: -5
            },
            label: null,
            grid: null,
            line: null
        });
        chart.axis('y', false);
        //绘制仪表盘辅助元素
        chart.guide().arc([0, 1.05], [4.8, 1.05], {
            strokeStyle: '#18b7d6',
            lineWidth: 5,
            lineCap: 'round'
        });
        chart.guide().arc([5.2, 1.05], [9.8, 1.05], {
            strokeStyle: '#ccc',
            lineWidth: 5,
            lineCap: 'round'
        });
        chart.guide().arc([10.2, 1.05], [15, 1.05], {
            strokeStyle: '#ccc',
            lineWidth: 5,
            lineCap: 'round'
        });
        chart.guide().arc([0, 1.2], [15, 1.2], {
            strokeStyle: '#ccc',
            lineWidth: 1
        });
        chart.guide().text([-0.5, 1.3], '0.00%', {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
        });
        chart.guide().text([7.5, 0.7], '7.50%', {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
        });
        chart.guide().text([15.5, 1.3], '15.00%', {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
        });
        chart.point().position('value*y').size('length').color('#18b7d6').shape('dashBoard');
        chart.render();
    }

    ngAfterViewInit() {
        this.renderC1();
        this.renderC2();
        this.renderC3();
    }
}
