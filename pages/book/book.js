// pages/book/book.js
import { BookModel } from '../../models/Book.js'
import { random } from '../../util/common.js'
const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        searching: false,
        more: ''
    },
    onSearch() {
        this.setData({
            searching: true
        })
    },
    onCancel() {
        this.setData({
            searching: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const hostList = bookModel.getHotList()
        hostList.then(res => {
            this.setData({
                books: res
            })
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
    // 滑动到底部监听
    onReachBottom() {
        // 滑动到底部加载更多
        this.setData({
            more: random(16)
        })
    }
})