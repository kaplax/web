<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in data" :key="index">
            <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
            </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    props:{
        data: {
            type:Array,
            default: ()=>{return []}
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                },
            }
        }
    },
    mounted() {
        this.$refs.mySwiper.swiper.pagination.$el.addClass('custom-pagination')
    },
    created() {
    }
}
</script>
<style lang="less" >
@import "~@/common/less/variable";
.custom-pagination {
  span.swiper-pagination-bullet-active {
    background-color: @background-color-black;
  }
}
</style>



