// components/epsoide/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: String,
            observer: function (newVal, oldVal, path) {
                let res = newVal < 10 ? '0' + newVal : newVal.toString()
                this.setData({
                    _index: res
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月'],
        year: 0,
        month: '',
        _index: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    attached: function () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()

        this.setData({
            year: year,
            month: this.data.months[month]
        })
    }
})