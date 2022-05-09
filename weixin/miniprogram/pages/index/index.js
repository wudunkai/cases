// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list1: [],
    list2: [],
    list3: []
  },
  // 影视热映
  lodmoive1: function () {
    wx.cloud.callFunction({
      name: "newlist1",
      data: {
        start: 0,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list1: obj.subjects
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 即将上映
  lodmoive2: function () {
    wx.cloud.callFunction({
      name: "newlist2",
      data: {
        start: 0,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list2: obj.subjects
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 电影Top250
  lodmoive3: function () {
    wx.cloud.callFunction({
      name: 'newlist3',
      data: {
        start: 0,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list3: obj.subjects
      })
    }).catch(err => { 
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#44b549',
    })
    this.lodmoive1();
    this.lodmoive2();
    this.lodmoive3();
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