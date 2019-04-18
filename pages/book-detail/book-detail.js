// pages/book-detail/book-detail.js
import { BookModel } from '../../models/Book.js'
import { LikeModel } from '../../models/Like.js';
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: null,
        comments: [],
        likeStatus: false,
        likeCount: 0,
        posting: false
    },
    onPost(event) {
        const comment = event.detail.text || event.detail.value
        if (!comment) {
            return
        }
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none',
                duration: 2000,
            });
            return
        }
        bookModel.onPost(this.data.book.id, comment).then(res => {
            wx.showToast({
                title: '成功',
                icon: 'none',
                duration: 1500,
            });
            // 添加一条短评
            this.data.comments.unshift({
                content: comment,
                nums: 1
            })
            // 更新数据
            this.setData({
                comments: this.data.comments,
                posting: false
            })
        })
    },
    onFackPost(event) {
        this.setData({
            posting: true
        })
    },
    cancel() {
        this.setData({
            posting: false
        })
    },
    onLike(e) {
        console.log('onlike');
        const likeOrCancel = e.detail.behavior
        likeModel.like(likeOrCancel, this.data.book.id, 400)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading();
        const bid = options.bid

        const detailPromis = bookModel.getDetail(bid)
        const commentsPromis = bookModel.getComments(bid)
        const statusPromis = bookModel.getLikeStatus(bid)

        Promise.all([detailPromis, commentsPromis, statusPromis]).then(res => {
            console.log(res);

            wx.hideLoading();
            this.setData({
                book: res[0],
                comments: res[1].comments,
                likeStatus: res[2].like_status,
                likeCount: res[2].fav_nums,
            })
        }).catch(error => {
            wx.hideLoading();
        })

        /* detailPromis.then(res => {
            console.log(res);
            this.setData({
                book: res
            })
        })
        commentsPromis.then(res => {
            console.log(res);
            this.setData({
                comments: res.comments
            })
        })
        statusPromis.then(res => {
            console.log(res);
            this.setData({
                likeStatus: res.like_status,
                likeCount: res.fav_nums,
            })
        }) */



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