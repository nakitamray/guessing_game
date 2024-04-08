// guessing levels: 1-3, 1-10, 1-100

let playBtn = document.getElementById("playBtn");
let guessBtn = document.getElementById("guessBtn");
let nameBtn = document.getElementById("nameBtn");
let giveUp = document.getElementById("giveUp");
let musicBtn = document.getElementById("musicBtn");
let pauseBtn = document.getElementById("pauseBtn");
let spotifyBtn = document.getElementById("randomSpotifyBtn");

document.getElementById("date").innerHTML = setDate();

nameBtn.addEventListener("click", () => {
  let n = document.getElementById("enterName").value;
  storeName(n);
});
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", () => {
  let g = document.getElementById("guess").value; 
  makeGuess(g);
});
giveUp.addEventListener("click", withdraw);
musicBtn.addEventListener("click", () => {
  let m = document.getElementById("enterMusic").value;
  playMusic(m);
})
pauseBtn.addEventListener("click", pause);
spotifyBtn.addEventListener("click", spotifyRandom);

let level, answer, score, scoreArr = [], txt, message;
let start, stop, totalTime, timeArr = [];
let i = 0, speed = 50;

var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var random = document.getElementById("random");
var auto = document.getElementById("auto");
var stopColor = document.getElementById("stop1");
var music;
let spotifyArr = [
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWTwnEm1IYyoj?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXcF6B6QPhFDv?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWYBO1MoTDhZI?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWZixSclZdoFE?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX59NCqCqJtoH?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4SBhb3fqCJd?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX9tPFwDMOaN1?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DXa2PvUpywmrr?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX7YCknf2jT6s?utm_source=generator",
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWWEJlAGA9gs0?utm_source=generator"
]

let iframe = document.getElementById("spotifyIframe");
iframe.hidden = true;
iframe.style.width = "100%";
iframe.style.borderRadius = "12px";
iframe.style.height = "152px";
iframe.style.margin = "10px 0px 10px 0px";

spotifyBtn.style.backgroundColor = "#1DB954";
spotifyBtn.style.border = "none";
spotifyBtn.style.padding = "8px";
spotifyBtn.style.color = "white";
spotifyBtn.style.borderRadius = "15px";
spotifyBtn.addEventListener("mouseover", function () {
  spotifyBtn.style.backgroundColor = "#065823";
})
spotifyBtn.addEventListener("mouseout", function () {
  spotifyBtn.style.backgroundColor = "#1DB954";
})

// Inspiration: https://codepen.io/diyifang/pen/rJbzqz
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
random.addEventListener("click", randomGradient);
auto.addEventListener("click", function() {
  intervalColor = setInterval(randomGradient, 2000);
})
stopColor.onmousedown = function() {
  clearInterval(intervalColor)
}

function setGradient() {
  body.style.background = "linear-gradient(to right," + color1.value + "," + color2.value + ")";
}
function randomColor() {
  let newColor = '#' + (Math.random() *  0xFFFFFF << 0).toString(16);
  return newColor;
}
function randomGradient() {
  color1.value = randomColor();
  color2.value = randomColor();
  setGradient();
}

function playMusic(enterMusic) {
  musicSelection = enterMusic.toLowerCase();
  console.log(enterMusic)
  
  if(musicSelection == "chill") {
    music = new Audio('audio/chill.mp3');
  } else if (musicSelection == "classical") {
    music = new Audio("audio/classical.mp3");
  } else if (musicSelection == "pop"){
    music = new Audio("audio/pop.mp3");
  } else {
    document.getElementById("musicChoice").innerHTML = "Invalid Option: Please choose either chill, classical, or pop";
    return;
  }

  music.volume = 0.5;
  music.play();

  musicBtn.disabled = true;
  pauseBtn.disabled = false;
}
function pause() {
  music.pause();
  music.currentTime = 0;
  document.getElementById("enterMusic").value = "";
  musicBtn.disabled = false;
  pauseBtn.disabled = true;
}
function spotifyRandom() {
  const randomIndex = Math.floor(Math.random() * spotifyArr.length);
  const item = spotifyArr[randomIndex];
  // console.log(item)
  iframe.src = item;
  iframe.hidden = false;
}

function storeName(enterName) {
  if(!enterName){
    document.getElementById("greeting").innerHTML = "Please Write Your Name";
    document.querySelector("#greeting").style.color = "orange";
    playBtn.disabled = true;
    return;
  } 
  firstName = enterName.toUpperCase().charAt(0) + enterName.toLowerCase().substring(1);
  txt = "Hello " + firstName +"! You can now click a level and play the guessing game!";

  playBtn.disabled = false;
  nameBtn.disabled = true;
  document.querySelector("#greeting").style.color = "black";
  typewriter()
  
  return txt;
}
function typewriter() {

  if(i< txt.length) {
    document.getElementById("greeting").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typewriter, speed);
  }
}

function play() {
  score = 0;
  timerStart();
  myTimer = setInterval(timer, 1000);
  
  let levelArr = document.getElementsByName("level");
  for(let i = 0; i < levelArr.length; i++) {
    if(levelArr[i].checked) {
      level = levelArr[i].value;
    }
    levelArr[i].disabled = true;
  }

  playBtn.disabled = true;
  guessBtn.disabled = false;
  giveUp.disabled = false;
  
  document.getElementById("msg").innerHTML = "Guess a # between 1-" + level;
  answer = Math.floor(Math.random()*level) + 1;
  document.getElementById("guess").placeholder = answer; // remember to remove after finished project

}
function makeGuess(guess) {
  if(isNaN(guess) || guess == "") {
    document.getElementById("msg").innerHTML = "INVALID: Enter a # 1-" + level;
    return;
  }

  score++; 
  document.querySelector("#sidemsg").style.width = "fit-content";
  document.querySelector("#sidemsg").style.padding = "10px";
  document.querySelector("#sidemsg").style.border = "thin solid black";
  
  if (Math.abs(answer-guess) == 0) {
    sidemsg.innerHTML = firstName + ", absolutely steaming!";
    document.querySelector("#sidemsg").style.backgroundColor = "#00A220";
document.querySelector("#sidemsg").style.color = "white";
  } else if (Math.abs(answer-guess) <= 3) {
    sidemsg.innerHTML = firstName + ", it seems you are hot!";
    document.querySelector("#sidemsg").style.backgroundColor = "#FF2F2F";
    document.querySelector("#sidemsg").style.color = "white";
  } else if (Math.abs(answer-guess) <= 10) {
    sidemsg.innerHTML = firstName + ", ahh you are so warm"
    document.querySelector("#sidemsg").style.backgroundColor = "#FFA64E";
    document.querySelector("#sidemsg").style.color = "black";
  } else {
    sidemsg.innerHTML = firstName + ", uh-oh too cold :("
    document.querySelector("#sidemsg").style.backgroundColor = "#CCEFFC";
    document.querySelector("#sidemsg").style.color = "black";
  }
  
  if(guess < answer) {
    document.getElementById("msg").innerHTML = "Too Low: Enter a # 1-" + level;
    document.querySelector("#msg").style.color = "red";
  } else if (guess > answer) {
    document.getElementById("msg").innerHTML = "Too High: Enter a # 1-" + level;
    document.querySelector("#msg").style.color = "red";
  } else {
    let keyword = "";
    if(score == 1) {
      keyword = " try."
    } else {
      keyword = " tries."
    }

    if (score < 3) {
      message = " Good job, that was a very good score!"
    } else if (guess < 10) {
      message = " Hmm, an OK score."
    } else {
      message = "...Yea that was kinda bad"
    }

    document.getElementById("msg").innerHTML = "Correct, you win! It took " + score + keyword + message;
    scoreArr.push(score);
    document.querySelector("#msg").style.color = "green";

    timerStop();
    updateScores();
    reset();
  }
}
function withdraw() {
  guessBtn.disabled = true;
  giveUp.disabled = true;
  playBtn.disabled = false;

  document.getElementById("msg").innerHTML = "Click Play Button to play again!";
  document.querySelector("#msg").style.color = "blue";
  score = level;

  timerStop();
}

function updateScores() {
  document.getElementById("wins").innerHTML = "Total Games Won: " + scoreArr.length;
  let lb =  document.getElementsByName("leaderboard");
  let sum = 0;
  
  scoreArr.sort((a,b) => a-b);

  for(let i = 0; i < scoreArr.length; i++) {
    if(i <3) {
      lb[i].innerHTML = scoreArr[i];
    }

    sum+= scoreArr.length;
  }

  let avg = sum/scoreArr.length;
  document.getElementById("avrScore").innerHTML = "Average Score: " + avg.toFixed(2);

  timerStop();
}
function reset() {
  let levelArr = document.getElementsByName("level");
  for(let i = 0; i < levelArr.length; i++) {
    levelArr[i].disabled = false;
  }

  playBtn.disabled = false;
  guessBtn.disabled = true;
  document.getElementById("guess").value = "";
  document.getElementById("guess").placeholder = "";
}

function setDate() {
  let options = {weekday: 'long', year: "numeric", month: 'long', day: 'numeric'};
  let today = new Date()
  date = today.toLocaleDateString("en-US", options)
  return date;
}
function setTime() {
  let str = "";
  let time = new Date();
  str += "Time: " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  document.getElementById("time").innerHTML = str;
}
setInterval(setTime, 1000);

function timerStart() {
  start = new Date().getTime();
}
function timer() {
  let stop = new Date().getTime();
  let Time = (stop-start)/1000;
  document.getElementById("timer").innerHTML = Time.toFixed(2) + " seconds";
}
function timerStop() {
  stop = new Date().getTime();
  totalTime = (stop-start)/1000;
  console.log(totalTime);
  document.getElementById("timer").innerHTML = "It took " + totalTime.toFixed(2) + " seconds";
  clearInterval(myTimer);

  timeArr.push(totalTime);
  timeArr.sort((a,b) => a-b);
  let list = document.getElementsByName("timelist");
  let sum = 0

  for (i = 0; i < timeArr.length; i++) {
    sum += timeArr[i];
    if(i < 10) {
      list[i].innerHTML = timeArr[i]
    }
  }

  let avg = sum/(timeArr.length);
  document.getElementById("avgTime").innerHTML = "Average Time: " + avg.toFixed(2) + " seconds";
}



