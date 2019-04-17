// import {config,fun1} from '../config.js'
// import 在这里只能使用相对路径
import {
    config
} from '../config.js'

const tips = {
    1: '抱歉出现了一个错误',
}

class HTTP {
    request(params) {
        if (!params.method) {
            params.method = 'GET'
        }
        wx.request({
            url: config.api_base_url + params.url,
            data: params.data,
            header: {
                'content-type': 'application/json'
            },
            method: params.method,
            // dataType: 'json',
            // responseType: 'text',
            success: (res) => {

                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    if (params.success) {
                        params.success(res.data)
                    }
                } else {
                    let code = res.data.error_code
                    this._show_error(code)
                }
            },
            fail: (err) => {
                console.log(err)
                this._show_error(1)
            },
            complete: (res) => {},
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
}