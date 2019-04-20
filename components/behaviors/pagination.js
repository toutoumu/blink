const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
    },
    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        getCurrentStart() {
            return this.data.dataArray.length
        },
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },
        hasMore() {
            return this.data.total >= this.data.dataArray.length
        },
        initialize() {
            this.setData({
                dataArray: [],
                total: null,
                noneResult: false,
                loading: false
            })
        },
        locked() {
            return this.data.loading
        },
        lock() {
            this.setData({
                loading: true
            })
        },
        unlock() {
            this.setData({
                loading: false
            })
        }
    },
})

export { paginationBev }