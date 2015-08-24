'use strict';
myApp.directive('highChart', function() {
  return {
    restrict: 'AE',
    scope: {
      config: '=',
      redraw: '='
    },
    link: function(scope, element, attr) {
      var chart, defaultConfig, redraw, renderChart, type, update;
      if (scope.config === void 0) {
        scope.config = scope.$parent.$parent[attr.config];
      }
      if (attr.redraw !== void 0 && scope.redraw === void 0) {
        scope.redraw = scope.$parent.$parent[attr.redraw];
        scope.$parent.$parent.$watch(attr.redraw, function() {
          return scope.redraw = scope.$parent.$parent[attr.redraw];
        });
      }
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
          href: 'https://darlin.me/',
          text: 'darlin.me'
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
      redraw = function() {
        if (type === 'stock') {
          chart = new Highcharts.StockChart(scope.config);
          return;
        }
        if (type === 'chart') {
          chart = new Highcharts.Chart(scope.config);
          return;
        }
        if (type === 'map') {
          return chart = new Highcharts.Map(scope.config);
        }
      };
      renderChart(type);
      scope.$watch('redraw', function(newValue, oldValue) {
        if (newValue !== oldValue && scope.config) {
          console.log('redraw');
          return redraw();
        }
      });
      return scope.$watch('config', function(newValue, oldValue) {
        if (newValue !== oldValue && scope.config) {
          if (update) {
            redraw();
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
      }, true);
    }
  };
});