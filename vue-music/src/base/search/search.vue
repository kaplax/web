<template>
    <div class="search-box">
        <div class="search-input">
            <div class="search-btn">
                <i class="icon">search</i>
            </div>
            <input v-model="query" type="text" name="" id="" :placeholder="placeholder" ref="query">
            <label v-show="query" class="close" @click="clear">
                <i class="icon">close</i>
            </label>
        </div>
        <p class="cancel" @click="cancel">取消</p>
    </div>
</template>
<script>
import {debounce} from '@/common/js/util'
export default {
    props: {
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    data() {
        return {
            query: ''
        }
    },
    methods: {
        clear() {
            this.query = ''
        },
        setQuery(query) {
            this.query = query
        },
        cancel() {
            this.$emit('cancel')
        },
        blur() {
            this.$refs.query.blur()
        }
    },
    created() {
        this.$watch('query', debounce((newQuery)=>{
            this.$emit('query', newQuery)
        },200))
    }
}
</script>
<style lang="less" scoped>
@import '~@/common/less/minix';
input{
    outline: none;
}
.search-box{
    width: 100%;
    box-sizing: border-box;
    padding: @comm-padding;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .search-input{
        height: 36px;
        display: flex;
        flex-basis: 85%;
        .search-btn{
            width: 36px;
            border: 1px solid @color-text-d;
            border-right:none;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 15%;
            border-radius: 5px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            background-color: @background-color-default;
        }
        .close{
            display: flex;
            align-items: center;
            margin-left: -28px;
        }
        input{
            border-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            height: 100%;
            box-sizing: border-box;
            padding: 10px;
            width: 252px;
            border: 1px solid @color-text-d;
            width: 100%;
            -webkit-appearance: none;
            font-size:@font-size-medium;
        }
    }
    .cancel{
        font-size:@font-size-medium-x;
        background-color: @background-color-default;
    }
}
</style>

