import { drawChart, testChart, addtest, updateChart } from "./grafica.js";

const windowData = {
  window: 0,
  ATs: 0,
  InducAct: 0,
  StowAct: 0,
  IductTotal: 0,
  StowTotal: 0,
};
let database;

let ATsAct = 0,
  ATsMax = 0,
  ATsMin = 0,
  ATsOpt = 0;
let StowRateAct = 0,
  StowRateMin = 0,
  StowRateMax = 0,
  StowRateOpt = 0,
  StowRateCustom = 0;
let InductRateAct = 0,
  InductRateMin = 0,
  InductRateMax = 0,
  InductRateOpt = 0,
  InductRateCustom = 0;
let MinutesToCheck = 0,
  ATsAtTime = 0,
  ATsAtTimeCustom = 0;
let date = new Date();
let encendido = false;
let parcelStowedThisWindow = 0;
let ParcelStowedLAstWindow = 0;
let window = 0;

const startButton = document.getElementById("startButton");

setupEventsListener();

function fillCustom() {
  let ATsCustom = parseInt(document.getElementById("ATsCustom").textContent);

  let MinutesToCheckCustom = parseInt(
    document.getElementById("MinutesToCheckCustom").textContent
  );
  InductRateCustom = parseInt(
    document.getElementById("InductRateCustom").textContent
  );
  StowRateCustom = parseInt(
    document.getElementById("StowRateCustom").textContent
  );
  ATsAtTimeCustom = parseInt(
    ((InductRateCustom - StowRateCustom) / 60) * MinutesToCheckCustom +
      ATsCustom
  );
  document.getElementById("MinCustom").textContent =
    document.getElementById("StowRateCustom").textContent / 4;
  document.getElementById("MaxCustom").textContent =
    document.getElementById("StowRateCustom").textContent / 2;
  document.getElementById("ATsAtTimeCustom").textContent = ATsAtTimeCustom;
  giveStyle();
}

//refreshButton.addEventListener("click", () => apitest());

async function apitest() {
  let data2;

  await fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((data) => {
      let datos = data;
      //console.log(datos);
      calculate(datos);
    })
    .catch((error) => alert("No se encuentra el servidor", error));
}
async function getDataBase() {
  await fetch("http://localhost:3000/getData")
    .then((response) => response.json())
    .then((data) => {
      database = data;
      console.log("database", database);
    })
    .catch((error) => alert("No se encuentra el servidor", error));
}
async function calculate(data) {
  calculate.minute;
  calculate.windowMinute;
  if (!calculate.windowMinute) {
    calculate.windowMinute = 0;
  }
  let date = new Date();
  ATsAct = parseInt(data.ATs);
  StowRateAct = parseInt(data.stowRate);
  InductRateAct = parseInt(data.inductRate);
  let stowRateMinute = StowRateAct / 60;
  let inductRateMinute = InductRateAct / 60;
  MinutesToCheck = 5 - (date.getMinutes() % 5);
  //console.log(InductRateAct, StowRateAct, MinutesToCheck, ATsAct);
  let ritmo = parseInt(InductRateAct - StowRateAct);
  ATsAtTime = parseInt((ritmo / 60) * MinutesToCheck + ATsAct);

  ATsMax = StowRateAct / 2;
  ATsMin = StowRateAct / 4;
  ATsOpt = (ATsMax + ATsMin) / 2;

  StowRateMax = parseInt(
    (MinutesToCheck * InductRateAct + 60 * ATsAct) / (15 + MinutesToCheck)
  );
  StowRateMin = parseInt(
    (MinutesToCheck * InductRateAct + 60 * ATsAct) / (30 + MinutesToCheck)
  );
  StowRateOpt = parseInt(StowRateMax + StowRateMin) / 2;

  InductRateMax = parseInt(
    (60 * ATsMax - 60 * ATsAct) / MinutesToCheck + StowRateAct
  );
  InductRateMin = parseInt(
    (60 * ATsMin - 60 * ATsAct) / MinutesToCheck + StowRateAct
  );
  InductRateOpt = (InductRateMax + InductRateMin) / 2;

  filltable();

  if (calculate.minute != date.getMinutes()) {
    calculate.minute = date.getMinutes();
    const data = {
      InductRateAct,
      StowRateAct,
      ATsAct,
      hora: new Date().getHours(),
      minuto: new Date().getMinutes(),
      "passed":checkComply(ATsAct,StowRateAct)

    };
    updateChart(data);
    let dataToSend = JSON.stringify(data);
    console.log("datato send", dataToSend);
    await fetch("http://localhost:3000/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  
 
}
// comprueba si el valor de ats esta complay con el ritmo de stow
function checkComply(Ats,stow){
  if (Ats > stow/2 || Ats < stow/4)
  {return false}
  return true

}
function takeWindowData() {
  takeWindowData.window++;
}

async function filltable() {
  document.getElementById("ATsAct").innerText = ATsAct;
  document.getElementById("ATsMax").innerText = ATsMax;
  document.getElementById("ATsMin").innerText = ATsMin;
  document.getElementById("ATsOpt").innerText = ATsOpt;

  document.getElementById("StowRateAct").innerText = StowRateAct;
  document.getElementById("StowRateMax").innerText = StowRateMax;
  document.getElementById("StowRateMin").innerText = StowRateMin;
  document.getElementById("StowRateOpt").innerText = StowRateOpt;

  document.getElementById("InductRateAct").innerText = InductRateAct;
  document.getElementById("InductRateMax").innerText = InductRateMax;
  document.getElementById("InductRateMin").innerText = InductRateMin;
  document.getElementById("InductRateOpt").innerText = InductRateOpt;

  document.getElementById("MinutesToCheck").innerText = MinutesToCheck;

  document.getElementById("ATsAtTime").innerText = ATsAtTime;
  //document.getElementById("ATsAtTimeCustom").innerText = ATsAtTime;

  giveStyle();
}
function addWindowData() {
  addWindowData.window = +1;
  const a = 1;
}
function giveStyle() {
  if (ATsAct > ATsMax || ATsAct < ATsMin) {
    document.getElementById("ATsAct").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAct").style.backgroundColor =
      "rgb(109, 230, 109)";
  }
  if (ATsAtTime > ATsMax || ATsAtTime < ATsMin) {
    document.getElementById("ATsAtTime").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTime").style.backgroundColor =
      "rgb(109, 230, 109)";
  }

  if (
    ATsAtTimeCustom > StowRateCustom / 2 ||
    ATsAtTimeCustom < StowRateCustom / 4
  ) {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor =
      "rgb(109, 230, 109)";
  }
}

function setupEventsListener() {
  document.getElementById("addtest").addEventListener("click", () => addtest());
  document
    .getElementById("StowRateCustom")
    .addEventListener("focusout", () => fillCustom());
  document
    .getElementById("InductRateCustom")
    .addEventListener("focusout", () => fillCustom());
  document
    .getElementById("MinutesToCheckCustom")
    .addEventListener("focusout", () => fillCustom());
  document
    .getElementById("ATsCustom")
    .addEventListener("focusout", () => fillCustom());
  document
    .getElementById("showChart")
    .addEventListener("click", () => drawChart());

  startButton.addEventListener("click", () => handleStartButton());
  document.getElementById("copy").addEventListener("click", () => copyData());
  document.getElementById("testpos").addEventListener("click", () => mueve());
}
function mueve() {
  mueve.flag;
  let chart = document.getElementById("test");
  console.log("chart leftt", chart.style.left);
  if (mueve.flag) {
    mueve.flag = false;
    chart.style.left = "100vw";
  } else {
    mueve.flag = true;

    chart.style.left = "0";
  }
}
function copyData() {
  document.getElementById("ATsCustom").textContent = ATsAct;
  document.getElementById("StowRateCustom").textContent = StowRateAct;
  document.getElementById("InductRateCustom").textContent = InductRateAct;
  document.getElementById("MinutesToCheckCustom").textContent = MinutesToCheck;
  fillCustom();
}
function handleStartButton() {
  if (startButton.textContent === "Off") {
    startButton.textContent = "Running";

    apitest();
    drawChart()
    handleStartButton.intervalID = setInterval(apitest, 15000);
  } else {
    startButton.textContent = "Off";
    clearInterval(handleStartButton.intervalID);
  }
}
