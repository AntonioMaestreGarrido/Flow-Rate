console.log("test");

async function apitest() {
    let data2
 await  fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((data) =>{let datos=data;test(data)});
    
 
 
}

async function test(data){
    console.log('data')
    console.log(data)
    document.getElementById('ATs').innerText=`Tenemos un total de ${data.ATs} ATs`
    document.getElementById('stowRate').innerText=`Tenemos un ritmo de Stow de ${data.stowRate} paquetes por hora`
    document.getElementById('inductRate').innerText=`Tenemos un ritmo de induccion de ${data.inductRate} paquetes por hora`
}
apitest()
