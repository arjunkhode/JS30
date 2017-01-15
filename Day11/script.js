//Get elements

const player=document.querySelector('.player');
const video=document.querySelector('.playvideo');
const controls1=document.querySelector('.controls1');
const progress=document.querySelector('.progress');
const toggle=player.querySelector('.playPause');
const skipper=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player_slider');

//Write functions

function togglePlay(){
	if(video.paused) {
		video.play();
	}
	else video.pause();
}

function updateButton(){
	const icon = video.paused ? '►' : '❚❚';
	toggle.textContent = icon;
}

function skipit(){
	console.log(this.dataset);
	video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange(){
	if (this.name==='volume-slider')
	{
		video['volume']=this.value;
	}
	else if (this.name==='rate-slider'){
		video['playbackRate']=this.value;
	}
}

function progressing(){
	const percent=(video.currentTime/video.duration)*100;
	progress.style.flexBasis=`${percent}%`;
}

function scrub(e){
	const scrubtime=(e.offsetX/controls1.offsetWidth) * video.duration;
	video.currentTime=scrubtime;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipper.forEach(button => button.addEventListener('click',skipit));

ranges.forEach(range=>range.addEventListener('change',updateRange));
ranges.forEach(range=>range.addEventListener('mousedown',function(){
	ranges.forEach(range=>range.addEventListener('mousemove',updateRange));	
}));


video.addEventListener('timeupdate', progressing);
controls1.addEventListener('click',scrub);
let move=false;
controls1.addEventListener('mousedown',()=>move=true)
controls1.addEventListener('mouseup',()=>move=false)
controls1.addEventListener('mousemove',(e)=> move && scrub(e));