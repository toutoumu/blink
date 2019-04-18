// import {config,fun1} from '../config.js'
// import 在这里只能使用相对路径
import {
    config
} from '../config.js'

const tips = {
    1: '抱歉出现了一个错误',
}

class HTTP {
    request({ url, data = {}, method = 'GET' }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            header: {
                'content-type': 'application/json'
            },
            method: method,
            data: data,
            // dataType: 'json',
            // responseType: 'text',
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    code = res.data.error_code
                    this._show_error(code)
                }
            },
            fail: (err) => {
                reject()
                console.log(err)
                this._show_error(1)
            },
            complete: (res) => { },
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code] ? tips[error_code] : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
}