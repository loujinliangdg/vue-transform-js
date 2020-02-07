// miniprogram/pages/start.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirst:false,
    swiperItems: [
      {
        texts: [
          '你是否有些话想对ta说',
        ],
        bgColor: '#ff86b5'
      },
      {
        texts: [
          '曾几何时你想对ta说一些话,但不想让ta知道你是谁'
        ],
        bgColor: '#ff86b5'
      },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 450
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })
    this.onGetOpenid((openid) =>{
      const db = wx.cloud.database()
      // 查询当前用户所有的
      db.collection('user').where({
        _openid: openid
      }).get({
        success: res => {
          // 用户表里没这个用户，首次进来
          if (!res.data.length) {
            this.setData({
              isFirst:true,
            })
          }
          else {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
          console.log('[数据库] [查询记录] 成功: ', res)
          wx.hideLoading();
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },(err) =>{

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

  },
  /**
   * 获取用户openid
   */
  onGetOpenid: function (success, fail) {
    // 如果存在openid则直接返回
    if(app.globalData.openid){
      return success && success(app.globalData.openid);
    }
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        var openid = res.result.openid

        console.log('[云函数] [login] user openid: ', openid)

        app.globalData.openid = openid;
        success && success(openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        fail && fail(err);
      }
    })
  },
  /**
   * 开始体验小程序
   */
  nowStart() {
    wx.showLoading({
      title: '加载中...',
    })
    this.onGetOpenid((openid) => {
      const db = wx.cloud.database()
      db.collection('user').add({
        data: {
          headimguri: this.data.avatarUrl,
          isFirst: false,
        },
        success: res => {
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          wx.hideLoading()
          wx.redirectTo({
            url: '/pages/index/index',
          })
        },
        fail: err => {
          console.error('[数据库] [新增记录] 失败：', err)
          wx.hideLoading()
        }
      })
    }, () => {

    })
  },
})