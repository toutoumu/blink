import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager();

Component({
    /**
     * 组件的属性列表
     */
    // 使用 behaviors 这里替代 properties
    behaviors: [classicBeh],
    properties: {
        // img: String,
        // content: String
        src: {
            type: String,
            observer: function (newVal, oldVal, path) {
                // 如果组件的播放src改变判断一下,以免组件复用导致没有更新状态
                this._recoverStatus()
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        pauseSrc: 'images/player@playing.png',
        playSrc: 'images/player@waitting.png'
    },
    attached(event) {
        this._recoverStatus()
        this._monitorSwitch()
    },
    detached(event) { },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            if (!this.data.playing) {
                this.setData({
                    playing: true
                })
                mMgr.title = this.properties.content
                mMgr.src = this.properties.src
            } else {
                this.setData({
                    playing: false
                })
                mMgr.pause()
            }
        },
        _recoverStatus() {
            // 如果音乐已经停止了
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            // 如果播放器,播放的地址与,当前组件的音乐地址相同那么是播放中
            this.setData({
                playing: mMgr.src == this.properties.src
            })

        },
        _monitorSwitch() {
            mMgr.onPlay(() => {
                this._recoverStatus()
            })
            mMgr.onPause(() => {
                this._recoverStatus()
            })
            mMgr.onStop(() => {
                this._recoverStatus()
            })
            mMgr.onEnded(() => {
                this._recoverStatus()
            });

        }
    }

})