// pages/getdetail/getdetail.js
const db = wx.cloud.database({
  env: 'mingyue-mwfzi'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户id
    openid: '',
    detail: 0,
    info: [],
    desc: '展示',
    descheight: '',
    login: '',
    // 影人
    filmmaker: [],
    // 预告片/剧情
    photos: [],
    // 收藏
    like: true,
    _id:"",
    // 评论
    star: true,
    // 展示评论
    comment: [],
  },
  // 收藏
  collection1: function () {
    if(this.data.login == false){
      wx.switchTab({
        url: '/pages/home/home',
      })
    }else if (this.data.login == true){
      wx.showLoading({
        title: '收藏中',
      })
      if(this.data.detail==this.data.detail){
        db.collection("list").add({
          data: {
            detail: this.data.detail,
            like: false,
            image: this.data.info.images.small,
            name: this.data.info.title,
            stars: this.data.info.rating.average
          }
        }).then(res =>{
          wx.hideLoading()
          wx.showToast({
            title: '收藏成功',
          })
          this.setData({
            like: false
          })
          db.collection("list").where({
            detail: this.data.detail
          }).get().then(res => {
            this.setData({
              _id: res.data[0]._id
            })
          }).catch(err => {
            console.log(err)
          }) 
        }).catch(err=>{
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: '收藏失败',
          })
        })
      }
    } 
  },
  // 取消收藏
  collection2: function () {
    if(this.data.like == false){
      var _id = this.data._id
      db.collection("list").doc(_id).remove().then(res => {
        wx.showToast({
          title: '取消收藏',
        })
        this.setData({
          like: true
        })      
      }).catch(err=>{
        wx.showToast({
          title: '取消失败',
        })
      })
    }
  },
  // 评论
  comment1: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })
  },
  // 已评论
  comment2: function () {
    wx.showToast({
      title: '已经评论了',
    })
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index
    var photos = this.data.photos;
    for(var i=0,imgarr=[];i<photos.length;i++){
      imgarr.push(photos[i].cover)
    }
    wx.previewImage({
      current: photos[index].cover,
      urls: imgarr,
      success:function(res) {},
      fail:function(res) {},
      complete:function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detail: options.details,
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getdetail",
      data: {
        movieid: this.data.detail
      }
    }).then(res => {
      var obj = JSON.parse(res.result)
      this.setData({
        info: obj,
        // 影人
        filmmaker: obj.casts,
        // 预告片/剧照
        photos: obj.photos,
      })
      wx.setNavigationBarTitle({
        title: obj.title
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
    // 页面初始
    db.collection("list").where({
      detail: this.data.detail
    }).get().then(res => {
      this.setData({
        like: res.data[0].like,
        _id: res.data[0]._id
      })
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
    // 全部评论
    db.collection("comment").where({
      movieid: this.data.detail 
    }).get().then(res => {
      this.setData({
        comment: res.data
      })
    }).catch(err => {
      console.log(err)
    })
    // 不同用户评论
    db.collection("comment").where({
      _openid: this.data.openid , movieid: this.data.detail
    }).get().then(res => {
      this.setData({
        star: res.data[0].id
      })
    }).catch(err => {
      console.log(err)
    })
    // 获取openid
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