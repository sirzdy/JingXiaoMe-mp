/*
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World1',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
*/
const config = require('../../config.js')
let col1H = 0;
let col2H = 0;
wx.setNavigationBarTitle({
  title: '京小蜜旅行'
})
Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    swiperImgs: [
      config.server + 'images/1.jpg',
      config.server + 'images/2.jpg',
      config.server + 'images/3.jpg'
    ],
  },

  onLoad: function() {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.loadImages();
      }
    })
  },
  clickMe: function() {
    /*wx.getLocation({
            type: 'wgs84',
            success: (res) => {
            var latitude = res.latitude // 经度
            var longitude = res.longitude // 纬度
            this.setData({
            latitude,
            longitude
            })
        }
    })*/
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  video: function() {
    /*wx.previewImage({
        current: 'http://localhost:3000/images/1.jpg', // 当前显示图片的http链接
        urls: ['http://localhost:3000/images/1.jpg','http://localhost:3000/images/1.jpg'] // 需要预览的图片http链接列表
    })*/
    wx.showLoading({
      title: 'ddd'
    })
  },
  sCan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onImageLoad: function(e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW; //比例计算
    let imgHeight = oImgH * scale; //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function() {
    let images = [{
        pic: "images/1.jpg",
        height: 0
      },
      {
        pic: "images/2.jpg",
        height: 0
      },
      {
        pic: "images/3.jpg",
        height: 0
      },
      {
        pic: "images/4.jpg",
        height: 0
      },
      {
        pic: "images/5.jpg",
        height: 0
      },
      {
        pic: "images/6.jpg",
        height: 0
      },
      {
        pic: "images/7.jpg",
        height: 0
      },
      {
        pic: "images/8.jpg",
        height: 0
      },
      {
        pic: "images/9.jpg",
        height: 0
      },
      {
        pic: "images/10.jpg",
        height: 0
      },
      {
        pic: "images/11.jpg",
        height: 0
      },
      {
        pic: "images/12.jpg",
        height: 0
      },
      {
        pic: "images/13.jpg",
        height: 0
      },
      {
        pic: "images/14.jpg",
        height: 0
      },
      {
        pic: "images/15.jpg",
        height: 0
      },
      {
        pic: "images/16.jpg",
        height: 0
      },
      {
        pic: "images/17.jpg",
        height: 0
      },
      {
        pic: "images/18.jpg",
        height: 0
      },
      {
        pic: "images/19.jpg",
        height: 0
      }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
      images[i].pic = config.server + images[i].pic
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }

})