// pages/mall/mall.js
const {
  formatDate,
  getDate
} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur: 'tab5',
    curType: 'tab1',
    cityDep: "北京",
    cityArr: "上海",
    // date: "10月25日",
    startDate: "2018-09-01",
    endDate: "2018-10-31",
    /* swiper */
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let date = new Date();
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 60);

    this.setData({
      date: getDate(date),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    })

    wx.requestPayment({
      'timeStamp': Date.now() + '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function(res) {},
      'fail': function(res) {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleChange: function({
    detail
  }) {
    this.setData({
      cur: detail.key
    });
  },
  handleChangeType: function({
    detail
  }) {
    this.setData({
      curType: detail.key
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: getDate(new Date(e.detail.value))
    })
  },
})