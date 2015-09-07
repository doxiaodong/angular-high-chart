'use strict';

// https://github.com/doxiaodong/angular-high-chart

myApp.directive('highChart', function() {
  return {
    restrict: 'AE',
    scope: {
      config: '='
    },
    link: function(scope, element, attr) {
      var chart, defaultConfig, renderChart, resetDefaultConfig, type, update;
      if (scope.config === void 0) {
        scope.config = scope.$parent.$parent[attr.config];
      }
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      type = attr.type.toLocaleLowerCase();
      update = attr.updateAll !== void 0;
      chart = null;
      defaultConfig = null;
      resetDefaultConfig = function() {
        var disAxis;
        disAxis = {
          title: {
            text: ''
          },
          legend: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          xAxis: {
            labels: {
              enabled: false
            }
          },
          yAxis: {
            labels: {
              enabled: false
            },
            title: {
              text: ''
            }
          },
          plotOptions: {
            series: {
              marker: {
                enabled: false
              }
            }
          },
          credits: {
            enabled: false
          }
        };
        defaultConfig = {
          chart: {
            renderTo: element[0],
            backgroundColor: 'transparent'
          },
          credits: {
            href: 'https://darlin.me/',
            text: 'darlin.me'
          },
          colors: ['rgba(53, 174, 152, 0.75)', 'rgba(241, 10, 65, 0.75)'],
        };
        if (attr.disaxis !== void 0) {
          return angular.merge(defaultConfig, disAxis);
        }
      };
      resetDefaultConfig();
      renderChart = function(type) {
        var config;
        resetDefaultConfig();
        config = defaultConfig;
        if (scope.config) {
          angular.merge(config, scope.config);
        }
        if (type === 'map') {
          chart = new Highcharts.Map(config);
        }
        if (type === 'chart') {
          chart = new Highcharts.Chart(config);
        }
        if (type === 'stock') {
          return chart = new Highcharts.StockChart(config);
        }
      };
      renderChart(type);
      return scope.$watch('config', function(newValue, oldValue) {
        if (newValue !== oldValue && scope.config) {
          if (update) {
            renderChart(type);
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