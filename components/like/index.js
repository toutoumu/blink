// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean, // 类型
            value: false, // 默认值
            observer: function() { // 监听

            }
        },
        count: {
            type: Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // like: true,
        // count: 99,
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(event) {
            let like = this.properties.like
            let count = this.properties.count
            like ? count-- : count++

                // 更新页面数据
                this.setData({
                    like: !like,
                    count: count
                })
            let behavior = this.properties.like ? 'like' : 'cancel'
            this.triggerEvent('like', {
                behavior: behavior
            }, {})
        }
    }
})