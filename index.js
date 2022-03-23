

let ATsAct, ATsMax, ATsMin, ATsOpt;
let StowRateAct, StowRateMin, StowRateMax, StowRateOpt;
let InductRateAct, InductRateMin, InductRateMax, InductRateOpt;
let MinutesToCheck, ATsAtTime;
let date = new Date();
let encendido = false;

const refreshButton = document.getElementById("refresh");
const encenderButton = document.getElementById("encender");

refreshButton.addEventListener("click", () => apitest());
encenderButton.addEventListener("click", () => {
  encendido = !encendido;
  if (encendido) {
    encenderButton.innerText = "On";
    main();
  } else {
    encenderButton.innerText = "Of";
  }
});

async function apitest() {
  let data2;
  //await  fetch("http://localhost:3000")
  /*
 Dirección IPv4. . . . . . . . . . . . . . : 192.168.15.230
 Máscara de subred . . . . . . . . . . . . : 255.255.255.0
 Puerta de enlace predeterminada . . . . . : 192.168.15.1

 stowRate, ATs, inductRate
 */
  await fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((data) => {
      let datos = data;
      calculate(datos);
    })
    .catch(() => alert("No se encuentra el servidor"));
}
function calculate(data) {

  let date = new Date();
  ATsAct = parseInt( data.ATs)
  StowRateAct =parseInt( data.stowRate)
  InductRateAct =parseInt( data.inductRate)
  let stowRateMinute = StowRateAct / 60;
  let inductRateMinute = InductRateAct / 60;
  MinutesToCheck = 15 - (date.getMinutes() % 15);
  console.log(InductRateAct,StowRateAct,MinutesToCheck,ATsAct)
  let ritmo=parseInt(InductRateAct-StowRateAct)
  ATsAtTime = parseInt((ritmo/60*MinutesToCheck)+ATsAct)

  ATsMax = StowRateAct / 2;
  ATsMin = StowRateAct / 4;
  ATsOpt = (ATsMax + ATsMin) / 2;

  StowRateMin = parseInt((StowRateAct / ATsMin) * ATsAct);
  StowRateMax = parseInt((StowRateAct / ATsMax) * ATsAct);
  StowRateOpt = parseInt((StowRateAct / ATsOpt) * ATsAct);

  InductRateMin = parseInt((InductRateAct / ATsMin) * ATsAct);
  InductRateMax = parseInt((InductRateAct / ATsMax) * ATsAct);
  InductRateOpt = parseInt((InductRateAct / ATsOpt) * ATsAct);

  filltable();
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
  giveStyle();
}
function giveStyle() {
  if (ATsAct > ATsMax || ATsAct < ATsMin) {
    document.getElementById("ATsAct").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAct").style.backgroundColor = "green";
  }
  if (ATsAtTime > ATsMax || ATsAtTime < ATsMin) {
    document.getElementById("ATsAtTime").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTime").style.backgroundColor = "green";
  }
}
function main() {
  do {
    console.log("on");
    console.log(encendido)
    //apitest()
  } while (encendido);
}
setInterval('apitest()',30000)
