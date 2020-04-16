// pages/aweather/aweather.js
var amapFile  = require('../../utils/amap-wx.js');
Page({

  data: {
    weather:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'1ce05d90fdac5624f5cfbf067c6025cb'});
    myAmapFun.getWeather({
      success: function(data){
        //成功回调
        console.log(data)
        that.setData({
          weather:data
        });
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  }

})