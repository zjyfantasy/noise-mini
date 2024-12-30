import * as echarts from '../ec-canvas/echarts';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    ecCurrent: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initChart(canvas, width, height, dpr, option) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    },
    currentChart(option) {
      this.setData({ ecCurrent: null })
      setTimeout(()=>{
        this.setData({
          ecCurrent: {
            onInit: (canvas, width, height, dpr) => this.initChart(canvas, width, height, dpr, option)
          },
        })
      },300)
    },
  },

  observers: {
    'option': function (option) {
      this.currentChart(option)
    },
  }
})
