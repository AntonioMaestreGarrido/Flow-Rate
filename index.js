const windowData = {
  window: 0,
  ATs: 0,
  InducAct: 0,
  StowAct: 0,
  IductTotal: 0,
  StowTotal: 0,
};

let ATsAct = 0,
  ATsMax = 0,
  ATsMin = 0,
  ATsOpt = 0;
let StowRateAct = 0,
  StowRateMin = 0,
  StowRateMax = 0,
  StowRateOpt = 0;
  StowRateCustom=0
let InductRateAct = 0,
  InductRateMin = 0,
  InductRateMax = 0,
  InductRateOpt = 0;
  InductRateCustom=0
let MinutesToCheck = 0,
  ATsAtTime = 0;
  ATsAtTimeCustom=0
let date = new Date();
let encendido = false;
let parcelStowedThisWindow

const refreshButton = document.getElementById("refresh");
const encenderButton = document.getElementById("encender");

document.getElementById("StowRateCustom").addEventListener('change',fillCustom)
document.getElementById("StowInductCustom").addEventListener('change',fillCustom)


function fillCustom(){
  InductRateCustom=parseInt( document.getElementById('InductRateCustom').textContent)
  StowRateCustom=parseInt( document.getElementById('StowRateCustom').textContent)
  ATsAtTimeCustom = parseInt(((InductRateCustom - StowRateCustom) / 60) * MinutesToCheck + ATsAct);

}


//refreshButton.addEventListener("click", () => apitest());

console.log("hola");

async function apitest() {
  console.log("fetching server")
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
  ATsAct = parseInt(data.ATs);
  StowRateAct = parseInt(data.stowRate);
  InductRateAct = parseInt(data.inductRate);
  let stowRateMinute = StowRateAct / 60;
  let inductRateMinute = InductRateAct / 60;
  MinutesToCheck = 15 - (date.getMinutes() % 15);
  console.log(InductRateAct, StowRateAct, MinutesToCheck, ATsAct);
  let ritmo = parseInt(InductRateAct - StowRateAct);
  ATsAtTime = parseInt((ritmo / 60) * MinutesToCheck + ATsAct);

  

  ATsMax = StowRateAct / 2;
  ATsMin = StowRateAct / 4;
  ATsOpt = (ATsMax + ATsMin) / 2;

  StowRateMin = parseInt((StowRateAct * ATsMax) / ATsAct);
  StowRateMax =parseint( (ATsMax-ATsAct)/MinutesToCheck+StowRateAct);
  StowRateOpt = parseInt( (ATsMin-ATsAct)/MinutesToCheck+StowRateAct);

  InductRateMax = parseInt((InductRateAct * ATsMax) / ATsAct);
  InductRateMin = parseInt((InductRateAct * ATsMin) / ATsAct);
  InductRateOpt = parseInt((InductRateAct * ATsOpt) / ATsAct);

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
  document.getElementById("ATsAtTimeCustom").innerText = ATsAtTime;
  
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
    document.getElementById("ATsAct").style.backgroundColor = "green";
  }
  if (ATsAtTime > ATsMax || ATsAtTime < ATsMin) {
    document.getElementById("ATsAtTime").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTime").style.backgroundColor = "green";
  }
  if (ATsAtTimeCustom > StowRateCustom/2 || StowRateCustom / 4) {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor = "green";
  }
}
function main() {
  do {
    console.log("on");
    console.log(encendido);
    //apitest()
  } while (encendido);
}
apitest()
console.log("arrancando")
setInterval(apitest,20000)
//console.log("testpost");
//const obj = { atts: 10, ratio: "a tope" };

async function testPost() {
  let link = "http://localhost:3000/send?obj=" + JSON.stringify(obj);
  console.log(link);
  await fetch(link).catch(() => alert("No se encuentra el servidor"));

  /*


  console.log("testpost")
    const rawResponse = await fetch('localhost:3000/test', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const content = await rawResponse.json();
  
    console.log(content);
  */
}
