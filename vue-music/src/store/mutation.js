import * as type from './mutation-type'
const mutation = {
    [type.SET_MUSIC_MENU](state, musicMenu) {
        state.musicMenu = musicMenu
    },
    [type.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [type.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [type.SET_PLAYER_FULL_SCREEN](state, flag) {
        state.playerFullScreen = flag
    },
    [type.SET_PLAYER_LIST](state, list) {
        state.playerList = list
    },
    [type.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [type.SET_MODE](state, mode) {
        state.mode = mode
    },
    [type.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [type.SET_FIRSET_PLAY](state, audio) {
        state.audio = audio
    },
    [type.SET_TOP_ID](state, top) {
        state.topId = top
    },
    [type.SET_SEARCH_HISTORY](state, history) {
        state.searchHistory = history
    },
    [type.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [type.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    }
}
export default mutation