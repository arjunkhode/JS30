
const timerDisplay=document.querySelector('.display__time-left');
const endTime=document.querySelector('.display__end-time');
const buttons=document.querySelectorAll('[data-time]');
let t;

function display(seconds)
{
	const minutes=Math.floor(seconds/60);
	const secsleft=seconds % 60;
	const display=`${minutes}:${secsleft<10?'0':''}${secsleft}`;
	timerDisplay.textContent=display;
	console.log(minutes,secsleft);
}

function timer(seconds){
	clearInterval(t); //clear all the previour timers
	const now=Date.now();
	const then=now+seconds*1000;
	displayEndTime(then);

	display(seconds); 
	t=setInterval(()=>{
	const left=Math.round((then-Date.now())/1000);
		//check if we should stop
		if(left < 0) {clearInterval(t); return;}
		display(left);
	},1000);
}

function displayEndTime(timestamp){
	const end=new Date(timestamp);
	const hour = end.getHours();
	const minutes= end.getMinutes();
	endTime.textContent=`Be back at ${hour>12?hour-12:hour}:${minutes<10?'0':''}${minutes}`;
}

function startTimer(){
	const secs = parseInt(this.dataset.time);
	timer(secs);
}

buttons.forEach(button=>button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	const mins=this.minutes.value;
	timer(mins*60);
	this.reset();
});