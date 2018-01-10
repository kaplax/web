class Swiper {
    constructor(dom, opt = {
        direction: 'horizontal',
        speed: 300
    }) {
        this.dom = dom
        this.opt = opt
        this.slideLength = [0]//每个滑动元素距离 
        this.pageIndex = 0
        this.__init()
    }
    bindEvent() {
        let self = this
        let startX, startY, endX, endY, touchX, touchY
        this.slides = Array.from(document.querySelectorAll('.swiper-slide'))
        this.slide = document.querySelector('.swiper-slide')
        this.swiperWrapper = document.querySelector('.swiper-wrapper')
        this.boundary = window.innerWidth / 2
        this.elWidth = this.slide.clientWidth;
        this.swiperWrapper.addEventListener('transitionend', function () {
            this.style.transitionDuration = '0ms'
        })
        let length = 0
        this.slides.map((item, index) => {
            if (self.opt.direction === 'horizontal') {
                length += item.clientWidth
                self.slideLength.push(length)
            }
            item.addEventListener('touchstart', function (e) {
                [startX, startY] = [e.touches[0].pageX, e.touches[0].pageY]
            })
            item.addEventListener('touchmove', function (e) {
                [touchX, touchY] = [e.touches[0].pageX, e.touches[0].pageY]
                if (self.opt.direction === 'vertical') {
                    self.__touchEventVertical(this, startY - touchY)
                } else if (self.opt.direction === 'horizontal') {
                    self.__touchEventHorizontal(this, startX - touchX)
                }
            })
            item.addEventListener('touchend', function (e) {
                [endX, endY] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
                if (self.opt.direction === 'horizontal') {
                    self.__touchEventEnd(e, startX, endX)
                }
            })
        })
    }
    __init() {
        this.bindEvent()
        
    }
    __getElem() {
        document.querySelector(dom)
    }
    __touchEventVertical(e, touchY) {
        this.swiperWrapper.style.transform = `translate3d(0,${-touchY}px,0)`
    }
    __touchEventHorizontal(e, touchX, isEnd) {
        if (isEnd) {
            this.swiperWrapper.style.transitionProperty = 'transform,-webkit-transform'
            this.swiperWrapper.style.transitionDuration = this.opt.speed + 'ms'
            this.swiperWrapper.style.transform = `translate3d(${-touchX}px,0,0)`            
        }else{
            console.log(this.slideLength[this.pageIndex]+-touchX)
            this.swiperWrapper.style.transform = `translate3d(${ this.slideLength[this.pageIndex]+-touchX}px,0,0)`                                
        }
    }
    __touchEventEnd(e, startX, endX) {
        //判断滑动是否超过滑叶临界点
        if (Math.abs(startX - endX) < this.boundary) {//未过临街点,页面滑回页面
            this.__touchEventHorizontal(e.target, this.slideLength[this.pageIndex], true)
        } else { //超过临界点,页面滑动至下一页
            // 判断向左还是向右滑动
            if (startX - endX > 0) { //向左滑动,页面滑动至下一页
                if (this.pageIndex >= 0) {
                    this.pageIndex++
                    this.__touchEventHorizontal(e.target, this.slideLength[this.pageIndex], true)
                }
            } else if (startX - endX < 0) { //向右滑动,页面滑动至上一页
                if(!this.pageIndex===0){
                    this.pageIndex--
                    this.__touchEventHorizontal(e.target, this.slideLength[this.pageIndex], true)                    
                }   
            }
        }
    }

}