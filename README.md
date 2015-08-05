# angular-high-chart

### 预览地址
  1. [chart](https://dn-darlinme.qbox.me/example/highchart/chart.html)
  2. [stock](https://dn-darlinme.qbox.me/example/highchart/stock.html)
  3. [map](https://dn-darlinme.qbox.me/example/highchart/map.html)

### 简介与说明

* 配合angularjs的图表指令
* 需要引入文件
```
# 普通图表
<script src="http://code.highcharts.com/adapters/standalone-framework.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>

# highchart-stock
<script src="http://code.highcharts.com/adapters/standalone-framework.js"></script>
<script src="http://code.highcharts.com/stock/highstock.js"></script>

# 地图
<script src="http://code.highcharts.com/adapters/standalone-framework.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/maps/modules/map.js"></script>

# highchart-stock && 地图
<script src="http://code.highcharts.com/adapters/standalone-framework.js"></script>
<script src="http://code.highcharts.com/stock/highstock.js"></script>
<script src="http://code.highcharts.com/maps/modules/map.js"></script>

```

### 使用

```
1. <div id="highcharts0" high-chart type="chart" config="chartOption" update-all style="width: 80%; height: 500px;"></div>
{
  id: <必须> //用于存放图表的区域
  high-chart: <必须> //angularjs 指令
  type: <必须> //图表类型, 1. chart, 2. stock, 3. map
  config: <必须> //图表配置, 具体使用参照 http://www.highcharts.com/
  update-all: <可选> //表示更新数据是根据新参数重绘图表, 适用于没有单独更新的选项, 比如 credits
}
```
