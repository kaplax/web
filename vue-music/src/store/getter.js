
export const musicMenu = state => state.musicMenu
export const singer = state => state.singer
export const playing = state => state.playing
export const playerFullScreen = state => state.playerFullScreen
export const playerList = state => state.playerList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = state => state.playerList[state.currentIndex] || {}
export const topId = state => state.topId
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList