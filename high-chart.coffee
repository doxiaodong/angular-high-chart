'use strict'

# https://github.com/doxiaodong/angular-high-chart

angular.module 'app'
  .directive 'highChart', ->
    restrict: 'AE'
    scope:
      config: '='
    link: (scope, element, attr) ->

      #  for highcharts in a directive
      if scope.config == undefined
        scope.config = scope.$parent.$parent[attr.config]

      if attr.redraw != undefined && scope.redraw == undefined
        scope.redraw = scope.$parent.$parent[attr.redraw]
        scope.$parent.$parent.$watch attr.redraw, ->
          scope.redraw = scope.$parent.$parent[attr.redraw]

      Highcharts.setOptions(
        global:
          useUTC: false
      )
      type = attr.type.toLocaleLowerCase()
      update = attr.updateAll != undefined
      chart = null

      # 使用以下配置在你的配置准备好之前
      defaultConfig = null

      resetDefaultConfig = ->

        disAxis =
          title:
            text: ''
          legend:
            enabled: false
          navigation:
            buttonOptions:
              enabled: false
          xAxis:
            labels:
              enabled: false
          yAxis:
            labels:
              enabled: false
            title:
              text: ''
          plotOptions:
            series:
              marker:
                enabled:false
          colors: [
            'rgba(53, 174, 152, 0.75)',
            'rgba(241, 10, 65, 0.75)'
          ]
          credits:
            enabled: false

        defaultConfig =
          chart:
            renderTo: element[0]
            backgroundColor: 'transparent'
          credits:
            href: 'https://darlin.me/'
            text: 'darlin.me'
          rangeSelector:
            inputEnabled: false
            selected: 0
            enabled: false

        if attr.disaxis != undefined
          angular.merge defaultConfig, disAxis

      resetDefaultConfig()

      renderChart = (type) ->

        resetDefaultConfig()

        config = defaultConfig
        angular.merge config, scope.config if scope.config

        if type == 'map'
          chart = new Highcharts.Map config
        if type == 'chart'
          chart = new Highcharts.Chart config
        if type == 'stock'
          chart = new Highcharts.StockChart config

      renderChart type

      scope.$watch 'config', (newValue, oldValue) ->
        if newValue != oldValue && scope.config

          # 如果要更新rangeSelector 设置 update-all
          if update
            renderChart type
            return

          # it is not effect for the next updates if the highchart in a directive
          # set update-all to redraw all
          chart.series[0].update scope.config.series[0] if scope.config.series
          chart.setTitle(scope.config.title) if scope.config.title
          chart.setTitle(null, scope.config.subtitle) if scope.config.subtitle
          chart.colorAxis[0].update(scope.config.colorAxis) if chart.colorAxis && scope.config.colorAxis
          chart.xAxis[0].update(scope.config.xAxis) if chart.xAxis && scope.config.xAxis
          chart.yAxis[0].update(scope.config.yAxis) if chart.yAxis && scope.config.yAxis
      , true
