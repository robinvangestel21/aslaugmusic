var windowOpen = false;
const logoAus = document.getElementById("svg-logo-aus");
const navLinks = document.querySelectorAll("#menu header button")



const timeoutOne = 500; //One window was open, close it, open new window
const timeoutTwo = 500; //Close all windows, needs to be equal to time of transition opacity 
const timeoutThree = 200; //When no windows are open

function displayWindow(windowInput){
    var buttons = [
        document.getElementById("musicBtn"),
        document.getElementById("videoBtn"),
        document.getElementById("liveBtn"),
        document.getElementById("contactBtn"),
    ];
    buttons.forEach(button => {
        button.disabled = true;
    });
    setTimeout(function(){
        buttons.forEach(button => {
            button.disabled = false;
        });
    }, timeoutOne);

    const screen = document.getElementById(windowInput);
    var windowWasOpen = true;
    var buttonName = windowInput + "Btn";

    if ( screen.style.opacity != 1){//if the screen that is to be opened was not yet open, set windowWasOpen to false
        windowWasOpen = false;
    }
    if ( windowOpen && !windowWasOpen ){ //if 'a' window was open and the screen that is to be opened was not already opened -> close all windows, set windowOpen to false, open window to be opened, set windowOpen to true
        closeAllWindows();
        
        //Open the desired window
        logoAus.style.opacity = 0;
        setTimeout(function(){
            screen.style.opacity = 1;
            screen.style.visibility = 'visible';
        }, timeoutOne)
        //Now the desired window is open
        windowOpen = true;
        if(window.innerWidth < 600){
            document.getElementById('menu-overlay').style.backdropFilter = 'blur(15px)';
            document.getElementById('menu-overlay').style.webkitBackdropFilter = 'blur(15px)';
            document.getElementById('menu-overlay').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        };

        //Select correct link
        navLinks.forEach(navLink => {
            if (navLink.id == buttonName){
                navLink.classList.add('selected');
            }else{
                navLink.classList.remove('selected');
            }
        });
    } else if ( windowOpen && windowWasOpen ) { //if 'a' window was open and the screen that is to be opened was already open -> close all windows, set windowOpen to false
        closeAllWindows();
    } else {//if no windows were open -> open the desired window
        logoAus.style.opacity = 0;
        setTimeout(function(){
            screen.style.opacity = 1;
            screen.style.visibility = 'visible';
        }, timeoutThree)
        windowOpen = true;
        if(window.innerWidth < 600){
            document.getElementById('menu-overlay').style.backdropFilter = 'blur(15px)';
            document.getElementById('menu-overlay').style.webkitBackdropFilter = 'blur(15px)';
            document.getElementById('menu-overlay').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        };
        //Select correct link
        navLinks.forEach(navLink => {
            if (navLink.id == buttonName){
                navLink.classList.add('selected');
            }else{
                navLink.classList.remove('selected');
            }
        });
    };
};







function resizeCheck(){
    musicSlideWidth = musicFirstSlide.offsetWidth;
    videoSlideWidth = videoFirstSlide.offsetWidth;
    musicMoveSlides('none');
    videoMoveSlides('none');
    if (window.innerWidth > 600 && windowOpen){
        document.getElementById('menu-overlay').style.backdropFilter = 'blur(0px)';
        document.getElementById('menu-overlay').style.webkitBackdropFilter = 'blur(0px)';
        document.getElementById('menu-overlay').style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
    if (window.innerWidth <= 600 && windowOpen){
        document.getElementById('menu-overlay').style.backdropFilter = 'blur(15px)';
        document.getElementById('menu-overlay').style.webkitBackdropFilter = 'blur(15px)';
        document.getElementById('menu-overlay').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
}




const musicContainer = document.getElementById('music-container')
const musicSlides = musicContainer.querySelectorAll('.music-slide-container')
const musicFirstSlide = document.getElementById("music-slide-1")
var musicSlideCount = 0
musicSlides.forEach(slide =>{
    musicSlideCount += 1
})

const musicCircles = document.querySelectorAll('.music-circle')

var musicIndex = 0

var musicSlideWidth = musicFirstSlide.offsetWidth;
musicChangeCircles(musicIndex)

function musicMoveSlides(ease){
    musicContainer.style.transform = `translate3d(${-musicSlideWidth * musicIndex}px, 0, 0)`;
    if (ease == 'none'){
        musicContainer.style.transition = 'none';
    }else{
        musicContainer.style.transition = '0.5s ease';
    }

    musicChangeCircles(musicIndex)
}

function musicToNextSlide(){
    musicChangeButtons('p', true)
    if (musicIndex >= musicSlideCount - 2){
        musicChangeButtons('n', false)
        musicChangeButtons('p', true)
    }
    if (musicIndex == musicSlideCount - 1){
        return
    } else{
        musicIndex++
        musicMoveSlides('ease')
    }
}


function musicToPrevSlide(){
    musicChangeButtons('n', true)
    

    if (musicIndex <= 1){
        musicChangeButtons('p', false)
        musicChangeButtons('n', true)
    } 
    if (musicIndex == 0) {
        return
    } else {
        musicIndex--
        musicMoveSlides('ease')
    }
    
}

function musicMoveToFirstSlide(){
    for (let n=0; n < musicSlideCount; n++ ){
        musicToPrevSlide();
    };
};

function musicChangeCircles(index){
    musicCircles.forEach(circle =>{
        circle.style.opacity = 0.5;
    })
    musicCircles.forEach(circle =>{
        const idIndex = index + 1
        const id = 'music-' + idIndex
        if(circle.id == id){
            circle.style.opacity = 1;
        }
    })
}


function musicChangeButtons(button, active){
    if (button == 'p' && active){
        document.getElementById('music-prev-button').style.opacity = '1'
    } else if (button == 'p' && !active){
        document.getElementById('music-prev-button').style.opacity = '0.2'
    } else if (button == 'n' && active){
        document.getElementById('music-next-button').style.opacity = '1'
    } else if (button == 'n' && !active){
        document.getElementById('music-next-button').style.opacity = '0.2'
    }
}



if (musicIndex <= 0){
    musicChangeButtons('p', false)
    musicChangeButtons('n', true)
}











const videoContainer = document.getElementById('video-container')
const videoSlides = videoContainer.querySelectorAll('.video-slide-container')
const videoFirstSlide = document.getElementById("video-slide-1")
var videoSlideCount = 0
videoSlides.forEach(slide =>{
    videoSlideCount += 1
})

const videoCircles = document.querySelectorAll('.video-circle')

var videoIndex = 0

var videoSlideWidth = videoFirstSlide.offsetWidth;

videoChangeCircles(videoIndex)

function videoMoveSlides(ease){
    videoSlideWidth = videoFirstSlide.offsetWidth;
    videoContainer.style.transform = `translate3d(${-videoSlideWidth * videoIndex}px, 0, 0)`;
    if (ease == 'none'){
        videoContainer.style.transition = 'none';
    }else{
        videoContainer.style.transition = '0.5s ease';
    }

    videoChangeCircles(videoIndex)
}

function videoToNextSlide(){
    videoChangeButtons('p', true)
    if (videoIndex >= videoSlideCount - 2){
        videoChangeButtons('n', false)
        videoChangeButtons('p', true)
    }
    if (videoIndex == videoSlideCount - 1){
        return
    } else{
        videoIndex++
        videoMoveSlides('ease')
    }
    stopAllVideos()

}


function videoToPrevSlide(){
    videoChangeButtons('n', true)
    

    if (videoIndex <= 1){
        videoChangeButtons('p', false)
        videoChangeButtons('n', true)
    } 
    if (videoIndex == 0) {
        return
    } else {
        videoIndex--
        videoMoveSlides('ease')
    }
    stopAllVideos()
    
}
function videoMoveToFirstSlide(){
    for (let n=0; n < videoSlideCount; n++ ){
        videoToPrevSlide();
    };
};

function videoChangeCircles(index){
    videoCircles.forEach(circle =>{
        circle.style.opacity = 0.5;
    })
    videoCircles.forEach(circle =>{
        const idIndex = index + 1
        const id = 'video-' + idIndex
        if(circle.id == id){
            circle.style.opacity = 1;
        }
    })
}


function videoChangeButtons(button, active){
    if (button == 'p' && active){
        document.getElementById('video-prev-button').style.opacity = '1'
    } else if (button == 'p' && !active){
        document.getElementById('video-prev-button').style.opacity = '0.2'
    } else if (button == 'n' && active){
        document.getElementById('video-next-button').style.opacity = '1'
    } else if (button == 'n' && !active){
        document.getElementById('video-next-button').style.opacity = '0.2'
    }
}



if (videoIndex <= 0){
    videoChangeButtons('p', false)
    videoChangeButtons('n', true)
}


function closeAllWindows(){
    document.getElementById('music').style.opacity = 0
    document.getElementById('video').style.opacity = 0
    document.getElementById('live').style.opacity = 0
    document.getElementById('contact').style.opacity = 0
    setTimeout( function() {
        document.getElementById('music').style.visibility = 'hidden'
        document.getElementById('video').style.visibility = 'hidden'
        document.getElementById('live').style.visibility = 'hidden'
        document.getElementById('contact').style.visibility = 'hidden'
    }, timeoutTwo)
    
    var videos = [
        document.getElementById("playerVideoTimezone"),
        document.getElementById("playerVideoInMyHead"),
        document.getElementById("playerVideoTakeFromMe"),
        document.getElementById("playerVideoTakeFromMeLive"),
        document.getElementById("playerVideoImSorry"),
        document.getElementById("playerVideoIfYouWillHollow"),
    ];
    videos.forEach(video => {
        var videoOverlay = video.nextElementSibling;
        videoOverlay.style.display = 'flex';
    });

    document.getElementById("playerVideoTimezone").style.opacity = 0
    document.getElementById("playerVideoInMyHead").style.opacity = 0
    document.getElementById("playerVideoTakeFromMe").style.opacity = 0
    document.getElementById("playerVideoTakeFromMeLive").style.opacity = 0
    document.getElementById("playerVideoImSorry").style.opacity = 0
    document.getElementById("playerVideoIfYouWillHollow").style.opacity = 0
    logoAus.style.opacity = 1
    if(window.innerWidth < 600){
        document.getElementById('menu-overlay').style.backdropFilter = 'blur(0px)';
        document.getElementById('menu-overlay').style.webkitBackdropFilter = 'blur(0px)';
        document.getElementById('menu-overlay').style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
    stopAllVideos();

    //Deselect all links
    navLinks.forEach(navLink => {
        navLink.classList.remove('selected');
    });
    windowOpen = false;


    setTimeout( function() {musicMoveToFirstSlide(); videoMoveToFirstSlide();}, timeoutOne);
}







// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var playerTimezone;
var playerInMyHead;
var playerTakeFromMe;
var playerTakeFromMeLive;
var playerImSorry;
var playerIfYouWillHollow;
function onYouTubeIframeAPIReady() {
    playerTimezone = new YT.Player('playerVideoTimezone', {
        videoId: 'LNnGuNhCB6I',
        playerVars: {
            'playsinline': 0
        }
    });
    playerInMyHead = new YT.Player('playerVideoInMyHead', {
        videoId: 'hNEA9QyiCIE',
        playerVars: {
            'playsinline': 0
        }
    });
    playerTakeFromMe = new YT.Player('playerVideoTakeFromMe', {
        videoId: 'YQj3Q_2zaI8',
        playerVars: {
            'playsinline': 0
        }
    });
    playerTakeFromMeLive = new YT.Player('playerVideoTakeFromMeLive', {
        videoId: 'UdCdqt-wPA0',
        playerVars: {
            'playsinline': 0
        }
    });
    playerImSorry = new YT.Player('playerVideoImSorry', {
        videoId: '9RWAK4ViCpE',
        playerVars: {
            'playsinline': 0
        }
    });
    playerIfYouWillHollow = new YT.Player('playerVideoIfYouWillHollow', {
        videoId: 'z1WZ3SOipqE',
        playerVars: {
            'playsinline': 0
        }
    });
}

function playVideo(id){
    var video = document.getElementById(id);
    var buttonContainer = video.nextElementSibling;
    buttonContainer.style.display = 'none';
    video.style.opacity = 1;
    switch (id) {
        case "playerVideoTimezone":
            playerTimezone.playVideo();
            break;
        case "playerVideoInMyHead":
            playerInMyHead.playVideo();
            break;
        case "playerVideoTakeFromMe":
            playerTakeFromMe.playVideo();
            break;
        case "playerVideoTakeFromMeLive":
            playerTakeFromMeLive.playVideo();
            break;
        case "playerVideoImSorry":
            playerImSorry.playVideo();
            break;
        case "playerVideoIfYouWillHollow":
            playerIfYouWillHollow.playVideo();
            break;
    }
}

function stopAllVideos(){
    playerTimezone.stopVideo();
    playerInMyHead.stopVideo();
    playerTakeFromMe.stopVideo();
    playerTakeFromMeLive.stopVideo();
    playerImSorry.stopVideo();
    playerIfYouWillHollow.stopVideo();
    var overlays = document.querySelectorAll('.youtube-video-overlay-container')
    overlays.forEach(overlay => {
        overlay.style.display = "flex";
    });
}