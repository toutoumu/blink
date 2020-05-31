// pages/classic/classic.js
// import 在这里只能使用相对路径
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/Like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
    // like 模块触发的自定义事件
    onLick(event) {
        const behavior = event.detail.behavior
        likeModel.like(behavior, this.data.classics.id, this.data.classics.type)
    },
    onNext() {
        this._updateClassic('next')
    },
    onPrevious() {
        wx.getUserInfo({
            success:res=>{

            }
        })
        this._updateClassic('previous')
    },
    // 获取文章
    _updateClassic(nextOrPrevious) {
        let index = this.data.classics.index
        classicModel.getClassic(index, nextOrPrevious, (res) => {
            this._getLikeStatus(res.id, res.type)
            this.setData({
                classics: res,
                latest: classicModel.isLatest(res.index),
                first: classicModel.isFirst(res.index)
            })
        })
    },
    // 获取文章状态
    _getLikeStatus: function (artID, category) {
        likeModel.getClassicLikeStatus(artID, category, (res) => {
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            })
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        classics: null,
        latest: true,
        first: false,
        likeCount: 0,
        likeStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicModel.getLatest((res) => {
            // 必须使用setData才能更新页面数据
            // this._getLikeStatus(res.id, res.type)

            this.setData({
                // ...res 扩展运算符
                classics: res,
                likeCount: res.fav_nums,
                likeStatus: res.like_status
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
    onHide: function () { },

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
})