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
  ATsOpt = 0,
  ATsCustom;
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
  MinutesToCheckCustom = 0,
  ATsAtTime = 0,
  ATsAtTimeCustom = 0;


const startButton = document.getElementById("startButton");

setupEventsListener();

function fillCustom() {
  ATsCustom = parseInt(document.getElementById("ATsCustom").textContent);

  MinutesToCheckCustom = parseInt(
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
  MinutesToCheck = 15 - (date.getMinutes() % 15);
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
    const dataForActu = {
      InductRateAct,
      StowRateAct,
      ATsAct,
      ATsMax,
      ATsMin,
      hora: new Date().getHours(),
      minuto: new Date().getMinutes(),
      epoch: Date.now(),
      passed: checkComply(ATsAct, StowRateAct),
    };
    console.log("se envia", dataForActu);
    updateChart(dataForActu);
    let dataToSend = JSON.stringify(dataForActu);
    console.log("datato send", dataToSend);
    await fetch("http://localhost:3000/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForActu),
    });
  }
}
// comprueba si el valor de ats esta comply con el ritmo de stow
function checkComply(Ats, stow) {
  if (Ats > stow / 2 || Ats < stow / 4) {
    return false;
  }
  return true;
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
  document
    .getElementById("testpos")
    .addEventListener("click", () => testChart());

  addListenerToModifierButtons();
  addListenerToFindMinMaxCuston();
  document.getElementById('botonGetStowersRates').addEventListener("click", () => { getStowersRates() })
  document.getElementById('botonGetInductersRates').addEventListener("click", () => { getInductersRates() })
}
async function getStowersRates() {
  console.log(new Date().getDate())
  await fetch("http://localhost:3000/getStowersData")
    .then((response) => response.json())
    .then((data) => {
      let stowersRates = data;
      console.log(stowersRates);
      console.log(new Date().getDate())
      return stowersRates
      //https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=ammaestr
    })
    .catch((error) => alert("No se encuentra el servidor", error));
}
async function getInductersRates() {
  console.log(new Date().getTime())
  await fetch("http://localhost:3000/getInductersData")
    .then((response) => response.json())
    .then((data) => {
      let inductersRates = data;
      console.log(inductersRates);
      console.log(new Date().getTime())
      return inductersRates
    })
    .catch((error) => alert("No se encuentra el servidor", error));
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
function addListenerToModifierButtons() {
  let celda;
  const BotonesModifi = document.querySelectorAll(".sumatorios");

  BotonesModifi.forEach((boton) =>
    boton.addEventListener("click", (e) => {
      if (boton.classList.contains("stow")) {
        celda = document.getElementById("StowRateCustom");
      } else if (boton.classList.contains("minutes")) {
        celda = document.getElementById("MinutesToCheckCustom");
      } else if (boton.classList.contains("induct")) {
        celda = document.getElementById("InductRateCustom");
      } else {
        return;
      }

      celda.textContent =
        Number(celda.textContent) + Number(e.target.textContent);
      fillCustom();
    })
  );
}
function addListenerToFindMinMaxCuston() {
  document
    .querySelector("#customMinStow")//(MinutesToCheck * InductRateAct + 60 * ATsAct) / (30 + MinutesToCheck)
    .addEventListener(
      "click",
      (e) => {
        (document.getElementById("StowRateCustom").textContent = Math.round(
          (MinutesToCheckCustom * InductRateCustom + 60 * ATsCustom) / (30 + MinutesToCheckCustom)



        )); fillCustom()
      }
    );
  document
    .querySelector("#customMaxStow")
    .addEventListener(
      "click",
      (e) => {
        (document.getElementById("StowRateCustom").textContent = Math.round(
          (MinutesToCheckCustom * InductRateCustom + 60 * ATsCustom) / (15 + MinutesToCheckCustom)


        )); fillCustom()
      }
    );


  document
    .querySelector("#customMinInduct")
    .addEventListener(
      "click",
      (e) => {
        (document.getElementById("InductRateCustom").textContent = Math.round(
          (60 * (StowRateCustom / 4) - 60 * ATsCustom) / Number(MinutesToCheckCustom) + Number(StowRateCustom)


        )); fillCustom()
      }
    );
  document
    .querySelector("#customMaxInduct")
    .addEventListener(
      "click",
      (e) => {
        (document.getElementById("InductRateCustom").textContent = Math.round(
          (60 * (StowRateCustom / 2) - 60 * ATsCustom) / Number(MinutesToCheckCustom) + Number(StowRateCustom)


        )); fillCustom()
      }
    );
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

    drawChart();
    apitest();

    handleStartButton.intervalID = setInterval(apitest, 30000);
  } else {
    startButton.textContent = "Off";
    clearInterval(handleStartButton.intervalID);
  }
}
creaTabla()
function creaTabla() {
  const container = document.getElementById("teststow")
  const cabeceras=["login","ritmo","totales","pasillo"]
  const constdatos = [
    ["ante", 23, 345, "d32"],
    ["zazaz"    , 12, 333, "S22"],
    ["lowswsgin", 44, 543, "E33"]
  ]
  constdatos.sort((a,b)=>a[1]<b[1])
  const filas = constdatos.length
  const columnas = Object.keys(constdatos).length
  let tabla=document.createElement("table")
  tabla.className="table-sort" 
  
 let cabecera = document.createElement("tr")
 cabeceras.forEach(ele => {
   let celda=document.createElement("th")
   celda.innerText=ele
  
   cabecera.appendChild(celda)
   
 });
 tabla.appendChild(cabecera)

 for (let i = 0; i < constdatos[0].length; i++) {
   const th=document.createElement("th")
   th.innerText=""
   
   
 }
let tbody=document.createElement("tbody")
  constdatos.forEach(ele => {
    let linea = document.createElement("tr")
    tbody.appendChild(linea)
    ele.forEach(cel => {
      let celda=document.createElement("td")
      celda.innerText=cel
      linea.appendChild(celda)

    });



  });
  tabla.appendChild(tbody)
  container.appendChild(tabla)
}
