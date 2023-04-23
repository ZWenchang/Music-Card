const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const playBtn = document.getElementById("play")
const music = document.getElementById("music")


const audio = document.getElementById("audio")
const musicCover = document.getElementById("music-cover")
const title = document.getElementById("title")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")


const songs = ["Welcome_home","You're_beautiful","Closer"]    

let songIndex = 0;

loadSong(songs[songIndex])

function loadSong(song){
    title.innerHTML = song
    audio.src = `music/${song}.mp3`;
    musicCover.src = `img/${song}.jpg`;
}
//播放
function playSong(){
    music.classList.add("play")
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
//暂停
function pauseSong(){
    music.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause()
}
//前一首
function prevSong(){
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong()
}
//下一首
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}
// 进度条更新
function updateProgress(e) {
    // audio.duration: 音频长度
    // audio.currentTime: 音频播放位置
    // 对象解构操作
    const {
        duration,
        currentTime
    } = e.target;
    const progressPercent = (currentTime / duration) * 100
    // 进度条
    progress.style.width = `${progressPercent}%`
}
// 设置进度条
function setProgress(e) {
    // progressContainer代理视图宽度
    const width = this.clientWidth
    // 鼠标点击时处于progressContainer里的水平偏移量
    const clickX = e.offsetX

    // audio.duration: 音频长度
    const duration = audio.duration

    // audio.currentTime: 音频播放位置
    audio.currentTime = (clickX / width) * duration
}

prevBtn.onclick = prevSong
nextBtn.onclick = nextSong
playBtn.onclick = function () {
    // 判断当前是否是正在播放
    music.classList.contains('play') ? pauseSong() : playSong()
}

progressContainer.onclick = setProgress
// 3.2 进度条更新
audio.ontimeupdate = updateProgress
// 3.3 歌曲结束后自动下一首
audio.onended = nextSong