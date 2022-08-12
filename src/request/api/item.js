import service from "..";
// 歌单详情的获取
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
} 
// 歌单中歌曲的获取，这里只获取tracks，后续需要改进
export function getMusicComment(id){
    return service({
        method:'GET',
        url:`/comment/hot?id=${id}&type=0`
    })
}


export function getMusicLyric(id){
    return service({
        method:"GET",
        url:`/lyric?id=${id}`
    })
}