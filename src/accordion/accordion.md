# Accordion

`weui-accordion` 本身无任何样式，只实现功能性而已。

## 样式说明

这里有几个样式，你可能根据需要做一次特殊的处理，比如：动画。

**weui-accordion-content**

每个面板都会自动加上。而且默认的样式为：

```css
.weui-accordion-content { max-height: 0; }
```

**weui-accordion-panel-disabled**

当设置 `[disabled]="true"` 时，会自动加上。

**weui-accordion-content-active**

当设置 `[active]="true"` 时，会自动加上。

```css
.weui-accordion-content-active { max-height: inherit; }
```

这里内容的展开与折叠是利用CSS的 `max-height` 值，因此，可以给它加上相应的 `transition` 可以实现一定的CSS动画效果，具体请参考示例。
