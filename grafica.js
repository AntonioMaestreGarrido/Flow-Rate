let database;
let myChart;
let myPieChart;
const inducRateArray = [];
const stowRateArray = [];
const AtsArray = [];
const times = [];
const maxAts = [];
const minAts = [];
const epochArray=[]

export function updateChart(data) {
  //{ InductRateAct, StowRateAct, ATsAct, "hora": new Date().getHours(),"minuto":new Date().getMinutes() }
  // 0: {label: 'Induct Rate', data: Array(117), backgroundColor: 'red', borderColor: 'red', tension: '0.2', …}
  // 1: {label: 'ATs', data: Array(117), parsing: {…}, backgroundColor: 'green', borderColor: 'green', …}
  // 2: {label: 'Stow Rate', data: Array(117), parsing: {…}, backgroundColor: 'blue', borderColor: 'blue', …}
  // 3: {label: 'Max Ats', data: Array(117), parsing: {…}, pointRadius: '0', backgroundColor: 'black', …}
  // 4: {label: 'Min Ats', data: Array(117), parsing: {…}, pointRadius: '0', backgroundColor: 'black', …}
  //**************************************************** */
  // console.log('intentado actuializar',data)
  // console.log('datos del chart',myChart.data.datasets)
  // console.log("data4",myChart.data.datasets[4].data)
  // myChart.data.datasets[0].data.push(data.InductRateAct);
  // myChart.data.datasets[1].data.push(data.ATsAct);
  // myChart.data.datasets[2].data.push(data.StowRateAct);
  // myChart.data.datasets[3].data.push(data.MaxAts);
  // myChart.data.datasets[4].data.push(data.MinAts);
  console.log('pre',database)
  database.push(data)
  console.log('post',database)

  // if (data.minuto % 15 === 0) {
  //   if (data.passed) {
  //     myPieChart.data.datasets[0].data[0] =
  //       myPieChart.data.datasets[0].data[0] + 1;
  //   } else {
  //     myPieChart.data.datasets[0].data[1] =
  //       myPieChart.data.datasets[0].data[1] + 1;
  //   }
  // }
  
  myChart.update();
  
  //console.log(myChart.data.datasetsmyChart.data.datasets)
  //myPieChart.data.datasets[0].data[0] passed
}
export async function addtest() {
  //     console.log(myChart.data.labels)
  //    let n=Math.floor(Math.random()*500+500)
  //    //myChart.data.datasets[0].data.push(n)
  //    myChart.data.labels.push(n)
  // let newdata

  //    myChart.update()
  //   const char = document.getElementById("test");
  //   document.getElementById("test").style.backgroundColor = "red";
  //   char.parentNode.removeChild(document.getElementById("test"));

  //   let newCanvas = document.createElement("canvas");
  //   newCanvas.id = "test";
  //   document.getElementById("canvasContainer").appendChild(newCanvas);
  //   drawChart();
  
}

export async function testChart() {
  await getDataBase().then(myChart.update());

  //drawChart();
}

async function getDataBase() {
  await fetch("http://localhost:3000/getData")
    .then((response) => response.json())
    .then((data) => {
      database = data;
    })
    .catch((error) => alert("No se encuentra el servidor", error));
  return await database;
}
let y = [];

export async function drawChart() {
  drawPased();

  database = await fetch("http://localhost:3000/getData").then((response) =>
    response.json()
  );
  const ctx = document.getElementById("test").getContext("2d");

  for (const key of database) {
    inducRateArray.push(parseInt(key.InductRateAct));
    stowRateArray.push(parseInt(key.StowRateAct));
    AtsArray.push(parseInt(key.ATsAct));
    maxAts.push(parseInt(key.StowRateAct) / 2);
    minAts.push(parseInt(key.StowRateAct) / 4);
    times.push(key.minutos);
    epochArray.push(key.epoch)
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Induct Rate",
          data: database,
          backgroundColor: "red",
          borderColor: "red",
          tension: "0.2",
          parsing: {
            yAxisKey: "InductRateAct",
          },
        },
        {
          label: "ATs",
          data: database,
          parsing: {
            yAxisKey: "ATsAct",
          },
          backgroundColor: "green",
          borderColor: "green",
          tension: "0.2",
          indexAxis: "y",
        },
        {
          label: "Stow Rate",
          data: database,
          parsing: {
            yAxisKey: "StowRateAct",
          },
          backgroundColor: "blue",
          borderColor: "blue",
          
          tension: "0.2",
          indexAxis: "y",
        },
        {
          label: "Max Ats",
          data: database,
          parsing: {
            yAxisKey: "ATsMax",
          },
          pointRadius:"0",
          backgroundColor: "black",
          borderColor: "black",
          tension: "0.2",
          indexAxis: "y",
        },{
          label: "Min Ats",
          data: database,
          parsing: {
            yAxisKey: "ATsMin",
          },
          pointRadius:"0",
          backgroundColor: "black",
          borderColor: "black",
          tension: "0.2",
          indexAxis: "y",
        },
      ],
    },
    options: {
      pointRadius:"0",
      parsing: { xAxisKey: "epoch" },
      animation: true,
      scales: {
        xAxisKey: {
          type: "time",
          time: {
            unit: "minute",
            displayFormats: {
              minute: "HH:mm",
            },
          },
        },
        yAxis: {
          beginAtZero: false,
          type: "linear",
        },
      },
    },
  });
  console.log(myChart.data.datasets);
}

function setWorkTime() {
  // Las horas de inicio y final estan hardcoded ,se calcula cuantos intervalos de un minuto hay en el tiempo de trabajp para la coordenada Y de la grafica
  const inicio = new Date();
  inicio.setHours("01");
  inicio.setMinutes("30");
  inicio.setSeconds("00");

  const final = new Date();
  final.setHours("9");
  final.setMinutes("00");
  final.setSeconds("00");

  y = [];
  while (inicio <= final) {
    y.push(inicio.getHours() + ":" + addZero(inicio.getMinutes()));
    inicio.setMinutes(inicio.getMinutes() + 1);
  }
}

/***************************************************pequeña funcion para añadir un 0 a los minutos  */
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

async function drawPased() {
  const complyArray = [];
  let database = await getDataBase();
  let inicio = {
    hora: 1,
    minuto: 30,
  };
  database.forEach((ele) => {
    if (ele.minuto % 15 === 0) {
      complyArray.push(ele);
    }
  });

  drawPie(complyArray);
}

function drawPie(complyArray) {
  var passed = 0;
  var failed = 0;

  complyArray.forEach((ele) => {
    if (ele.passed === true) {
      passed++;
    } else {
      failed++;
    }
  });
  myPieChart = new Chart(document.getElementById("pieComply"), {
    type: "pie",
    data: {
      labels: [
        `Passed ${(passed * 100) / (passed + failed)}%`,
        `Failed ${(failed * 100) / (passed + failed)}%`,
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["green", "red"],
          data: [passed, failed],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "% Of Time Comply",
      },
    },
  });
  console.log("pie", myPieChart.data.datasets[0].data[0]);
}
