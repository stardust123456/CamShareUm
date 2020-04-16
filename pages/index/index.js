//引入创建的promise方法
import { request } from "../../request/index.js"
Page({
  data: {
    // 轮播图数组
    swipterList:[],
    navigatorLists:[]
  },
  //页面开始加载时触发的事件
  /*
  1.可以使用promise进行优化
  */
  onLoad: function(options){
    // wx.request({
    //   // 轮播图接口
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   success: (result)=>{
    //     this.setData({
    //       swipterList:result.data.message
    //     })
    //   }
    // });
  this.getSwiperList();
  this.getNavigatorLists();
  },
  // 获取轮播图渲染
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result=>{
      this.setData({
        swipterList:result.data.message
      })
    })
    // .then(),方便用于上述请求成功之后，继续发送请求
  },
  // 获取导航栏渲染
  getNavigatorLists(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
      this.setData({
        navigatorLists:result.data.message
      })
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});