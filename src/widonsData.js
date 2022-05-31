import { CONFIG } from "../index.js"
import { getAPIdata } from "./api.js"



export async function renderWindowsData(){
	
//const data=sccwindowData
console.log("wdonswdata llamado a las "+Date())
const petBody={'resourcePath':'/ivs/getpvadata','httpMethod':'post','processName':'induct','requestBody':{'nodeId':CONFIG.site,'cycleIds':['CYCLE_1'],'processPath':'induct'}}

const data= await getAPIdata(petBody)
console.log(data)


const sccData=data.flowPVAData[15]
console.log(sccData)

const induction=data.flowPVAData[15][0]
const sortation=data.flowPVAData[15][2]
console.log(sortation)
let totalAts=0
let windowContainer=document.querySelector("#windows15Data")
windowContainer.innerHTML=""
induction.dataPointList.forEach((ele,index)=>{
    let sort=sortation.dataPointList[index].metricValue
     totalAts =totalAts+(ele.metricValue-sort)
     let time =new Date(ele.timeStampVal)
     let bufferInMinutes

     if(sort===0){ bufferInMinutes=0}
     else(
      bufferInMinutes=totalAts/sort*15)

    
    
    //{type:"",class:"",content:""}
    let title=` ${time.getHours()}:${String(time.getMinutes()).padEnd(2,"0")}-${time.getHours()}:${String(time.getMinutes()+15).padEnd(2,"0")} `
    let 	flowRatexCent=ele.metricValue/sort*100

	if (isNaN(flowRatexCent)){flowRatexCent=0}
    let partialWindow=createNewEle({type:"div",class:"divContainer",content:title})
    if(bufferInMinutes>14.9 && bufferInMinutes<30.1){partialWindow.classList.add("passed")}else{partialWindow.classList.add("failed")}
    let sortData=createNewEle({type:"div",class:"windowData",content:`Induction=${ele.metricValue}`})
    let inductData=createNewEle({type:"div",class:"windowData",content:`Sortattion=${sort}`})
    let AtsData=createNewEle({type:"div",class:"windowData",content:`AtStation=${totalAts}`})
    let buffer=createNewEle({type:"div",class:"windowData",content:`Buffer=${bufferInMinutes.toFixed(1)}m`})
	let flowRate=createNewEle({type:"div",class:"windowData",content:`FlowRate=${flowRatexCent.toFixed(2)}%`})
    partialWindow.appendChild(inductData)
    partialWindow.appendChild(sortData)
    partialWindow.appendChild(AtsData)
    partialWindow.appendChild(buffer)
	partialWindow.appendChild(flowRate)
	windowContainer.appendChild(partialWindow)
    let a= document.createElement("w")
   
    
    
})



function createNewEle(ele){
    const newEle= document.createElement(ele.type)
    newEle.classList.add(ele.class)
    newEle.textContent =ele.content
    
    return newEle
}
}









 const  dataa={
	"flowPVAData": {
		"15": [
			{
				"dataPointList": [
					{
						"metricValue": 305,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 308,
						"timeStampVal": "2022-05-28T01:15"
					},
					{
						"metricValue": 506,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": 467,
						"timeStampVal": "2022-05-28T01:45"
					},
					{
						"metricValue": 298,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 313,
						"timeStampVal": "2022-05-28T02:15"
					},
					{
						"metricValue": 225,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": 102,
						"timeStampVal": "2022-05-28T02:45"
					},
					{
						"metricValue": 405,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 366,
						"timeStampVal": "2022-05-28T03:15"
					},
					{
						"metricValue": 384,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": 113,
						"timeStampVal": "2022-05-28T03:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:15"
					},
					{
						"metricValue": 410,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": 401,
						"timeStampVal": "2022-05-28T04:45"
					},
					{
						"metricValue": 348,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T05:15"
					},
					{
						"metricValue": 379,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 388,
						"timeStampVal": "2022-05-28T05:45"
					},
					{
						"metricValue": 66,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "IND",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:45"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T06:15"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T06:45"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T07:15"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T07:45"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 293,
						"timeStampVal": "2022-05-28T08:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "IND",
				"taskCountType": "Planned"
			},
			{
				"dataPointList": [
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 220,
						"timeStampVal": "2022-05-28T01:15"
					},
					{
						"metricValue": 362,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": 369,
						"timeStampVal": "2022-05-28T01:45"
					},
					{
						"metricValue": 326,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 340,
						"timeStampVal": "2022-05-28T02:15"
					},
					{
						"metricValue": 323,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": 283,
						"timeStampVal": "2022-05-28T02:45"
					},
					{
						"metricValue": 268,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 351,
						"timeStampVal": "2022-05-28T03:15"
					},
					{
						"metricValue": 332,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": 220,
						"timeStampVal": "2022-05-28T03:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:15"
					},
					{
						"metricValue": 297,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": 309,
						"timeStampVal": "2022-05-28T04:45"
					},
					{
						"metricValue": 366,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 340,
						"timeStampVal": "2022-05-28T05:15"
					},
					{
						"metricValue": 357,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 394,
						"timeStampVal": "2022-05-28T05:45"
					},
					{
						"metricValue": 73,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:45"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:15"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:45"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:15"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:45"
					},
					{
						"metricValue": 322,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T06:15"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T06:45"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T07:15"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T07:45"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T08:15"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Planned"
			}
		],
		"30": [
			{
				"dataPointList": [
					{
						"metricValue": 613,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 973,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": 611,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 327,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": 771,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 497,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 811,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": 666,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 767,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 67,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "IND",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "IND",
				"taskCountType": "Planned"
			},
			{
				"dataPointList": [
					{
						"metricValue": 220,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 731,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": 666,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 606,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": 619,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 552,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 606,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": 706,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 751,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 71,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:30"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:30"
					},
					{
						"metricValue": 640,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 636,
						"timeStampVal": "2022-05-28T06:30"
					},
					{
						"metricValue": 636,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 636,
						"timeStampVal": "2022-05-28T07:30"
					},
					{
						"metricValue": 636,
						"timeStampVal": "2022-05-28T08:00"
					},
					{
						"metricValue": 318,
						"timeStampVal": "2022-05-28T08:30"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Planned"
			}
		],
		"60": [
			{
				"dataPointList": [
					{
						"metricValue": 1586,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 938,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 1268,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 811,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 1433,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 67,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					}
				],
				"metricName": "IND",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 1172,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 1172,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 586,
						"timeStampVal": "2022-05-28T08:00"
					}
				],
				"metricName": "IND",
				"taskCountType": "Planned"
			},
			{
				"dataPointList": [
					{
						"metricValue": 951,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": 1272,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": 1171,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": 606,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": 1457,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 71,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 0,
						"timeStampVal": "2022-05-28T08:00"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Actual"
			},
			{
				"dataPointList": [
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T01:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T02:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T03:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T04:00"
					},
					{
						"metricValue": -1,
						"timeStampVal": "2022-05-28T05:00"
					},
					{
						"metricValue": 1276,
						"timeStampVal": "2022-05-28T06:00"
					},
					{
						"metricValue": 1272,
						"timeStampVal": "2022-05-28T07:00"
					},
					{
						"metricValue": 954,
						"timeStampVal": "2022-05-28T08:00"
					}
				],
				"metricName": "SORTED",
				"taskCountType": "Planned"
			}
		]
	}
}