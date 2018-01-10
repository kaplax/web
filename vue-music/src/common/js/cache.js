import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15 //最多存储15条
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function delFromArr(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        return arr.splice(index, 1)
    }
}
export function saveSearch(query) {
    let searchs = storage.get(SEARCH_KEY, [])
    insertArray(searchs, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searchs)
    return searchs
}
export function getLoadSearch() {
    return storage.get(SEARCH_KEY, [])
}

export function delHistory(query) {
    let searchs = storage.get(SEARCH_KEY, [])
    delFromArr(searchs, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searchs)
    return searchs
}

export function clear() {
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return songs.id === item.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function delFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    delFromArr(songs, (item) => {
        return song.id === item.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}


