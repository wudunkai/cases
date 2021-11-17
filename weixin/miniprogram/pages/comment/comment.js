// pages/comment/comment.js
const db = wx.cloud.database({
  env: 'mingyue-mwfzi'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    text: '',
    movieid: '',
    // 名字
    nickName: '',
    // 头像
    avatarUrl: '',
    title: '',
  },
  submit: function () {
    wx.showLoading({
      title: '提交中',
    })
    console.log(this.data.nickName)
    db.collection("comment").add({
      data: {
        stars: this.data.value,
        comment: this.data.text,
        movieid: this.data.movieid,
        id: false,
        nickName: this.data.nickName,
        avatarUrl: this.data.avatarUrl,
        title: this.data.title
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
      console.log(res)
      wx.navigateTo({
        url: '/pages/getdetail/getdetail?details=' + this.data.movieid,
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  // 评分
  onChange: function (e) {
    this.setData({
      value: e.detail
    })
  },
  // 评论
  onChangemessage: function (e) {
    this.setData({
      text: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid: options.id
    })
    wx.setNavigationBarTitle({
      title: '评论'
    })
    wx.getUserInfo({
      success: (res => {
        let userInfo = res.userInfo
        let nickName = userInfo.nickName //名字
        let avatarUrl = userInfo.avatarUrl //头像
        this.setData({
          nickName: nickName,
          avatarUrl: avatarUrl
        })
      })
    })
    wx.cloud.callFunction({
      name: "getdetail",
      data: {
        movieid: this.data.movieid
      }
    }).then(res => {
      var obj = JSON.parse(res.result)
      this.setData({
        title: obj.title,
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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