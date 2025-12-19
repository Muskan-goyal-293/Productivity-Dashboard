// localStorage.clear()
let alltodo = document.querySelector("#alltodo");
let dailyplanebox = document.querySelector(".dailyplanebox");
let clear = document.querySelector(".clear");
let motivation = document.querySelector(".motivation");
let todo = document.querySelector(".todo");

// This is  you theam code
const root = document.documentElement;
const themes = {
  default: {
    first: "#F4EEFF",
    sec: "#DCD6F7",
    third: "#A6B1E1",
    four: "#424874",
  },

  blue: {
    first: "#EEF5FF",
    sec: "#C7DFFF",
    third: "#5B8DEF",
    four: "#1E3A8A",
  },

  pink: {
    first: "#FFF7FA",
    sec: "#FADADD",
    third: "#F2A1B3",
    four: "#A63D5E",
  },

  green: {
    first: "#F1F8F4",
    sec: "#CDEBDD",
    third: "#6FBF8F",
    four: "#1E6F5C",
  },

  brown: {
    first: "#FCF5EE",
    sec: "#EAD7C2",
    third: "#B4846C",
    four: "#5C2E1F",
  },

  purple: {
    first: "#F6F3FF",
    sec: "#D9D2FF",
    third: "#8B7CF6",
    four: "#3F2E8C",
  },

  orange: {
    first: "#FFF4EC",
    sec: "#FFD8C2",
    third: "#FF9F45",
    four: "#9C3D10",
  },

  red: {
    first: "#FFF1F1",
    sec: "#FFD1D1",
    third: "#FF6B6B",
    four: "#8B0000",
  },

  teal: {
    first: "#F0FAFA",
    sec: "#C8ECEC",
    third: "#4DB6AC",
    four: "#004D40",
  },

  yellow: {
    first: "#FFFBEA",
    sec: "#FFF3BF",
    third: "#FFD43B",
    four: "#7A5C00",
  },

  gray: {
    first: "#F8F9FA",
    sec: "#E9ECEF",
    third: "#ADB5BD",
    four: "#343A40",
  },

  dark: {
    first: "#F1F5F9",
    sec: "#CBD5E1",
    third: "#475569",
    four: "#0F172A",
  },

  mint: {
    first: "#F0FFF9",
    sec: "#C6F6E5",
    third: "#4FD1C5",
    four: "#065F46",
  },

  coral: {
    first: "#FFF5F3",
    sec: "#FFD6CF",
    third: "#FF7F6A",
    four: "#7A1F16",
  },

  navy: {
    first: "#0F172A",
    sec: "#1E293B",
    third: "#475569",
    four: "#E5E7EB",
  },
};
function applyTheme() {
  let theme = localStorage.getItem("color");
  if (theme === null) {
    root.style.setProperty("--first", themes.default.first);
    root.style.setProperty("--sec", themes.default.sec);
    root.style.setProperty("--third", themes.default.third);
    root.style.setProperty("--four", themes.default.four);
  } else {
    root.style.setProperty("--first", themes[theme].first);
    root.style.setProperty("--sec", themes[theme].sec);
    root.style.setProperty("--third", themes[theme].third);
    root.style.setProperty("--four", themes[theme].four);
  }
}
applyTheme();
let option = document.querySelector("#theamset");
option.addEventListener("change", (e) => {
  localStorage.removeItem("color");
  localStorage.setItem("color", e.target.value);
  applyTheme();
});

// this function show current day
function dayfnx() {
  let day = document.querySelectorAll(".day");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let today = days[now.getDay()];
  day.forEach((val) => {
    val.innerText = today;
  });
}
dayfnx();

// this function show current time
function timefnc() {
  let time = document.querySelector(".time");
  let now = new Date();
  let val;
  if (now.getMinutes() < 10) {
    val = `0${now.getMinutes()}`;
  } else {
    val = now.getMinutes();
  }
  time.innerHTML = `${now.getHours()}:${val}`;

  let header = document.querySelector("header");

  if (now.getHours() > 0 && now.getHours() <= 8) {
    header.style.backgroundImage = `url(./image/dashbord1.jpeg)`;
  } else if (now.getHours() > 8 && now.getHours() <= 17) {
    header.style.backgroundImage = `url(./image/dashbord2.jpeg)`;
  } else {
    header.style.backgroundImage = `url(./image/dashbord3.jpeg)`;
  }
}
timefnc();

// this function show current date
function yearfnc() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = document.querySelector(".date");
  let now = new Date();
  date.innerHTML = ` ${now.getDate()} / ${
    months[now.getMonth()]
  } / ${now.getFullYear()}  `;
}
yearfnc();

// This function is us to navigate all page when you click on any image then it open these page and  back button use to return home page ( main page)
function PagesFnc() {
  let boxes = document.querySelectorAll(".boxes");
  let pages = document.querySelectorAll(`.infobox`);
  let backBtn = document.querySelectorAll(".back");
  boxes.forEach((element) => {
    element.addEventListener("click", () => {
      pages[element.id].style.display = "block";
    });
  });
  backBtn.forEach((value) => {
    value.addEventListener("click", function () {
      pages[value.id].style.display = "none";
    });
  });
}
PagesFnc();

async function waetherapi(cityName = "bhiwani") {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b92e57938eaebc6ded1fcf3a2f5b4bc3`
    );
    let data = await res.json();
    document.querySelector(".country").innerText = data.sys.country;
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".pressure").innerText = data.main.pressure;
    document.querySelector(".cloud").innerText = data.weather[0].description;
    document.querySelector(".wind").innerText = data.wind.speed;
    document.querySelector(".temp").innerText = data.main.temp;
    document.querySelector(".humidity").innerText = data.main.humidity;
    if (data.status == 300 && data.status > 400) {
      throw new Error("😓😓 networ issue");
    }
  } catch (err) {
    alert(err);
  }
}
waetherapi();

// This is your first page code
// when you click on todo page then it run this function change tha hading of your h2;
todo.addEventListener("click", () => {
  let yourtodo = document.querySelector(".yourtodo");
  let arr = [
    "Your daily plain 😀",
    "Ypur WishList 😊",
    "Your Task 🤗",
    "Your Dream 🙂",
    "your Goals 😉",
    "Your Plains 😃",
  ];
  let timer = 0;
  let id = setInterval(() => {
    yourtodo.innerText = arr[timer];
    timer++;
    if (timer == 6) {
      clearInterval(id);
      timer = 0;
    }
  }, 1000);
});

//  this code check whether localstorage contain any todo task or not
let data = JSON.parse(localStorage.getItem("task"));
if (data === null) {
  data = [];
}

//  if  todo task are contain then tis function show this task
function showTodoData() {
  let sum = "";
  data.forEach((val, index) => {
    sum += `<div class="todolistshowbox">
        <h2 class="taskaddh2"><span id="span" class=${val.imp}>imp</span>${val.task}</h2>
       <button id=${index} class="taskdone">Mark as done</button>
        </div>`;
  });
  alltodo.innerHTML = sum;
}
showTodoData();

// This function is used to handle form and todo data  show Data in your page
function todoDataFetchfnc() {
  let form = document.querySelector(".form");
  let todoInputBox = document.querySelector("#todoinputbox");
  let todoTextArea = document.querySelector("#textarea");
  let checkbox = document.querySelector("#checkbox");
  form.addEventListener("submit", function (elem) {
    elem.preventDefault();
    if (todoInputBox.value.trim() == "") {
      alert(" 😅 Plese Enter Task Name ");
      return;
    }
    data.push({
      task: todoInputBox.value,
      textarea: todoTextArea.value,
      imp: checkbox.checked,
    });
    localStorage.setItem("task", JSON.stringify(data));
    showTodoData();
    todoInputBox.value = "";
    todoTextArea.value = "";
    checkbox.checked = false;
  });
}
todoDataFetchfnc();

// this function is use to remove todo task on you page
function removetodofnc() {
  alltodo.addEventListener("click", function (e) {
    if (e.target.classList.contains("taskdone")) {
      let index = e.target.id;
      data.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(data));
      showTodoData();
    }
  });
}
removetodofnc();

//  this your Second page function [Daily Planer function]
const hours = Array.from(
  { length: 24 },
  (_, i) =>
    `${i.toString().padStart(2, "0")}:00 - ${(i + 1)
      .toString()
      .padStart(2, "0")}:00`
);
let dayplanerobj = JSON.parse(localStorage.getItem("dayplainer")) || {};
function renderDailyPlanner() {
  let html = "";
  hours.forEach((time, idx) => {
    html += `
      <div class="dailyplinerchildbox">
        <p class="time">
          ${time}
          <span>${idx < 12 ? "AM" : "PM"}</span>
        </p>
        <input 
          type="text"
          class="plaindayinput"
          id="${idx}"
          placeholder="Enter your plan"
          value="${dayplanerobj[idx] || ""}"
        />
      </div>
    `;
  });

  dailyplanebox.innerHTML = html;
}
dailyplanebox.addEventListener("input", (e) => {
  if (!e.target.classList.contains("plaindayinput")) return;
  dayplanerobj[e.target.id] = e.target.value;
  localStorage.setItem("dayplainer", JSON.stringify(dayplanerobj));
});
clear.addEventListener("click", () => {
  dayplanerobj = {};
  localStorage.setItem("dayplainer", JSON.stringify(dayplanerobj));
  renderDailyPlanner();
});
renderDailyPlanner();

// this is your Third page code
// this function fetch api and show quote randamly  when you click on the motivation page
async function apiFacth() {
  let thought = document.querySelector(".thought");
  let author = document.querySelector(".author");
  try {
    let url = await fetch(`https://dummyjson.com/quotes/random`);
    let data = await url.json();
    thought.innerHTML = data.quote;
    author.innerHTML = data.author;

    if (Response.status == 300 && Response.status > 400) {
      thought.innerHTML = "Inter Slow Plese Check Your Intenet";
      author.innerHTML = "😓😓😓😓";
      throw new Error("Plese Connect to the Internet");
    }
  } catch (err) {
    alert(err);
  }
}
motivation.addEventListener("click", () => {
  apiFacth();
});

// This is fourth page code
// ===== CONFIG =====
const DEFAULT_TIME = 25 * 60;

// ===== STATE =====
let totalTime = DEFAULT_TIME;
let timerId = null;

// ===== ELEMENTS =====
const timerH1 = document.querySelector(".timerh1");
const startBtn = document.querySelector("#startbtn");
const pauseBtn = document.querySelector("#pausebtn");
const resetBtn = document.querySelector("#resetbtn");
const breakBtn = document.querySelector("#breakbtn");
// ===== FUNCTIONS =====
function updateTimerUI(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerH1.textContent = `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timerId) return; // prevent multiple intervals

  timerId = setInterval(() => {
    if (totalTime === 0) {
      stopTimer();
      return;
    }
    totalTime--;
    updateTimerUI(totalTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  totalTime = DEFAULT_TIME;
  updateTimerUI(totalTime);
}

// ===== EVENTS =====
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// ===== INIT =====
updateTimerUI(totalTime);

// ==== BREAKBTN ====

breakBtn.addEventListener("click", () => {
  let total = 5 * 60;
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  timerH1.textContent = `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  timerId = setInterval(() => {
    if (total === 0) {
      stopTimer();
      return;
    }
    total--;
    updateTimerUI(total);
  }, 1000);
});
