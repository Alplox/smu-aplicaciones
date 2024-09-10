
const SEARCHBAR_NAV = document.querySelector('.searchbarNav');
const SEARCHBAR_HEADER = document.querySelector('.searchbarHeader');

const NAVBAR_HEIGHT = document.querySelector('.navbar').offsetHeight; // para tener altura navbar y que cuando se haga focus quede dentro de pantalla mensaje
const TITULO_LISTADO_APLICACIONES = document.querySelector('#tituloListadoAplicaciones');
const MENSAJE_ALERTA = document.querySelector('.mensajeAlerta');
const MENSAJE_ALERTA_BUSQUEDA = document.querySelector('#mensajeAlertaBusqueda');
const MENSAJE_ALERTA_BUSQUEDA_BOTON = document.querySelector('#mensajeAlertaBusquedaBoton');
const MENSAJE_ALERTA_BUSQUEDA_IR_MESA = document.querySelector('#mensajeAlertaBusquedaIrMesa');

function ocultarElemento(elemento, ocultar) {
    elemento.classList.toggle('d-none', ocultar);
}

function filtrarBotones(searchbar, otherSearchbar) {
    const btnsFiltrar = document.querySelectorAll('#container-contenido-apps > .elemento');
    let algunaCoincidencia = false;

    for (const btn of btnsFiltrar) {
        const contenidoBtn = btn.textContent
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const coincidencia = contenidoBtn.includes(searchbar.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());

        btn.classList.toggle('d-none', !coincidencia); 

        if (coincidencia) algunaCoincidencia = true;
    }

    ocultarElemento(MENSAJE_ALERTA, algunaCoincidencia); // Mostrar o ocultar mensaje de alerta según si hay coincidencias o no

    window.scroll(0, TITULO_LISTADO_APLICACIONES.offsetTop - NAVBAR_HEIGHT);

    MENSAJE_ALERTA_BUSQUEDA.textContent = searchbar.value;
    MENSAJE_ALERTA_BUSQUEDA_BOTON.textContent = searchbar.value;
    MENSAJE_ALERTA_BUSQUEDA_IR_MESA.setAttribute('href', `https://www.qwant.com/?q=${searchbar.value}`); // aqui iria referencia a plataforma servicenow, quitada por privacidad
}

function filtro(event) {
    const searchbar = event.target;
    const otherSearchbar = searchbar === SEARCHBAR_NAV ? SEARCHBAR_HEADER : SEARCHBAR_NAV;

    otherSearchbar.value = ''; // Borrar el contenido del otro input

    filtrarBotones(searchbar, otherSearchbar);
}

SEARCHBAR_NAV.addEventListener('input', filtro);
SEARCHBAR_HEADER.addEventListener('input', filtro);

// .preventDefault()
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
});