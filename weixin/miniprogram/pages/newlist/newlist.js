// pages/newlist/newlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    list: [],
  },
  // 影院热映
  lodmoive1: function () {
    wx.cloud.callFunction({
      name: "newlist1",
      data: {
        start: this.data.list.length,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list: this.data.list.concat(obj.subjects)
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
        start: this.data.list.length,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list: this.data.list.concat(obj.subjects)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //电影Top250
  lodmoive3: function () {
    wx.cloud.callFunction({
      name: "newlist3",
      data: {
        start: this.data.list.length,
        count: 20
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        list: this.data.list.concat(obj.subjects)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    if (this.data.title == "影院热映") {
      this.lodmoive1();
    } else if (this.data.title == "即将上映") {
      this.lodmoive2();
    } else if (this.data.title == "电影Top250") {
      this.lodmoive3();
    } else {
      wx.showToast({
        title: '加载失败...',
        icon: 'loading',
        duration: 20000000000
      })
    }
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
    if (this.data.title == "影视热映") {
      this.lodmoive1();
    } else if (this.data.title == "即将上映") {
      this.lodmoive2();
    } else if (this.data.title == "电影Top250") {
      this.lodmoive3();
    } else {
      wx.showToast({
        title: '加载失败...',
        icon: 'loading',
        duration: 20000000000
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})