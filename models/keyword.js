import {
    HTTP
} from '../util/http-p.js'

class KeywordModel extends HTTP {

    key = 'q'
    macLength = 10

    getHot() {
        return this.request({
            url: '/classic/hot_keyword'
        })
    }

    addToHistory(keyword) {
        let words = this.getHistory()
        const has = words.includes(keyword)
        if (!has) {
            if (words.length >= this.macLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words);
        }
    }

    getHistory() {
        const words = wx.getStorageSync(this.key);
        if (!words) {
            return []
        }
        return words
        // return wx.getStorageSync(this.key) || [];
    }
}

export { KeywordModel }