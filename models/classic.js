import {
    HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        // let promise = new Promise()
        this.request({
            url: '/classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                wx.setStorageSync(this._getKey(res.index), res);
            }
        })
    }

    getClassic(index, nextOrPrevious, sCallback) {
        let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                // url: '/classic/' + index + '/' + nextOrPrevious,
                url: `/classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res)
                }
            })
        } else {
            sCallback(classic)
        }
    }

    /* getNext(index, sCallback) {
        this.request({
            url: '/classic/' + index + '/next',
            success: (res) => {
                sCallback(res)
            }
        })
    }

    getPrevious(index, sCallback) {
        this.request({
            url: '/classic/' + index + '/previous',
            success: (res) => {
                sCallback(res)
            }
        })
    } */
    /* 是不是最老的一期 */
    isFirst(index) {
        return index == 1 ? true : false
    }
    /* 是不是最新一期 */
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return index == latestIndex ? true : false
    }

    /* 保存最新一期的索引 */
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }

    /* 获取最新一期的索引 */
    _getLatestIndex() {
        return wx.getStorageSync('latest');
    }

    _getKey(index) {
        let key = 'classic-' + index
        return key
    }
}

export {
    ClassicModel
}