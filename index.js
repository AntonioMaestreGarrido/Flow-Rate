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
  console.log("ATsCustom", ATsCustom);
}

//refreshButton.addEventListener("click", () => apitest());

async function apitest() {
  console.log("fetching server");
  let data2;
  //await  fetch("http://localhost:3000")
  /*..
 Dirección IPv4. . . . . . . . . . . . . . : 192.168.15.230
 Máscara de subred . . . . . . . . . . . . : 255.255.255.0
 Puerta de enlace predeterminada . . . . . : 192.168.15.1

 stowRate, ATs, inductRate
 */
  await fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((data) => {
      let datos = data;
      console.log(datos);
      calculate(datos);
    })
    .catch((error) => alert("No se encuentra el servidor", error));
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
  if (MinutesToCheck === 0) {
    takeWindowData();
  }
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
    document.getElementById("ATsAct").style.backgroundColor = "rgb(109, 230, 109)";
  }
  if (ATsAtTime > ATsMax || ATsAtTime < ATsMin) {
    document.getElementById("ATsAtTime").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTime").style.backgroundColor = "rgb(109, 230, 109)";
  }
  console.log("StowRateCustom", StowRateCustom);
  console.log("ATsAtTimeCustom", ATsAtTimeCustom);
  if (
    ATsAtTimeCustom > StowRateCustom / 2 ||
    ATsAtTimeCustom < StowRateCustom / 4
  ) {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor = "red";
  } else {
    document.getElementById("ATsAtTimeCustom").style.backgroundColor = "rgb(109, 230, 109)";
  }
}
function main() {
  setInterval(apitest, 20000);
}


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
function setupEventsListener() {
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

  startButton.addEventListener("click", () => handleStartButton());
  document.getElementById("copy").addEventListener("click",()=>copyData())
}
function copyData(){
  
  document.getElementById("ATsCustom").textContent=ATsAct
  document.getElementById("StowRateCustom").textContent=StowRateAct
  document.getElementById("InductRateCustom").textContent=InductRateAct
  document.getElementById("MinutesToCheckCustom").textContent=MinutesToCheck
  fillCustom()




}
function handleStartButton() {
  console.log(startButton.textContent);
  if (startButton.textContent === "Off") {
    startButton.textContent = "Running";
    apitest();
    handleStartButton.intervalID = setInterval(apitest, 15000);
    console.log(handleStartButton.intervalID);
  } else {
    startButton.textContent = "Off";
    clearInterval(handleStartButton.intervalID);
    console.log("intervalID", handleStartButton.intervalID);
  }
}

  let source = new EventSource("localhost:3000/test");
  source.addEventListener('message', message => {
    console.log("get")
    console.log('Got', message);
  })



let ATsfromEvent,StowFromEvent,InductFromEvent

document.getElementById("testbutton").addEventListener("click", () => {
  console.log("fetch sse");
 
 
 
  fetch("http://localhost:3000/test")
   

}
)