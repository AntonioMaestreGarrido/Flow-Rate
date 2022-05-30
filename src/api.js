export async function getAPIdata(peticion){
   

    let scc=await fetch("http://localhost:3000/testpost",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json, text/plain, */*",
          },
        body: JSON.stringify(peticion)
        //body:'{"resourcePath":"/ivs/getpvadata","httpMethod":"post","processName":"induct","requestBody":{"nodeId":"DQA2","cycleIds":["CYCLE_1"],"processPath":"induct"}}'
    })
                                
                                
    .then((response) => response.json())
    .then((data) => {
        console.log("succes")
        let scc=data
       
        return scc
      
    })
    .catch((error) => console.log("No se ha podido acceder a SSC", error));
    return scc

}

export async function getAPIgetdata(link){


  
  
    let data =await fetch("http://localhost:3000/wipData")
                                
                                
      .then((response) => response.json())
      .then((data) => {
          
          return data
        
      })
      .catch((error) => console.log("No se ha podido acceder a SSC", error));
      
      return data
  }
    
    
//receive data
//{"resourcePath":"/ivs/getNodeLineHaulList","httpMethod":"post","processName":"induct","requestBody":{"nodeId":"DQA2","groupBy":""}}