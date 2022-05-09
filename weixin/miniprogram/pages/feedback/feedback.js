// pages/feedback/feedback.js
const db = wx.cloud.database({
  env: 'mingyue-mwfzi'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "", //留言
    value: "" //联系方式
  },
  submit: function () {
    //提交中
    wx.showLoading({
      title: '提交中',
    })
    db.collection("feedback").add({
      data: {
        message: this.data.message,//意见
        value: this.data.value //联系方式
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  // 留言
  onChangemessage: function (e) {
    this.setData({
      message: e.detail
    })
  },
  // 联系方式
  onChangevalue: function (e) {
    this.setData({
      value: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈'
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