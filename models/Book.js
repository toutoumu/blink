import {
    HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {

    getHotList() {
        return this.request({
            url: '/classic/hot_list'
        })
    }

    getMyBookcount() {
        return this.request({
            url: '/book/favor/count'
        })
    }

    getDetail(bid) {
        return this.request({
            url: `/book/${bid}/detail`
        })
    }
    getLikeStatus(bid) {
        return this.request({
            url: `/book/${bid}/favor`
        })
    }

    getComments(bid) {
        return this.request({
            url: `/book/${bid}/short_comment`
        })
    }

    onPost(bid, comment) {
        return this.request({
            url: '/book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}

export {
    BookModel
}