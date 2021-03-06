// pages/tracks/tracks.js
const db = wx.cloud.database({
  env: 'mingyue-mwfzi'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的足迹'
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
    db.collection("comment").where({
      _openid: this.data.openid
    }).get().then(res => {
      this.setData({
        list: res.data
      })
      console.log(res.data)
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