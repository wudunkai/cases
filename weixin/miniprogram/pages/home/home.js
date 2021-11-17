// pages/home/home.js
const db = wx.cloud.database({
  env: 'mingyue-mwfzi'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    star: 0,
    thumb: 0,
    collection: '/pages/home/home',
    tracks: '/pages/home/home',
    openid: ''
  },
  ongetuserinfo: function (e) {
    let show = e.detail.errMsg
    let isshow = show.split(":").pop()
    if(isshow == 'ok'){
      this.setData({
        login:true,
        collection: '/pages/collection/collection',
        tracks: '/pages/tracks/tracks',
      })
    }else{
      this.setData({
        login:false,
      })
    }
  },
  me: function () {
    if(this.data.login == false) {
      wx.showToast({
        title: '请登录账号',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '书影音档案'
    })
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      this.setData({
        openid: res.result.openid
      })
    }).catch(err => {
      console.log(err)
    })
    db.collection("comment").where({
      movieid: this.data.detail
    }).get().then(res => {
      this.setData({
        comment: res.data
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSetting({
      success: res => {
        let isshow = res.authSetting['scope.userInfo']
        if (isshow) {
          this.setData({
            login: true,
            collection: '/pages/collection/collection',
            tracks: '/pages/tracks/tracks',
          })
        } else {
          this.setData({
            login: false,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection("list").where({
      _openid: this.data.openid
    }).get().then(res => {
      this.setData({
        star: res.data.length
      })
    }).catch(err => {
      console.log(err)
    })
    db.collection("comment").where({
      _openid: this.data.openid
    }).get().then(res => {
      this.setData({
        thumb: res.data.length
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})