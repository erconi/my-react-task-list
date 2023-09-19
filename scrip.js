const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'

let LIST, id;

// Cargar datos desde localStorage al iniciar la aplicación
let data = localStorage.getItem('TODO');
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
}else {
    LIST = [];
    id = 0;
}

// Actualizar fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'});

// Función para agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if(eliminado) {return}

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li>
            <i class="far ${REALIZADO}" data-job="complete" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data-job="delete" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend",elemento);
}

// Función para cargar lista de tareas
function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
}

// Evento para escuchar el enter y para habilitar el botón 
botonEnter.addEventListener('click', agregarTareaConBoton);
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        agregarTareaConBoton();
    }
});

function agregarTareaConBoton() {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
    }
}

lista.addEventListener('click', function(event){
    const element = event.target;
    const elementJob = element.attributes.data.value;

    if(elementJob == 'complete') {
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector('.text').classList.toggle(lineThrough);
        LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
    } else if(elementJob == 'delete') {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].eliminado = true;
    }
    
    localStorage.setItem('TODO', JSON.stringify(LIST));
});
