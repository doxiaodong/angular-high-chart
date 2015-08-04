myApp
  .directive 'highChart', ->
    restrict: 'AE'
    scope:
      config: '='
    link: (scope, element, attr) ->
      Highcharts.setOptions(
        global:
          useUTC: false
      )
      type = attr.type.toLocaleLowerCase()
      update = attr.updateAll != undefined
      chart = null

      # 使用以下配置在你的配置准备好之前
      defaultConfig =
        chart:
          renderTo: attr.id
          backgroundColor: 'transparent'
        credits:
            href: 'http://www.darlin.me/'
            text: 'www.darlin.me'
        rangeSelector:
          inputEnabled: false
          selected: 0
          enabled: false
        series: [
          {
            data: [0]
          }
        ]

      renderChart = (type) ->
        if type == 'map'
          if scope.config
            chart = new Highcharts.Map scope.config
          else
            chart = new Highcharts.Map defaultConfig
        if type == 'chart'
          if scope.config
            chart = new Highcharts.Chart scope.config
          else
            chart = new Highcharts.Chart defaultConfig
        if type == 'stock'
          if scope.config
            chart = new Highcharts.StockChart scope.config
          else
            chart = new Highcharts.StockChart defaultConfig

      renderChart type

      scope.$watch 'config', (newValue, oldValue)->
        if newValue != oldValue && scope.config

          # 如果要更新rangeSelector 设置 update-range-selector
          if type == 'stock' && update
            chart = new Highcharts.StockChart scope.config
            return
          if type == 'chart' && update
            chart = new Highcharts.Chart scope.config
            return
          if type == 'map' && update
            chart = new Highcharts.Map scope.config
            return

          chart.series[0].update scope.config.series[0] if scope.config.series
          chart.setTitle(scope.config.title) if scope.config.title
          chart.setTitle(null, scope.config.subtitle) if scope.config.subtitle
          chart.colorAxis[0].update(scope.config.colorAxis) if chart.colorAxis && scope.config.colorAxis
          chart.xAxis[0].update(scope.config.xAxis) if chart.xAxis && scope.config.xAxis
          chart.yAxis[0].update(scope.config.yAxis) if chart.yAxis && scope.config.yAxis