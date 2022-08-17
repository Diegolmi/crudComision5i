const formularioUi = document.querySelector("#formulario");
const listaActividades = document.getElementById("listaActividades");
const arrayActividades = [];

const crearActividad = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false,
  };

  arrayActividades.push(item);

  return item;
};

// console.log(arrayActividades)

const guardarDB = () => {
  localStorage.setItem("acciones", JSON.stringify(arrayActividades));

  mostrarDB();
};

const mostrarDB = () => {
  listaActividades.innerHTML = "";

  let arrayActividades = JSON.parse(localStorage.getItem("acciones"));

  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    arrayActividades.forEach((element) => {

        if(element.estado){

        listaActividades.innerHTML +=`<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
        } else { 
            listaActividades.innerHTML +=`<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
        }
    });
  }
};

 const eliminarDB = (actividad) => { 

    let arrayIndex 

    arrayActividades.forEach((element, index) => {

        if(element.actividad === actividad){
            arrayIndex = index
        }
    } )

    
     arrayActividades.splice(arrayIndex, 1);

    guardarDB();

 }
 const editarDB = (actividad) => {
    let arrayIndex = arrayActividades.findIndex( (element) => element.actividad === actividad);

    console.log(arrayIndex)

    // arrayActividades[arrayIndex].estado = true;
    guardarDB();
 }
  




formularioUi.addEventListener("submit", (e) => {
  e.preventDefault();

  let actividadUi = document.querySelector("#actividad").value;

  crearActividad(actividadUi);
  guardarDB();

  formularioUi.reset();
});

document.addEventListener("DOMContentLoaded", mostrarDB);

listaActividades.addEventListener("click", (e) => {
e.preventDefault();

console.log(e)

if(e.target.innerHTML === "done" || e.target.innerHTML === "delete"){
     let texto = e.path[2].childNodes[3].innerHTML;//ruta para saber que elemento selecciono. e.path[2] es el div que contiene el boton y e.path[2].childNodes[3] es el texto del boton 
   
    if(e.target.innerHTML === "delete"){
       eliminarDB(texto);
    }
    if(e.target.innerHTML === "done"){
       editarDB(texto);
    }

 }


})
