Page({
    data: {
        files: [],
        status:false
    },
    close:function(){
      this.setData({
        status:true
      })
    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
              //console.log(that.urlTobase64(res.tempFilePaths[0]))
              console.log('files', res.tempFilePaths[0])
              wx.uploadFile({
                url: 'http://localhost:3001/index/upload', 
                filePath: res.tempFilePaths[0],
                name: 'file',
                success: function (res) {
                  var data = res.data
                  //do something
                  console.log(data)
                }
              })

            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    urlTobase64(url) {
      wx.request({
        url: url,
        responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
        success: res => {
          console.log('res')
          let base64 = wx.arrayBufferToBase64(res); //把arraybuffer转成base64
          base64 　= 'data:image/jpeg;base64,' + base64　//不加上这串字符，在页面无法显示的哦
          console.log(base64)　//打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
        }
      })
    }
});