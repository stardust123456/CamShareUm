var amapFile = require('../../utils/amap-wx.js');
var config = require('../../utils/config.js');
const app = getApp()
Page({ 
 /**
 * 页面的初始数据
 */
 data: {
 markers: [{
  iconPath: "http://chuantu.xyz/t6/728/1586785178x1033347913.png",
  id: 0,
  latitude: 39.989643,
  longitude: 116.481028,
  width: 23,
  height: 33
 }, {
  iconPath: "http://chuantu.xyz/t6/728/1586785178x1033347913.png",
  id: 0,
  latitude: 39.90816,
  longitude: 116.434446,
  width: 24,
  height: 34
 }],
 distance: '',
 cost: '',
 state: 0,
 polyline: []
 }, 
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function(options) {
 console.log(11);
 var that = this
 wx.showLoading({
  title: "定位中",
  mask: true
 })
 wx.getLocation({
  type: 'gcj02',
  altitude: true, //高精度定位
  success: function(res) {
  console.info(res);
  var latitude = res.latitude
  var longitude = res.longitude
  var speed = res.speed
  var accuracy = res.accuracy
  that.setData({
   markers: [{
   name: '当前位置',
   latitude: latitude,
   longitude: longitude
   }, {
   name: '您要去哪儿?',
   latitude: '',
   longitude: ''
   }]
  })
  },
  fail: function() {
  wx.showToast({
   title: "定位失败",
   icon: "none"
  })
  }, 
  complete: function() {
  wx.hideLoading()
  }
 })
 },
 getFormAddress: function() {
 var that = this;
 wx.chooseLocation({
  success: function(res) {
  console.log(res);
  var name = res.name
  var address = res.address
  var latitude = res.latitude
  var longitude = res.longitude
  var markesName = "markers[" + 0 + "].name";
  var markesLatitude = "markers[" + 0 + "].latitude";
  var markeslongitude = "markers[" + 0 + "].longitude";
  var markesiconPath = "markers[" + 0 + "].iconPath";
  that.setData({
   [markesName]: name,
   [markesLatitude]: latitude,
   [markeslongitude]: longitude,
   [markesiconPath]: "http://chuantu.xyz/t6/728/1586785178x1033347913.png"
  })
  console.log('address1', that.data);
  },
  fail: function() {
  wx.showToast({
   title: '定位失败',
   icon: "none"
  })
  },
  complete: function() {
  //隐藏定位中信息进度
  wx.hideLoading()
  }
 })
 }, 
 getToAddress: function() {
 var that = this;
 wx.chooseLocation({
  success: function(res) {
  console.log(res);
  var name = res.name
  var address = res.address
  var latitude = res.latitude
  var longitude = res.longitude
  var markesName = "markers[" + 1 + "].name";
  var markesLatitude = "markers[" + 1 + "].latitude";
  var markeslongitude = "markers[" + 1 + "].longitude";
  var markesiconPath = "markers[" + 1 + "].iconPath";
  that.setData({
   [markesName]: name,
   [markesLatitude]: latitude,
   [markeslongitude]: longitude,
   [markesiconPath]: "http://chuantu.xyz/t6/728/1586785178x1033347913.png"
  })
  console.log('address1', that.data);
  },
  fail: function() {
  wx.showToast({
   title: '定位失败',
   icon: "none"
  })
  },
  complete: function() {
  //隐藏定位中信息进度
  wx.hideLoading()
  }
 })
 },
 /**
 * 确定
 */
 getSure: function() {
 var that = this;
 var origin = that.data.markers[0].longitude + ',' + that.data.markers[0].latitude;
 var destination = that.data.markers[1].longitude + ',' + that.data.markers[1].latitude; 
 app.origin = origin;
 app.destination = destination;
 console.log('origin', origin);
 console.log('destination', destination);
 var key = config.Config.key;
 var myAmapFun = new amapFile.AMapWX({
  key: key
 });
 myAmapFun.getDrivingRoute({
  origin: origin,
  destination: destination,
  // origin: '116.481028,39.989643',
  // destination: '116.434446,39.90816',
  success: function(data) {
  var points = [];
  if (data.paths && data.paths[0] && data.paths[0].steps) {
   var steps = data.paths[0].steps;
   for (var i = 0; i < steps.length; i++) {
   var poLen = steps[i].polyline.split(';');
   for (var j = 0; j < poLen.length; j++) {
    points.push({
    longitude: parseFloat(poLen[j].split(',')[0]),
    latitude: parseFloat(poLen[j].split(',')[1])
    })
   }
   }
  }
  that.setData({
   state: 1,
   polyline: [{
   points: points,
   color: "#0091ff",
   width: 6
   }]
  });
  if (data.paths[0] && data.paths[0].distance) {
   that.setData({
   distance: data.paths[0].distance + '米'
   });
  }
  if (data.taxi_cost) {
   that.setData({
   cost: '步行约' + parseInt(data.taxi_cost) + '分钟'
   });
  }
  console.log('that', that);
  }
 })
 },
 /**
 * 详情页
 */
 goDetail: function() {
 var that = this;
 wx.navigateTo({
  url: '../detail/detail'
 })
 } 
})　