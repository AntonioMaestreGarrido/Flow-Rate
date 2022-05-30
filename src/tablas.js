//containerName nombre del div a buiscar
//constdatos array con los datos
//campos especifica que columnas se van a renderizar
export function creaTabla(containerName, constdatos, campos) {
  if (constdatos.length<=0){return}
  purgaObj(constdatos, campos);
  let datos = purgaObj(constdatos, campos);
  const container = document.getElementById(containerName);

  const filas = datos.length;
  const columnas = datos[0].length;

  let tabla = document.createElement("table");
  tabla.id = `${containerName}Table`;

  let cabecera = document.createElement("tr");
  for (const key in datos[0]) {
    let celda = document.createElement("th");
    celda.innerText = key;
    cabecera.appendChild(celda);
  }

  tabla.appendChild(cabecera);
  // console.log(constdatos[0].length)=8
  // console.log(constdatos.length)=3

  const tbody = document.createElement("tbody");
  datos.forEach((ele) => {
    let linea = document.createElement("tr");
    for (const key in ele) {
      let celda = document.createElement("td");
      celda.innerText = ele[key];
      linea.appendChild(celda);
    }
    tbody.appendChild(linea);
  });

  tabla.appendChild(tbody);
  container.appendChild(tabla);
}
function purgaObj(arrayObj, lista = []) {
  arrayObj.forEach((ele) => {
    ele.alias=ele.alias.replace("@amazon.com","")
    for (const key in ele) {
      console.log(key);
      
      if (lista.includes(key)) {
        console.log(key);
        console.log(ele[key]);
      } else {
        delete ele[key];
      }
    }
  });
  console.log(arrayObj);
  return arrayObj;
}
