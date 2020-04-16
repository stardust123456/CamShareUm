var amapFile = require('../../utils/amap-wx.js');
var config = require('../../utils/config.js');
const app = getApp()
Page({
 data: {
 steps: {}
 },
 onLoad: function () {
 var that = this;
 var key = config.Config.key;
 var myAmapFun = new amapFile.AMapWX({ key: key });
 myAmapFun.getDrivingRoute({
  origin: app.origin,
  destination: app.destination,
  success: function (data) {
  if (data.paths && data.paths[0] && data.paths[0].steps) {
   that.setData({
   steps: data.paths[0].steps
   });
  }
  },
  fail: function (info) {
  }
 })
 }
})