var video,
	buttonPlay,
	buttonRestart,
	seekSlider,
	volumeRange,
	muteBtn,
	fullScreen,
	curtimetext,
	durtimetext,
	flag = false,
	hidden,
	visibilityChange,
	lastVal = 100;

window.onload = initialise();
// function isIE() {


// }

function initialise() {
	// 	if (isIE() < 9) {
	//  // IE8 code
	// document.getElementsByClassName("other")[0].style.display = "none";
	//  document.getElementsByClassName("info")[0].style.display = "block";

	// } else {
	// Other versions IE or not IE
	video = document.getElementById("Video1");
	buttonPlay = document.getElementById("play");
	buttonbar = document.getElementsByClassName('buttonbar')[0];
	buttonRestart = document.getElementById("restart");
	seekSlider = document.getElementById("seek-bar");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	muteBtn = document.getElementById("volume-icon");
	volumeRange = document.getElementById("volume-bar");
	fullScreen = document.getElementById("fullscreen");
	buttonPlay.addEventListener('click', vidplay, false);
	buttonRestart.addEventListener('click', restart, false);
	muteBtn.addEventListener('click', vidMute, false);
	seekSlider.addEventListener('change', vidSeek, false);
	volumeRange.addEventListener('change', vidVolSeek, false);
	video.addEventListener('timeupdate', seekTimeUpdate, false);
	video.addEventListener('contextmenu', stopRtClick, false);
	video.addEventListener('click', screenClick, false);
	fullScreen.addEventListener('click', toggleFullScreen, false);
	video.addEventListener("waiting", showLoader, false);
	video.addEventListener("canplay", hideLoader, false);
	video.addEventListener("loadstart", showLoader, false);
	video.addEventListener("ended", videoEnded, false);
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchMove, false);
	buttonbar.addEventListener("mousemove", mouseMoveToDisplayControlBar, false);
}

//function for ending video
function videoEnded() {
	seekSlider.value = 0;
	buttonPlay.classList.remove('glyphicon-pause');
	buttonPlay.classList.add('glyphicon-play');
}

//displays the loader gif
function showLoader() {
	$('#videoLoader').css("display", "block");
}

//hide the loader gif
function hideLoader() {
	$('#videoLoader').css("display", "none");
}

//function for playing video
function vidplay() {
	if (video.paused) {
		video.play();
		buttonPlay.classList.remove('glyphicon-play');
		buttonPlay.classList.add('glyphicon-pause');
		$('#pauseImage').css("display", "none");
	} else {
		video.pause();
		buttonPlay.classList.remove('glyphicon-pause');
		buttonPlay.classList.add('glyphicon-play');
		$('#pauseImage').css("display", "block");
	}
}

//function for restart the video
function restart() {
	video.currentTime = 0;
	buttonPlay.classList.remove('glyphicon-play');
	buttonPlay.classList.add('glyphicon-pause');
	if (video.paused == true) {
		buttonPlay.classList.remove('glyphicon-pause');
		buttonPlay.classList.add('glyphicon-play');
	}
}

//function for fast forwarding the video
function skip(value) {
	var video = document.getElementById("Video1");
	video.currentTime += value;
}

//function for seekbar progress with video
function vidSeek() {
	var recentTime = Math.round(video.currentTime);
	var Time = Math.round(video.duration);
	var percent = seekSlider.value;
	var value = (percent * Time) / 100;
	if (value < recentTime) {
		video.currentTime = value;
	}
}

//function for volumebar progress of volume
function vidVolSeek() {
	video.volume = volumeRange.value / 100; //calculates the volume on moving the seekbar
	lastVal = volumeRange.value;
	if (lastVal == 0) {
		muteBtn.classList.remove('glyphicon-volume-up');
		muteBtn.classList.add('glyphicon-volume-off');
	}
	else {
		muteBtn.classList.remove('glyphicon-volume-off');
		muteBtn.classList.add('glyphicon-volume-up');
	}
}

//function for toggling fullscreen
function toggleFullScreen() {
	console.log('hello');
	if (flag === false) {
		if (video.requestFullScreen) {
			video.requestFullScreen();
			fullScreen.classList.remove('glyphicon-fullscreen');
			fullScreen.classList.add('glyphicon-resize-small');
		} else if (video.webkitRequestFullScreen) {
			video.webkitRequestFullScreen();
			fullScreen.classList.remove('glyphicon-fullscreen');
			fullScreen.classList.add('glyphicon-resize-small');
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen();
			fullScreen.classList.remove('glyphicon-fullscreen');
			fullScreen.classList.add('glyphicon-resize-small');
		}
		else if (video.msRequestFullscreen) {
			video.msRequestFullscreen();
			fullScreen.classList.remove('glyphicon-fullscreen');
			fullScreen.classList.add('glyphicon-resize-small');
		}
		flag = true;
		buttonbar.classList.add('fullscreenControl');
	}
	else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			fullScreen.classList.remove('glyphicon-resize-small');
			fullScreen.classList.add('glyphicon-fullscreen');
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
			fullScreen.classList.remove('glyphicon-resize-small');
			fullScreen.classList.add('glyphicon-fullscreen');
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
			fullScreen.classList.remove('glyphicon-resize-small');
			fullScreen.classList.add('glyphicon-fullscreen');
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
			fullScreen.classList.remove('glyphicon-resize-small');
			fullScreen.classList.add('glyphicon-fullscreen');
		}
		flag = false;
		buttonbar.classList.remove('fullscreenControl');
	}
}

//function for mute volume
function vidMute() {
	if (video.muted) {
		volumeRange.value = lastVal;
		video.muted = false;
		muteBtn.classList.remove('glyphicon-volume-off');
		muteBtn.classList.add('glyphicon-volume-up');
		volumeRange.value = volumeRange.value / 100;
		volumeRange.value = lastVal;
	} else {
		video.muted = true;
		volumeRange.value = 0;
		muteBtn.classList.remove('glyphicon-volume-up');
		muteBtn.classList.add('glyphicon-volume-off');
	}
}

//function for seekbar time update
function seekTimeUpdate() {
	var newTime = video.currentTime * (100 / video.duration);
	seekSlider.value = newTime;
	var curmins = Math.floor(video.currentTime / 60);
	var cursecs = Math.floor(video.currentTime - curmins * 60);
	var durmins = Math.floor(video.duration / 60);
	var dursecs = Math.floor(video.duration - durmins * 60);
	if (cursecs < 10) { cursecs = "0" + cursecs; }
	if (dursecs < 10) { dursecs = "0" + dursecs; }
	if (curmins < 10) { curmins = "0" + curmins; }
	if (durmins < 10) { durmins = "0" + durmins; }
	curtimetext.innerHTML = curmins + ":" + cursecs;
	if (isNaN(durmins) || isNaN(cursecs)) {
		durtimetext.innerHTML = "/ " + "00" + ":" + "00";
		seekSlider.value = 0;
	} else {
		durtimetext.innerHTML = "/ " + durmins + ":" + dursecs;
	}
}



if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}
// if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
	console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
	video.addEventListener("pause", function () {
		document.title = 'PlayMyVideo';
	}, false);

	// When the video plays, set the title.
	video.addEventListener("play", function () {
		document.title = 'PlayMyVideo';
	}, false);
}

//function to pause video when new tab and minimised 
function handleVisibilityChange() {
	if (document[hidden]) {
		video.pause();
	} else {
		video.play();
		buttonPlay.classList.remove('glyphicon-play');
		buttonPlay.classList.add('glyphicon-pause');
		$('#pauseImage').css("display", "none");
	}
}

//mouse move to display control bar
function mouseMoveToDisplayControlBar() {
	if ($('.buttonbar').attr('class') === 'container buttonbar fullscreenControl') {

		$('.fullscreenControl').css('opacity', '1').on('mouseleave', function () {
			$('.fullscreenControl').css('opacity', '0')
		});
	}
};


$(document).keydown(function (event) {
	if (event.which == 32) { //to play against space bar
		vidplay();
	}
	if ((event.which == 37 || event.keyCode == 37) && event.ctrlKey) { //click ctrl+leftArrow to backward 5 sec
		skip(-5);
	}
	if ((event.which == 39 || event.keyCode == 39) && event.ctrlKey) { //click ctrl+rightArrow to forward 5 sec
		skip(5);
	}
});
//event trigger for exiting fullscreen with escape button
if (document.addEventListener) {
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

//function for exiting fullscreen 
function exitHandler() {
	if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
		if (document.webkitExitFullscreen) {
			if (flag === false) {
				fullScreen.classList.remove('glyphicon-resize-small');
				fullScreen.classList.add('glyphicon-fullscreen');
				buttonbar.classList.remove('fullscreenControl');
				flag = true;
				$('.buttonbar').css('opacity', '1');
			}
			else {
				fullScreen.classList.remove('glyphicon-fullscreen');
				fullScreen.classList.add('glyphicon-resize-small');
				buttonbar.classList.add('fullscreenControl');
				flag = false;
			}
		}
	}
}

// swipe event function definition
function handleTouchStart(event) {
	xDown = event.touches[0].clientX;
	yDown = event.touches[0].clientY;
};

//function to forward or backward the video with swipe
function handleTouchMove(event) {
	if (!xDown || !yDown) {
		return;
	}
	var xUp = event.changedTouches[0].clientX;
	var yUp = event.changedTouches[0].clientY;
	var xDiff = Math.ceil(xDown - xUp);
	var yDiff = Math.ceil(yDown - yUp);
	if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
		skip(-(xDiff / 15));
	} else {
		if (yDiff > 0) {
		} else {
		}
	}
	/ reset values /
	xDown = null;
	yDown = null;
};


//click on video to toggle play
$('#pauseImage').on('click', function () {
	vidplay();
});

//to stop right click on the video
function stopRtClick(event) {
	event.preventDefault();
}

//to play and pause the video on clicking video 
function screenClick() {
	vidplay();
}





