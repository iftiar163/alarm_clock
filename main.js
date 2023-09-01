const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmButton = document.querySelector(".button");
const content = document.querySelector(".content");

let alarmTime , isAlarm = false;
let ringTone = new Audio("./files/alarm.mp3");

for( i = 12; i > 0; i-- ){

	i = i < 10 ? "0" + i : i;

	let option = `<option value="${i}">${i}</option>`;

	selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for( i = 59; i >= 0; i-- ){

	i = i < 10 ? "0" + i : i;

	let option = `<option value="${i}">${i}</option>`;

	selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for( i = 2; i > 0; i-- ){

	let ampm = i == 2 ? "PM" : "AM";

	let option = `<option value="${ampm}">${ampm}</option>`;

	selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
	// Getting House Min Sec
	let date = new Date();
	h = date.getHours();
	m = date.getMinutes();
	s = date.getSeconds();
	ampm = "AM";

	if( h >= 12 ){
		h = h - 12;
		ampm = "PM";
	}
	// If Hour value is 0 set it to 12
	h = h == 0 ? h = 12 : h;
	// Adding 0 to hour min sec if the value is less than 10
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;

	currentTime.innerHTML = `${h} : ${m} : ${s} ${ampm}`;

	if( alarmTime ==  `${h}:${m} ${ampm}` ){
		ringTone.play();
		ringTone.loop = true;
	}

}, 1000);


function setAlarm(){

	if(isAlarm){ 			// if alarm is true
		alarmTime = ""; 	// clear the alarm value
		ringTone.pause();   // Pause alarm ringtone
		content.classList.remove("disable");
		setAlarmButton.innerText = "Set Alarm";
		return isAlarm = false;  // return alarm value to false
	}

	// Get hour min ampm from select tag value
	let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

	if( time.includes("Hour") ||  time.includes("Minute") || time.includes("AM/PM")) {
		return alert(`Please Inclue a Valide Time`);
	}

	isAlarm = true;
	alarmTime = time;
	content.classList.add("disable");
	setAlarmButton.innerText = "Clear Alarm";

}


setAlarmButton.addEventListener("click", setAlarm);