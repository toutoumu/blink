// components/tag/index.js
Component({
    // 启用插槽必须加这个配置
    options: {
        multipleSlots: true,
    },
    // 外部样式,组件中可以使用, tag-class 添加这个(外部传进来的)样式,
    externalClasses: ['tag-class'],
    /**
     * 组件的属性列表
     */
    properties: {
        text: String,
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            this.triggerEvent('onTap', {
                text: this.properties.text
            }, {})
        }
    }
})
