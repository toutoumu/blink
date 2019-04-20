// pages/my/my.js
import { BookModel } from '../../models/Book.js'
const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: '',
        classics: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSetting({
            success: (result) => {
                if (result.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (result) => {
                            this.setData({
                                userInfo: result.userInfo,
                                authorized: true
                            })
                        }
                    });
                }
            }
        });
        bookModel.getMyBookcount().then(res => {
            this.setData({
                myBooksCount: res
            })
        })
        bookModel.getHotList().then(res => {
            this.setData({
                classics:res
            })
        })

    },
    onGetUserInfo(event) {
        console.log(event.detail);

        this.setData({
            userInfo: event.detail.userInfo,
            authorized: event.detail.userInfo
        })
        console.log(event.detail.userInfo);
    },
    onJumpToAbout() {
        wx.navigateTo({
            url: '/pages/about/about'
        });
    },
    onStudy() {
        wx.navigateTo({
            url: '/pages/course/course'
        });
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