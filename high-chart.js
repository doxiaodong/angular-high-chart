myApp.directive('highChart', function() {
  return {
    restrict: 'AE',
    scope: {
      config: '='
    },
    link: function(scope, element, attr) {
      var chart, defaultConfig, renderChart, type, update;
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      type = attr.type.toLocaleLowerCase();
      update = attr.updateAll !== void 0;
      chart = null;
      defaultConfig = {
        chart: {
          renderTo: attr.id,
          backgroundColor: 'transparent'
        },
        credits: {
          href: 'http://www.darlin.me/',
          text: 'www.darlin.me'
        },
        rangeSelector: {
          inputEnabled: false,
          selected: 0,
          enabled: false
        },
        series: [
          {
            data: [0]
          }
        ]
      };
      renderChart = function(type) {
        if (type === 'map') {
          if (scope.config) {
            chart = new Highcharts.Map(scope.config);
          } else {
            chart = new Highcharts.Map(defaultConfig);
          }
        }
        if (type === 'chart') {
          if (scope.config) {
            chart = new Highcharts.Chart(scope.config);
          } else {
            chart = new Highcharts.Chart(defaultConfig);
          }
        }
        if (type === 'stock') {
          if (scope.config) {
            return chart = new Highcharts.StockChart(scope.config);
          } else {
            return chart = new Highcharts.StockChart(defaultConfig);
          }
        }
      };
      renderChart(type);
      return scope.$watch('config', function(newValue, oldValue) {
        if (newValue !== oldValue && scope.config) {
          if (type === 'stock' && update) {
            chart = new Highcharts.StockChart(scope.config);
            return;
          }
          if (type === 'chart' && update) {
            chart = new Highcharts.Chart(scope.config);
            return;
          }
          if (type === 'map' && update) {
            chart = new Highcharts.Map(scope.config);
            return;
          }
          if (scope.config.series) {
            chart.series[0].update(scope.config.series[0]);
          }
          if (scope.config.title) {
            chart.setTitle(scope.config.title);
          }
          if (scope.config.subtitle) {
            chart.setTitle(null, scope.config.subtitle);
          }
          if (chart.colorAxis && scope.config.colorAxis) {
            chart.colorAxis[0].update(scope.config.colorAxis);
          }
          if (chart.xAxis && scope.config.xAxis) {
            chart.xAxis[0].update(scope.config.xAxis);
          }
          if (chart.yAxis && scope.config.yAxis) {
            return chart.yAxis[0].update(scope.config.yAxis);
          }
        }
      });
    }
  };
});