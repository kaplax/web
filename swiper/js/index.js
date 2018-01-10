class Swiper {
    constructor(dom, opt = {
        direction: 'horizontal',
        speed: 300
    }) {
        this.opt = opt
        this.swiper = document.querySelector(dom)
        this.swiperWrapper = this.swiper.querySelector('.swiper-wrapper')
        this.slides = this.swiperWrapper.querySelectorAll('.swiper-slide')
        this.slideBoundary = this.slides[0].clientWidth / 2
        this.slidesLength = [0]
        this.pageIndex = 0
        this.offsetTime = 300
        this.__init()
    }
    __init() {
        this.__getSlidesLength()
        this.__bindEvent()
    }
    __bindEvent() {
        let self = this
        let startX, startY, touchX, touchY, endX, endY, startTime, endTime
        this.swiperWrapper.addEventListener('transitionend', function () {
            this.style.transitionDuration = '0ms'
        })
        this.swiperWrapper.addEventListener('touchstart', function (e) {
            [startX, startY] = [e.touches[0].pageX, e.touches[0].pageY]
            startTime = new Date * 1
        })
        this.swiperWrapper.addEventListener('touchmove', function (e) {
            [touchX, touchY] = [e.touches[0].pageX, e.touches[0].pageY]
            if (self.opt.direction === 'horizontal') {
                self.__horizontalTouch({ startX, startY, touchX, touchY })
            }
        })
        this.swiperWrapper.addEventListener('touchend', function (e) {
            [endX, endY] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
            endTime = new Date * 1
            if (self.opt.direction === 'horizontal') {
                self.__isHorizontalOverslideBoundary({ startX, startY, endX, endY, startTime, endTime })
            }
        })
    }
    __horizontalTouch(touch) {
        let border = 50 //竖滑误差
        if (touch.startX > touch.touchX) { //向左滑动
            this.__moveLeft(-this.slidesLength[this.pageIndex] + touch.touchX - touch.startX)
        } else if (touch.startX < touch.touchX) {  //向右滑动
            this.__moveRight(-this.slidesLength[this.pageIndex] + touch.touchX - touch.startX)
        }
    }
    __moveLeft(left) {
        this.swiperWrapper.style.transform = `translate3d(${left}px,0,0)`
    }
    __moveRight(right) {
        this.swiperWrapper.style.transform = `translate3d(${right}px,0,0)`
    }
    __isHorizontalOverslideBoundary(touch) {
        if (Math.abs(touch.startX - touch.endX) < this.slideBoundary && (touch.endTime-touch.startTime>this.offsetTime)) { //未超过滑动界限,滑页回滚
            if (touch.startX - touch.endX > 0) { //向左滑动
                this.swiperWrapper.style.transitionDuration = this.opt.speed + 'ms'
                this.__moveRight(-this.slidesLength[this.pageIndex])
            } else if (touch.startX - touch.endX < 0) { //向右滑动
                this.swiperWrapper.style.transitionDuration = this.opt.speed + 'ms'
                this.__moveLeft(-this.slidesLength[this.pageIndex])
            }
        } else { //超过临界点,滑动至下一页
            if (touch.startX - touch.endX > 0) { //向左滑动
                this.swiperWrapper.style.transitionDuration = this.opt.speed + 'ms'
                this.pageIndex++
                this.__moveLeft(-this.slidesLength[this.pageIndex])
            } else if (touch.startX - touch.endX < 0) { //向右滑动
                this.pageIndex--
                this.swiperWrapper.style.transitionDuration = this.opt.speed + 'ms'
                this.__moveRight(-this.slidesLength[this.pageIndex])
            }
        }
    }
    __getSlidesLength() {
        let slides = Array.from(this.slides)
        let length = 0
        slides.map((item, index) => {
            length += item.clientWidth
            this.slidesLength.push(length)
        })
    }
}