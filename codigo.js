const API = 'https://pokeapi.co/api/v2/pokemon';
let pagination = 0; // 0  sería para un orden en numeros



//// funciones Asíncronas

async function obtenerListado() {
    const respuesta = await fetch(API + `?limit=100&offset=${pagination}`);
    const listado = await respuesta.json();

    //console.log(listado.results);
    mostrarPersonajes(listado.results, pagination);
    valoresPaginas(ResultadoPagina)
}

async function personaje(url) {
    const respuesta = await fetch(url);
    const pj = await respuesta.json();

    const descripcion = await fetch(pj.species.url)
    const descripcionPokemon = await descripcion.json();
    const respuesta2 = descripcionPokemon.flavor_text_entries[0].flavor_text
        // console.log(descripcionPokemon.flavor_text_entries[0].flavor_text);

    //console.log(pj)
    generarPersonajes(pj, respuesta2)
}

async function obtenerListadoRetroceso() {
    const respuesta = await fetch(API + `?limit=100&offset=${pagination}`);
    const listado = await respuesta.json();

    //console.log(listado.results);
    mostrarRetroceso(listado.results, pagination);
    valoresPaginas(ResultadoPagina)
}


async function busquedaNro(nro) {
    const respuesta = await fetch(API + `/${nro}`);
    const pj = await respuesta.json();

    contenedor.innerHTML = '';
    generarPersonajes(pj);
}

/*
async function descripcion(url) {
    const respuesta = await fetch(url);
    const descrip = await respuesta.json();
    const descripValue = descrip.flavor_text_entries[0].flavor_text
        // console.log(descrip.flavor_text_entries[0].flavor_text);
    return descripValue;
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////

obtenerListado();

const contenedor = document.getElementById('contenedor');
const btnRandom = document.getElementById('btn-random');
const orden = document.getElementById('orden');



function mostrarPersonajes(listado, pagina) {
    if (pagina == 900) {
        for (let i = 17; i >= 1; i--) {
            let personajeURL = listado[i].url;
            personaje(personajeURL)
        }
    } else {
        for (let i = 0; i < listado.length; i++) {
            let personajeURL = listado[i].url;
            personaje(personajeURL)
                //console.log(personajeURL)
        }
    }
}


function mostrarRetroceso(listado, pagina) {
    if (pagina == 900) {
        for (let i = 17; i >= 1; i--) {
            let personajeURL = listado[i].url;
            personaje(personajeURL)
        }
    } else {
        for (let i = 99; i >= 1; i--) {
            let personajeURL = listado[i].url;
            personaje(personajeURL)
        }
    }
}


function generarPersonajes(personaje, descripcion) {
    const pjDiv = document.createElement('div');
    pjDiv.classList.add('caracter');
    pjDiv.innerHTML = `
    <img src="${personaje.sprites.front_default}" alt="pokemon image" class="pokemon-img">
    <div class="nombre">
        <p>Nro. ${personaje.id}</p>
        <h3>${(personaje.name).toUpperCase()}</h3>
    </div>
    <div class="cont-modal" id="cont-modal">
    <div class="modal">
        <button id="cerrar-modal" class="cerrar-modal"><i class="far fa-times-circle"></i></button>
        <h1>${(personaje.name).toUpperCase()} - N° ${personaje.id} </h1>
        <div class="modal-content">
            <img src="${personaje.sprites.front_default}" alt="">
            <div class="modal-caract">
                <div class="modal-descrip">
                    <p>${descripcion}</p>                    
                </div>
                <div class="modal-tipos" id="tipos">
                    <h3>Type</h3>
                    <p>${searchTipos()}</p>
                </div>
                <div class="modal-habilidades">
                    <h3>Abilities</h3>
                    <p>${searchHabilidades()}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    const divTipos = document.getElementById('tipos');

    function searchTipos() {
        const arrayTipos = personaje.types;
        const newArrayTipos = []
        for (let i = 0; i < arrayTipos.length; i++) {
            const tipo = document.createElement('p');
            tipo.innerText = `${arrayTipos[i].type.name} <br>`;
            newArrayTipos.push(tipo.innerText);
        }
        return newArrayTipos;
    }

    function searchHabilidades() {
        const arrayHab = personaje.abilities;
        const newArrayHab = [];
        for (let i = 0; i < arrayHab.length; i++) {
            const habilidad = document.createElement('p');
            habilidad.innerText = `${arrayHab[i].ability.name}<br>`;
            newArrayHab.push(habilidad.innerText);
        }
        return newArrayHab;
    }


    contenedor.appendChild(pjDiv);

    //  Modal   //
    const modal = pjDiv.querySelector('.cont-modal');
    const btnCloseModal = pjDiv.querySelector('.cerrar-modal');
    //const btnCloseModal = pjDiv.getElementById('cerrar-modal');
    ////////////
    const pokemonIMG = pjDiv.querySelector('.pokemon-img');
    pokemonIMG.onclick = () => {
        modal.classList.add('on');
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('on');
        });
    }

}





// Botones encabezado

btnRandom.addEventListener('click', () => {
    pagination = Math.round(Math.random() * 850);
    contenedor.innerHTML = '';
    obtenerListado();
})

orden.addEventListener('change', () => {
    ResultadoPagina = 1;
    valoresPaginas(ResultadoPagina);
    console.log(orden.value)
    const filtro = orden.value;
    if (filtro == 'inferior') {
        pagination = 0;
        contenedor.innerHTML = '';
        obtenerListado();
    } else if (filtro == 'superior') {
        pagination = 900;
        contenedor.innerHTML = '';
        obtenerListado();
    }
})

// Boton buscar
const btnBuscar = document.getElementById('btn-buscar');

btnBuscar.addEventListener('click', () => {
    const numero = document.getElementById('busqueda').value;
    if (numero != undefined && numero != 0) {
        busquedaNro(numero);
        divPaginas.classList.add('oculto')
    } else {
        console.log('No has ingresado un valor');
    }

    document.getElementById('busqueda').value = '';

})



// Pagination
let ResultadoPagina = 1;
const divPaginas = document.getElementById('paginas');
const btnNextPage = document.getElementById('btnNextPage');
const btnActualPage = document.getElementById('btnActualPage');
const btnPrevPage = document.getElementById('btnPrevPage');




btnNextPage.addEventListener('click', () => {
    contenedor.innerHTML = '';
    ResultadoPagina++;
    valoresPaginas(ResultadoPagina);
    if (orden.value == 'superior') {
        pagination = pagination - 100;
        obtenerListadoRetroceso();
    } else {
        pagination = pagination + 100;
        obtenerListado()
    }

});

btnPrevPage.addEventListener('click', () => {
    contenedor.innerHTML = '';
    ResultadoPagina--;
    valoresPaginas(ResultadoPagina);
    if (orden.value == 'superior') {
        pagination = pagination + 100;
        obtenerListadoRetroceso();
    } else {
        pagination = pagination - 100;
        obtenerListado()
    }
});


function valoresPaginas(resultado) {
    let prevPage = document.getElementById('pagPrev');
    let nextPage = document.getElementById('pagSiguiente');
    let actPage = document.getElementById('pagActual');

    if (resultado == 1) {
        btnPrevPage.classList.add('oculto');
    } else {
        btnPrevPage.classList.remove('oculto');
    }

    prevPage.innerText = resultado - 1;
    actPage.innerText = resultado;
    nextPage.innerText = resultado + 1;
}


// Recargar página
const logoPokemon = document.getElementById('logo')
logoPokemon.addEventListener('click', () => {
    location.reload();
});