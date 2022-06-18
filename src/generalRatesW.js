import { CONFIG } from "../index.js";
import { getAPIdata } from "./api.js";

export async function renderGeneralRates(sccData) {
  const start=new Date(sccData.dataPointList[0].timeStampVal)
  const end=new Date(sccData.dataPointList[sccData.dataPointList.length-1].timeStampVal)
  const shiftDuration=(end-start)/1000/60
  const worktime=(shiftDuration-30-15)/60 //tiempo del turno en minutos menos descanso y menos primera ventana o ultima
  console.log((end-start)/1000/60)
  const petBody = {
    resourcePath: "/ivs/getPackageMetric",
    httpMethod: "post",
    processName: "induct",
    requestBody: {
      nodeId: CONFIG.site,
      filters: { Cycle: ["CYCLE_1"] },
      groupBy: "Node",
      metricList: [
        "CURRENT_CYCLE_RECEIVED",
        "OTHER_CYCLE_RECEIVED",
        "PENDING_DEPART_FROM_UPSTREAM",
        "PENDING_DEPART_FROM_UPSTREAM_UNPLANNED",
        "IN_TRANSIT_FROM_UPSTREAM",
        "IN_TRANSIT_FROM_UPSTREAM_UNPLANNED",
        "PENDING_INDUCT",
        "PENDING_INDUCT_UNPLANNED",
        "PENDING_RE_INDUCT",
        "PENDING_RE_INDUCT_UNPLANNED",
        "INDUCTED_AT_STATION",
        "PLANNED_MANIFESTED",
        "SIDELINE",
      ],
    },
  };
  const data = await getAPIdata(petBody);
  console.log(data);
  console.log(data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site])
  document.querySelector(".volumeExpected").textContent=`Volume Expected: ${data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site]}`
  document.querySelector(".inductHourlyRate").textContent=`Induct Hr: ${(data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site]/worktime).toFixed(0)}`
  document.querySelector(".stowHourlyRate").textContent=`Stow Hr: ${(data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site]/worktime).toFixed(0)}`
  document.querySelector(".inductWindowRate").textContent=`Induct Wr: ${(data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site]/(worktime*4)).toFixed(0)}`
  document.querySelector(".stowWindowRate").textContent=`Stow Wr: ${(data.groupedPackageMetrics.PLANNED_MANIFESTED[CONFIG.site]/(worktime*4)).toFixed(0)}`
  document.querySelector(".startTime").textContent=`Start time: ${String(start.getHours()).padStart(2,"0")}:${String(start.getMinutes()).padEnd(2,"0")}`
  document.querySelector(".endTime").textContent=`End time: ${String(end.getHours()).padStart(2,"0")}:${String(end.getMinutes()).padEnd(2,"0")}`
  document.querySelector(".sideline").textContent=`Sideline: ${data.groupedPackageMetrics.SIDELINE[CONFIG.site]}`
  
}
