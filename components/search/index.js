// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/Book.js';
import { paginationBev } from '../behaviors/pagination.js'

const keyModel = new KeywordModel()
const bookModel = new BookModel()
Component({
    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: 'loadMore' // 这里填方法名称
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        searching: false,
        historyWords: [],
        hotWords: [],
        keyword: '',
        loading: false,
        loadingCenter: true
    },
    attached() {
        this.setData({
            historyWords: keyModel.getHistory()
        })

        keyModel.getHot().then(res => {
            this.setData({
                hotWords: res
            })
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.triggerEvent('onCancel', {
            }, {})
        },
        onClear() {
            this.initialize()
            this.setData({
                searching: false,
                keyword: ''
            })
            this.triggerEvent('onClear', {
            }, {})
        },
        onConfirm(event) {
            const word = event.detail.value || event.detail.text
            if (!word) return
            this.initialize()
            this.setData({
                searching: true,
                loadingCenter: true,
                keyword: word
            })
            bookModel.search(0, word).then(res => {
                keyModel.addToHistory(word)
                this.setTotal(100)
                this.setMoreData(res)
                this.setData({
                    loadingCenter: false
                })
            }, () => {
                this.setData({
                    searching: false,
                    loadingCenter: false
                })
            })
        },

        loadMore() {
            if (this.data.loading) return // 加载中
            if (!this.hasMore()) return // 没有更多
            if (!this.data.keyword) return // 没有搜索关键字不触发搜索

            this.setData({
                loading: true
            })
            bookModel.search(this.getCurrentStart(), this.data.keyword).then(res => {
                this.setData({
                    loading: false
                })
                this.setMoreData(res)
            }, () => {// 调用失败
                this.setData({
                    loading: false
                })
            })
        }
    }
})
