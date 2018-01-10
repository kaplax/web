import * as types from './muntation-type'
const matutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_SONG](state, song) {
        state.song = song
    }
}
export default matutations