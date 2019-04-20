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
        loadingCenter: false
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
            this.initialize()
            this.triggerEvent('onCancel', {}, {})
        },
        onClear() {
            this.initialize()
            this.setData({
                searching: false,
                keyword: ''
            })
        },
        onConfirm(event) {
            const word = event.detail.value || event.detail.text
            if (!word) return

            this.setData({
                searching: true,
                loadingCenter: true, // 显示加载中
                keyword: word // 搜索关键字
            })

            bookModel.search(0, word).then(res => {
                keyModel.addToHistory(word) // 保存搜索历史
                this.setTotal(word == 'aaa' ? 0 : 100)
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
            if (!this.data.keyword) return // 没有搜索关键字不触发搜索
            if (this.locked()) return // 加载中
            if (!this.hasMore()) return // 没有更多

            this.lock()
            bookModel.search(this.getCurrentStart(), this.data.keyword).then(res => {
                this.unlock()
                this.setMoreData(res)
            }, () => {// 调用失败
                this.unlock()
            })
        }
    }
})
