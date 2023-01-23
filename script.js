//Variables
const formulario =document.querySelector("#formulario");
const tituloForm =document.querySelector("#titulo-formulario");
const task= document.querySelector(".tareas");

const total= document.querySelector("#total");
const completadas= document.querySelector("#completadas");

let tareas = [];

//Eventos
(()=>{
    formulario.addEventListener("submit", validarFormulario);
    task.addEventListener("click", eliminarTarea);
    task.addEventListener("click", tareaCompletada);
})();

//Funciones
function validarFormulario(e){
    e.preventDefault();

    //Validacion de datos input
    const tarea=document.querySelector("#tarea").value;
    if(!tarea.trim()){
        tituloForm.textContent ='Fomulario Vacio';
        setTimeout(()=>{
            tituloForm.textContent = 'Formulario'
        }, 2000);
        return
    }
    //objeto
    const objTarea= {
        id: Date.now(),
        tarea: tarea,
        estado: false
    }
    tareas=[...tareas,objTarea]
    formulario.reset();
    mostrarHTML();
}

function mostrarHTML(){
    task.innerHTML='';//para que no repita tareas

    if(tareas.length===0){
        const mensaje= document.createElement("h5");
        mensaje.textContent= "--No hay tareas--"
        return
    }

    tareas.forEach((item)=>{
        const itemTarea= document.createElement('div')
        itemTarea.classList.add("item-tarea")
        itemTarea.innerHTML=`
        <p>${item.estado ?(
            `<span class='completa'>${item.tarea}</span>`
        ) : (
            `<span>${item.tarea}</span>`
        )}</p>
        <div class="botones">
            <button class="eliminar" data-id="${item.id}">x</button>
            <button class="completada" data-id="${item.id}">?</button>
        </div>
    `;
        task.appendChild(itemTarea)
    })

    //mostrar total y completadas
    const totalTareas= tareas.length;
    total.textContent= `Total tareas: ${totalTareas}`;
    const tareasCompletadas= tareas.filter( item => item.estado===true ).length;
    completadas.textContent= `Completadas: ${tareasCompletadas}`;
}

//Eliminar tarea
function eliminarTarea(e){

    if(e.target.classList.contains("eliminar")){
        const tareaId= Number(e.target.getAttribute("data-id"));
        //eliminar tarea
        const newTask= tareas.filter((item)=> item.id!== tareaId);

        tareas= newTask;
        mostrarHTML();
    }

}

//Tarea Completada

function tareaCompletada(e){

    if(e.target.classList.contains("completada")){
        const tareaId= Number(e.target.getAttribute("data-id"));
        
        //Dar por completada la tarea
        const newTask = tareas.map((item)=>{
            if(item.id===tareaId){
                item.estado= !item.stado //cambiamos el estado
                return item; //retornamos ese nuevo estado
            }else{
                return 
            }
        })
        tareas=newTask
        mostrarHTML();
    }

}
