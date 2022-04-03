let database;
let myChart;
let myPieChart
const inducRateArray = [];
const stowRateArray = [];
const AtsArray = [];
const times = [];
const maxAts = [];
const minAts = [];

export function updateChart(data) {
  //{ InductRateAct, StowRateAct, ATsAct, "hora": new Date().getHours(),"minuto":new Date().getMinutes() }

  //     0: {label: 'inducRateArray', data: Array(25), backgroundColor: 'red', borderColor: 'red', tension: '0.2'}
  //     1: {label: 'stowRateArray', data: Array(25), backgroundColor: 'blue', borderColor: 'blue', tension: '0.2'}
  //     2: {label: 'maxAts', data: Array(25), backgroundColor: 'green', borderColor: 'green', tension: '0.2'}
  //     3: {label: 'minAts', data: Array(25), backgroundColor: 'green', borderColor: 'green', tension: '0.2'}
  //     4: {label: 'AtsArray', data: Array(25)}
  myChart.data.datasets[0].data.push(data.InductRateAct)

  myChart.data.datasets[1].data.push(data.StowRateAct)
  myChart.data.datasets[4].data.push(data.ATsAct)
      maxAts.push(StowRateAct/2)

      minAts.push(StowRateAct/4)
      if(data.minuto%15===0){
          if(data.passed){myPieChart.data.datasets[0].data[0]=myPieChart.data.datasets[0].data[0]+1}
          else{myPieChart.data.datasets[0].data[1]=myPieChart.data.datasets[0].data[1]+1}

      }
      myChart.update()
      myPieChart.update()
      console.log("actualizado")
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
drawPased();
}

export async function testChart() {
  await getDataBase();

  drawChart();
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
  setWorkTime();
  drawPased();
  

  database = await fetch("http://localhost:3000/getData").then((response) =>
    response.json()
  );
  const ctx = document.getElementById("test").getContext("2d");

  for (const key of database) {
    inducRateArray.push(parseInt(key.InductRateAct));
    stowRateArray.push(parseInt(key.StowRateAct));
    AtsArray.push(parseInt(key.ATsAct));
    maxAts.push(parseInt(key.ATsAct) / 2);
    minAts.push(parseInt(key.ATsAct) / 4);
    times.push(key.minutos);
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: y,
      datasets: [
        {
          label: "inducRateArray",
          data: inducRateArray,
          backgroundColor: "red",
          borderColor: "red",
          tension: "0.2",
        },
        {
          label: "stowRateArray",
          data: stowRateArray,
          backgroundColor: "blue",
          borderColor: "blue",
          tension: "0.2",
        },
        {
          label: "maxAts",
          data: maxAts,
          backgroundColor: "green",
          borderColor: "green",
          tension: "0.2",
        },
        {
          label: "minAts",
          data: minAts,
          backgroundColor: "green",
          borderColor: "green",
          tension: "0.2",
        },
        {
          label: "AtsArray",
          data: AtsArray,
          backgroundColor: "black",
          borderColor: "black",
          tension: "0.2",
        },
      ],
    },
    options: {
      animation: true,
      scales: {
        x: {
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function (val, index) {
              // Hide every 2nd tick label
              ///console.log( this.getLabelForValue(val),index)
              return index % 5 === 0 ? this.getLabelForValue(val) : null;
            },
          },
        },
        y: {
          beginAtZero: false,
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
    const complyArray=[]
  let database = await getDataBase();
    let inicio={
        'hora':1,
        'minuto':30
    }
    database.forEach(ele => {
        
        if(ele.minuto%15===0){
            complyArray.push(ele)
        }
        
    });
   
    drawPie(complyArray)

}


function drawPie(complyArray){
    
    var passed=0
    var failed=0
    
    complyArray.forEach(ele => {
        if(ele.passed===true){
            passed++
        }else{
            failed++
        }
        
    });
      myPieChart = new Chart(document.getElementById("pieComply"), {
        type: 'pie',
        data: {
          labels: [`Passed ${passed*100/(passed+failed)}%`, `Failed ${failed*100/(passed+failed)}%`],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["green", "red"],
              data: [passed,failed]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: '% Of Time Comply'
          }
        }
    });console.log("pie",myPieChart.data.datasets[0].data[0])
    
}