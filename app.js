// Khai báo biến
const $ = document.querySelector.bind(document);
const playlist = $('.playlist');
const currentSongName = $('.current-song-name');
const cdThumb = $('.cd-thumb');
const togglePlayBtn = $('.btn.btn-toggle-play');
const playBtn = $('.icon-play');
const pauseBtn = $('.icon-pause');
const repeatBtn = $('.btn.btn-repeat');
const randomBtn = $('.btn.btn-random');
const audio = $('#audio');


// Đối tượng chứa toàn bộ chức năng của ứng dụng
var app = {
    currentSongIndex: 0,
    songs: [
        {
            "name": "Âm Thầm Bên Em",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/1.png",
            "audio": "./assest/audio/1.mp3"
        },
        {
            "name": "Anh Không Sao Đâu",
            "singer": "Chi Dân",
            "image": "./assest/img/2.png",
            "audio": "./assest/audio/2.mp3"
        },
        {
            "name": "Bay Giữa Ngân Hà",
            "singer": "Nam Cường",
            "image": "./assest/img/3.png",
            "audio": "./assest/audio/3.mp3"
        },
        {
            "name": "Câu Hẹn Câu Thề",
            "singer": "Đình Dũng",
            "image": "./assest/img/4.png",
            "audio": "./assest/audio/4.mp3"
        },
        {
            "name": "Cơn Mưa Ngang Qua",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/5.png",
            "audio": "./assest/audio/5.mp3"
        },
        {
            "name": "Đom Đóm",
            "singer": "Jack",
            "image": "./assest/img/6.png",
            "audio": "./assest/audio/6.mp3"
        },
        {
            "name": "Dừng Thương",
            "singer": "DatKaa",
            "image": "./assest/img/7.png",
            "audio": "./assest/audio/7.mp3"
        },
        {
            "name": "Em Của Ngày Hôm Qua",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/8.png",
            "audio": "./assest/audio/8.mp3"
        },
        {
            "name": "Em Luôn Ở Trong Tâm Trí Anh",
            "singer": "The Men",
            "image": "./assest/img/9.png",
            "audio": "./assest/audio/9.mp3"
        },
        {
            "name": "Già Cùng Nhau Là Được",
            "singer": "Tùng TeA ft. PC",
            "image": "./assest/img/10.png",
            "audio": "./assest/audio/10.mp3"
        },
        {
            "name": "Im Lặng",
            "singer": "LK",
            "image": "./assest/img/11.png",
            "audio": "./assest/audio/11.mp3"
        },
        {
            "name": "L.I.P",
            "singer": "LK",
            "image": "./assest/img/12.png",
            "audio": "./assest/audio/12.mp3"
        },
        {
            "name": "Mây Lang Thang",
            "singer": "Tùng TeA ft. PC",
            "image": "./assest/img/13.png",
            "audio": "./assest/audio/13.mp3"
        },
        {
            "name": "Nắng Ấm Xa Dần",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/14.png",
            "audio": "./assest/audio/14.mp3"
        },
        {
            "name": "Người Có Thương",
            "singer": "DatKaa",
            "image": "./assest/img/15.png",
            "audio": "./assest/audio/15.mp3"
        },
        {
            "name": "Nơi Đâu Tìm Thấy Em",
            "singer": "Chu Bin",
            "image": "./assest/img/16.png",
            "audio": "./assest/audio/16.mp3"
        },
        {
            "name": "Sài Gòn Hôm Nay Mưa",
            "singer": "JSOL ft. Hoàng Duyên",
            "image": "./assest/img/17.png",
            "audio": "./assest/audio/17.mp3"
        },
        {
            "name": "Tát Nước Đầu Đình",
            "singer": "Lynk Lee ft. Binz",
            "image": "./assest/img/18.png",
            "audio": "./assest/audio/18.mp3"
        },
        {
            "name": "Tau Thích Mi",
            "singer": "Lil Pig",
            "image": "./assest/img/19.png",
            "audio": "./assest/audio/19.mp3"
        },
        {
            "name": "Về Bên Anh",
            "singer": "Jack",
            "image": "./assest/img/20.png",
            "audio": "./assest/audio/20.mp3"
        }
    ],
    start() {
        this.renderSong();
        this.config();
        this.updateCurrentSongHeader();
        this.handleDOMEvents();
    },
    config() {
        playBtn.classList.add('active');
        this.handleActiveCurrentSongInPlaylist();
    },
    renderSong() {
        var htmls = this.songs.map(function (song) {
            return `<div class="song">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="singer">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
        });

        playlist.innerHTML = htmls.join('');
    },
    updateCurrentSongHeader() {
        currentSongName.innerHTML = `${this.songs[0].name}`;
        cdThumb.style.backgroundImage = `url('${this.songs[0].image}')`
    },
    handleDOMEvents() {
        const _this = this;

        // Click vào nút phát/dừng
        togglePlayBtn.addEventListener('click', function (e) {
            // Nếu thẻ con của togglePlayBtn có chứa class 'icon-play' thì nút phát được click
            if (!! e.target.closest('.icon-play')) {
                // Chuyển đổi sự ẩn hiện của 2 icon phát/dừng
                playBtn.classList.toggle('active', false);
                pauseBtn.classList.toggle('active', true);

                _this.handlePlayCurrentSong();
            }
            // Ngược lại, nút dừng được click
            else {
                // Chuyển đổi sự ẩn hiện của 2 icon phát/dừng
                playBtn.classList.toggle('active', true);
                pauseBtn.classList.toggle('active', false);

                audio.pause();
            }
        });


        // Click vào nút phát lại/phát ngẫu nhiên
        repeatBtn.addEventListener('click', function (e) {
            // Kiểm tra nút hiện tại có đang active không ?
            var isActive = !! (e.target.closest('.active'));

            // Chuyển đổi trạng thái active
            repeatBtn.classList.toggle('active', ! isActive);
        });

        randomBtn.addEventListener('click', function (e) {
            var isActive = !! (e.target.closest('.active'));
            randomBtn.classList.toggle('active', ! isActive);
        });
    },
    handlePlayCurrentSong() {
        currentSongName.innerHTML = this.songs[this.currentSongIndex].name;
        cdThumb.style.backgroundImage = `url(${this.songs[this.currentSongIndex].image})`;
        audio.src = `${this.songs[this.currentSongIndex].audio}`;
        audio.play();
    },
    handleActiveCurrentSongInPlaylist() {
        var currentSongInPlaylist = $(`.song:nth-child(${this.currentSongIndex + 1})`);

        if($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        currentSongInPlaylist.classList.add('active');
    }
}


// Khởi động ứng dụng
app.start();