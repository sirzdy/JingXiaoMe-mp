// pages/record.js
const recorderManager = wx.getRecorderManager()
const options = {
  duration: 60000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 44100,
  format: 'mp3',
  frameSize: 50
}




Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordText: '按住说话',
    searchText: '默认文本',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.startTime = 0;
    that.endTime = 0;
    recorderManager.onStart(() => {
      console.log('recorder start')
      that.startTime = Date.now();
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      that.endTime = Date.now();
      if (that.endTime - that.startTime < 1000) {
        this.setData({
          'recordText': '时间太短，请重试'
        })
        return;
      }
      const {
        tempFilePath
      } = res
      wx.uploadFile({
        url: 'http://127.0.0.1:3000/upload',
        filePath: tempFilePath,
        name: 'file',
        success(res) {
          console.log(res);
          let data = JSON.parse(res.data);
          if (data.state) {
            let text = data.text[0].slice(0, -1)
            if (text.length) {
              that.setData({
                recordText: '按住说话',
                searchText: text
              })
            } else {
              that.setData({
                recordText: '内容为空，请重试',
                searchText: text
              })
            }
          } else {
            that.setData({
              recordText: '识别失败，请重试'
            })
          }
        },
        fail(err) {
          console.log(err);
          that.setData({
            recordText: '识别失败，请重试'
          })
        }
      });
    })
    recorderManager.onFrameRecorded((res) => {
      const {
        frameBuffer
      } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
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
  startRecord: function() {
    recorderManager.start(options)
  },
  stopRecord: function() {
    recorderManager.stop()
  },
  recordStart: function() {
    this.setData({
      recordText: '松手查询'
    })
    recorderManager.start(options)
  },
  recordEnd: function() {
    this.setData({
      recordText: '识别中...'
    })
    recorderManager.stop()
  }
})