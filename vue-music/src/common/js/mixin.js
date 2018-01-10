import {mapGetters,mapActions} from 'vuex'
export const playerlistMixin = {
    computed: {
        ...mapGetters([
            'playerList',
            'favoriteList'
        ])
    },
    mounted() {
        this.handlePlayerlist(this.playerList)
    },
    activated() {

    },
    watch: {
        playerList(newVal) {
            this.handlePlayerlist(newVal)
        }
    },
    methods: {
        handlePlayerlist() {
            throw new Error('component must implement handlePlayerlist method')
        },
        getFavoriteIcon(song) {
            if(this.isFavorite(song)){
                return 'icon-favorite-active'
            }
            return ''
        },
        toggleFavorite(song) {
            if(this.isFavorite(song)){
                this.delFavoriteList(song)
            }else{
                this.saveFavoriteList(song)
            }
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item)=>{
                return item.id === song.id
            })
            return index > -1
        },
        ...mapActions([
            'saveFavoriteList',
            'delFavoriteList'
        ])
    }
}