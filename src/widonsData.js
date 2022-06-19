import { CONFIG } from "../index.js";
import { getAPIdata } from "./api.js";
import { renderGeneralRates } from "./generalRatesW.js";

export async function renderWindowsData() {
  //let   complience=await compliencePorCent()//
  let volume=document.querySelector(".volumeExpected").textContent.match(/(\d+)/)
  let volumenTotal=1
  //let sideMatch=document.querySelector(".sideline").textContent.match(/(\d+)/)
  let side=0
 // if(sideMatch){
  //  side=sideMatch[0]
  //}
  console.log("el side es ",side)
  if(volume)
  {console.log(volume);volumenTotal=volume[0]}
  //const data=sccwindowData
  console.log("wdonswdata llamado a las " + Date());
  const petBody = {
    resourcePath: "/ivs/getpvadata",
    httpMethod: "post",
    processName: "induct",
    requestBody: {
      nodeId: CONFIG.site,
      cycleIds: ["CYCLE_1"],
      processPath: "induct",
    },
  };

  const data = await getAPIdata(petBody);

  console.log(data);

  const sccData = data.flowPVAData[15];
  console.log(sccData);
  renderGeneralRates(data.flowPVAData[15][2]);

  const induction = data.flowPVAData[15][0];
  const sortation = data.flowPVAData[15][2];
  console.log(sortation);
  let totalAts = 0;
  let windowContainer = document.querySelector("#windows15Data");
  windowContainer.innerHTML = "";
  let windowInfoContainer=document.createElement("div")
  let title=document.createElement("h2")
  title.textContent=`WIP compliance`
  windowInfoContainer.appendChild(title)
  let windowtotal=document.createElement("p")
  let windowPassed=document.createElement("p")
  windowContainer.appendChild(windowInfoContainer)
  windowInfoContainer.appendChild(windowtotal)
  windowInfoContainer.appendChild(windowPassed)

  let   complience=await compliencePorCent()
  induction.dataPointList.forEach((ele, index) => {
    let sort = sortation.dataPointList[index].metricValue;
    totalAts = totalAts + (ele.metricValue - sort);// experimentando con el side
    let time = new Date(ele.timeStampVal);
    let bufferInMinutes;

    if (sort === 0) {
      bufferInMinutes = 0;
    } else bufferInMinutes = ((totalAts-side) / sort) * 15;

    //{type:"",class:"",content:""}
    let title = ` ${time.getHours()}:${String(time.getMinutes()).padEnd(
      2,
      "0"
    )}-${time.getHours()}:${String(time.getMinutes() + 15).padEnd(2, "0")} `;
    let flowRatexCent = (ele.metricValue / sort) * 100;

    if (isNaN(flowRatexCent) || flowRatexCent === Infinity) {
      flowRatexCent = 0;
    }

    let windowTime = new Date(ele.timeStampVal).getTime();
    let now = new Date().getTime();

    // console.log(now, new Date(windowTime), now > windowTime);
    if (now > windowTime + 15 * 60 * 1000) {
      let partialWindow = createNewEle({ type: "div", class: "divContainer" });
      let timeWindowMark = createNewEle({
        type: "div",
        class: "title",
        content: title,
      });
      console.log(index,induction.dataPointList.length-1);
      
      console.log((volumenTotal/complience.total/15*2))
      if ((bufferInMinutes > 14.9 && bufferInMinutes < 30.1) || sort < 62|| index==induction.dataPointList.length-1) {
        timeWindowMark.classList.add("passed");
      } else {
        timeWindowMark.classList.add("failed");
      }

      //console.log(ele.timeStampVal.getHours());
      let sortData = createNewEle({
        type: "div",
        class: "windowData",
        content: `Induction=${ele.metricValue}`,
      });
      let inductData = createNewEle({
        type: "div",
        class: "windowData",
        content: `Sortattion=${sort}`,
      });
      let AtsData = createNewEle({
        type: "div",
        class: "windowData",
        content: `AtStation=${totalAts}`,
      });
      let buffer = createNewEle({
        type: "div",
        class: "windowData",
        content: `Buffer=${bufferInMinutes.toFixed(1)}m`,
      });
      let flowRate = createNewEle({
        type: "div",
        class: "windowData",
        content: `FlowRate=${flowRatexCent.toFixed(2)}%`,
      });
      partialWindow.appendChild(timeWindowMark);
      partialWindow.appendChild(inductData);
      partialWindow.appendChild(sortData);
      partialWindow.appendChild(AtsData);
      partialWindow.appendChild(buffer);
      partialWindow.appendChild(flowRate);
      windowContainer.appendChild(partialWindow);
    }
  });

  function createNewEle(ele) {
    const newEle = document.createElement(ele.type);
    newEle.classList.add(ele.class);
    newEle.textContent = ele.content;

    return newEle;
  }
  t =await compliencePorCent()
   title.textContent=`WIP compliance ${complience.txC}% `
   windowtotal.textContent=`Windows ${complience.pass+complience.failed}`
   windowPassed.textContent=`Passed ${complience.pass}`
   return true

}
async function compliencePorCent(){
  let pass=0
  let failed=0
  let txC
  let total
  let container=document.querySelectorAll(".divContainer")
  container.forEach((ele)=>{if(ele.querySelectorAll(".passed").length>0){pass++}else{failed++}})
  console.log(pass,failed)
  txC=(pass*100/ (pass+failed)).toFixed("2")
  total=pass+failed
  if(isNaN(txC)){txC=0}
  return{pass,failed,total,txC}
}





export async function getRanking(){
  let actualSite=CONFIG.site // guarda el site actual para reinstaurarlo despues del ranking
  const sites=["DQB2",
  "DQZ5",
  "DAS1",
  "DGA2",
  "DIC1",
  "DQA2",
  "DMA2",
  "DMA3",
  "DMA4",
  "DMA6",
  // "DMZ1",
  "DMZ2",
  "DMZ4",
  "DCZ3",
  "DCT2",
  "DCT4",
  "DCT9",
  "DQA7",
  "DCT7",
  "DCZ4",
  "DQA4",
  "DQV6",
  "DQV2",
  "DQV1"]
  
  
  const ranking=[]
  for (let i = 0; i < sites.length; i++) {
    CONFIG.site=sites[i];
    await renderWindowsData()
    let t =await compliencePorCent()
    console.log(t)
    ranking.push({"site":sites[i],"percentil":t.txC})
    
  }
  console.log(ranking.sort((a,b)=> b.percentil- a.percentil ))

    
    renderRanking(ranking)
    console.log(CONFIG.site)
    CONFIG.site=actualSite
    renderWindowsData()
// ranking.push({ele:t.txC})
    return ranking
  
}
function renderRanking(ranking){
  let container=document.querySelector("#rankingcontainer")
  container.innerHTML=""
  for (let i = 0; i < ranking.length; i++) {
    let siteInRanking=document.createElement("div")
    siteInRanking.textContent=`${(String( i+1).padStart(2,"0"))} - ${ranking[i].site} - ${ranking[i].percentil}%`
    container.appendChild(siteInRanking)

    
  }

}
// ["DQB2",
// "DQZ5",
// "DAS1",
// "DGA2",
// "DIC1",
// "DQA2",
// "DMA2",
// "DMA3",
// "DMA4",
// "DMA6",
// "DMZ1",
// "DMZ2",
// "DMZ4",
// "DCZ3",
// "DCT2",
// "DCT4",
// "DCT9",
// "DQA7",
// "DCT7",
// "DCZ4",
// "DQA4",
// "DQV2"]
