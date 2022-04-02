let database
let myChart
const inducRateArray = []
const stowRateArray = []
const AtsArray = []
const times = []
const maxAts=[]
const minAts=[]

export function updateChart(data){
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
    myChart.update()
    console.log("actualizado")
    //console.log(myChart.data.datasetsmyChart.data.datasets)


}
export async function addtest(){
    //     console.log(myChart.data.labels)    
    //    let n=Math.floor(Math.random()*500+500)
    //    //myChart.data.datasets[0].data.push(n)
//    myChart.data.labels.push(n)
// let newdata


//    myChart.update()
const char=document.getElementById('test')
document.getElementById("test").style.backgroundColor = "red";
char.parentNode.removeChild(document.getElementById('test'))

let newCanvas= document.createElement('canvas')
newCanvas.id="test"
document.getElementById('canvasContainer').appendChild(newCanvas)
drawChart()


}

export async function testChart() {
    await getDataBase()
    
    drawChart()
  }  

  async function getDataBase() {
    await fetch("http://localhost:3000/getData")  
      .then((response) => response.json())
      .then((data) => {
        database = data;  
        
        
    })  
    .catch((error) => alert("No se encuentra el servidor", error));
    
}    
let  y=[] 

export async function drawChart() {
      setWorkTime()
    
    database=  await fetch("http://localhost:3000/getData").then((response) => response.json())
    const ctx = document.getElementById('test').getContext('2d');
    
   
    for (const key of database) {
        
        inducRateArray.push(parseInt(key.InductRateAct))
        stowRateArray.push(parseInt(key.StowRateAct))
        AtsArray.push(parseInt(key.ATsAct))
        maxAts.push(parseInt(key.ATsAct)/2)
        minAts.push(parseInt(key.ATsAct)/4)
        times.push(key.minutos)
        
    }  
   
    
    myChart = new Chart(ctx, {
        type: 'line',   
        data: {
            labels: y,  
            datasets: [{
                label: 'inducRateArray',  
                data: inducRateArray,
                backgroundColor:'red',
                borderColor:'red',
                tension:'0.2'
                
                
            },{
                label: 'stowRateArray',  
                data: stowRateArray,
                backgroundColor:'blue',
                borderColor:'blue',
                tension:'0.2'
                
                
            }
            ,{
                label: 'maxAts',  
                data: maxAts,
                backgroundColor:'green',
                borderColor:'green',
                tension:'0.2'
                
                
            },{
                label: 'minAts',  
                data: minAts,
                backgroundColor:'green',
                borderColor:'green',
                tension:'0.2'
                
                
            },{
                label: 'AtsArray',  
                data: AtsArray
                
            }]  
        },  
        options: {
            animation: true,  
            scales: {
                x:{

                    ticks: {
                        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                        callback: function(val, index) {
                          // Hide every 2nd tick label
                          ///console.log( this.getLabelForValue(val),index)
                          return index % 5 === 0 ? this.getLabelForValue(val) : null;
                        }}












                },
                y: {
                    beginAtZero: false  ,
                   
          }  
        }  
    }  
});  
console.log(myChart.data.datasets)

}  

function setWorkTime(){
    // Las horas de inicio y final estan hardcoded ,se calcula cuantos intervalos de un minuto hay en el tiempo de trabajp para la coordenada Y de la grafica
    const inicio=new Date()
    inicio.setHours("01")
    inicio.setMinutes("30")
    inicio.setSeconds("00")
    
    const final=new Date()
    final.setHours("9")
    final.setMinutes("00")
    final.setSeconds("00")
    
    
    y=[]
    while (inicio <= final) {
        y.push(inicio.getHours()+":"+addZero(inicio.getMinutes()))
        inicio.setMinutes(inicio.getMinutes()+1)
      
        
    }
    

    

}


/***************************************************pequeña funcion para añadir un 0 a los minutos  */
function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

// await fetch("http://localhost:3000/getData").then((response) =>newdata= response.json())
  




//   var canvas = document.getElementById('updating-chart'),
//     ctx = canvas.getContext('2d'),
//     startingData = {
    //       labels: [1, 2, 3, 4, 5, 6, 7],
    //       datasets: [
        //           {
            //               fillColor: "rgba(220,220,220,0.2)",
            //               strokeColor: "rgba(220,220,220,1)",
            //               pointColor: "rgba(220,220,220,1)",
            //               pointStrokeColor: "#fff",
            //               data: [65, 59, 80, 81, 56, 55, 40]
            //           },
            //           {
                //               fillColor: "rgba(151,187,205,0.2)",
                //               strokeColor: "rgba(151,187,205,1)",
                //               pointColor: "rgba(151,187,205,1)",
                //               pointStrokeColor: "#fff",
                //               data: [28, 48, 40, 19, 86, 27, 90]
                //           }
                //       ]
                //     },
                //     latestLabel = startingData.labels[6];

// // Reduce the animation steps for demo clarity.
// var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});


// setInterval(function(){
//   // Add two random numbers for each dataset
//   myLiveChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
//   // Remove the first point so we dont just add values forever
//   myLiveChart.removeData();
// }, 5000);
