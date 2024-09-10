document.addEventListener("DOMContentLoaded", function() {
    fetch('Data/apps.json')
        .then(response => response.json())
        .then(data => {
            const fragmentContainer = document.createDocumentFragment(); // este fragmento almacena todos los div antes de ser incrustados en el DOM
            // Obtener las secciones
            const internoSMU = data["Interno SMU"];
            const externoSMU = data["Externo SMU"];
            const formatosINGRESOS = data["Formato_Ingresos"]
            
            // Obtener div desde el DOM
            const gridContainer = document.querySelector('#container-contenido-apps');
                gridContainer.setAttribute('tabindex', '0');  // tabindex="0", lo convierte en un elemento enfocable para el .focus()

            let count = 0

            function agregarElementosAlGrid(seccion, contenedor, seccionNombre) {
                /* const contador = document.createElement("div");
                contador.classList.add("contador");
                contador.textContent = `Total ${seccionNombre}: ${Object.keys(seccion).length}`;
                contenedor.append(contador); */
            
                for (const key in seccion) {
                    if (seccion.hasOwnProperty(key)) {
                        const elemento = seccion[key];
                        const divGrid = document.createElement("div");
                            divGrid.classList.add('elemento', 
                            'rounded-3', 'shadow', 'bg-white', 
                            'text-body', 'd-flex', 'flex-column', 
                            'text-wrap', 'lh-sm', 'p-0', 'mostrar', 
                            'overflow-hidden', 
                            'border-5', 'border-dark', 'border-bottom',
                            
                            
                            );
                            /* intersectionObserver */
                            const observer = new IntersectionObserver(entries => {
                                entries.forEach(entry => {
                                    entry.target.classList.toggle("mostrar", entry.isIntersecting)
                                    if (entry.isIntersecting) observer.unobserve(entry.target)  // este remueve los que ya se muestran del observer para que no desaparescan desde arriba
                                })
                            },
                            {
                                threshold: 0.1,
                            })
                            
                            observer.observe(divGrid)  // con este le decimos observa el div
                            /* Fin intersectionObserver */

                        // Agregar el nombre del objeto como un párrafo
                        const divNombreAplicacion = document.createElement('div');
                            divNombreAplicacion.classList.add('d-flex', 'order-0', 'bg-dark', 'text-white', 'justify-space-evenly', 'align-items-center', 'p-2')
                        const spanNombreAplicacion = document.createElement('span');
                            spanNombreAplicacion.classList.add('flex-fill', 'p-1', 'm-0', 'fs-4', 'w-100')
                            spanNombreAplicacion.textContent = `${key}`;   // ${seccionNombre}: que equivale al o de externo o interno
                        divNombreAplicacion.append(spanNombreAplicacion)

                        // Crear párrafos para cada propiedad del elemento
                        for (const propiedad in elemento) {
                            const valor = elemento[propiedad];
                            // estos dos div estan fuera de donde se usan para poder agregarlos completos al final
                            const divParrafosInformacionGeneral = document.createElement('div');
                                divParrafosInformacionGeneral.classList.add('order-1', 'flex-fill')
                            const divEnlaceAplicacion = document.createElement('div');
                            
                            if (propiedad === "Enlace") {                        // LISTO
                                count++
                                divEnlaceAplicacion.classList.add('d-flex', 'order-3', 'flex-column', 'justify-content-center', 'p-1', 'gap-2', 'bg-body-secondary')
                                divEnlaceAplicacion.innerHTML = `
                                <a class="btn btn-primary rounded-5 mx-2" href="${valor}" role="button" target="_blank" rel="noopener noreferrer">Abrir enlace <i class="bi bi-box-arrow-up-right"></i></a>
                                <button type="button" class="btn btn-sm rounded-5 mx-5 btn-light" data-bs-toggle="collapse" data-bs-target="#collapseEnlace${count}" aria-expanded="false" aria-controls="collapseEnlace${count}">Mostrar enlace</button>
                                <div class="collapse" id="collapseEnlace${count}">
                                    <div class="card card-body">
                                    <p class="mb-0">
                                        <a href="${valor}" target="_blank" rel="noopener noreferrer" class="w-auto">${valor}</a>
                                    </p>
                                    </div>
                                </div>`
                            } else if (propiedad === "Tipo") {                   // LISTO
                                const spanTipo = document.createElement("span");
                                    spanTipo.classList.add('d-flex', 'flex-column', 'flex-shrink-1', 
                                    'justify-content-center', 'align-items-center', /* 'rounded-4', */ 
                                    'user-select-none', 'text-center', 
                                    'border-start', 'border-end', 'border-info', 'border-2', 'rounded-3',
                                    
                                    'bg-black',  'p-1')
                                
                                /* Si valor calza con cada caso se añade su icono representativo */
                                switch (valor) {
                                    case "Página Web":
                                        spanTipo.innerHTML = '<i class="bi bi-globe"></i>'
                                    break;
                                    case "Aplicación móvil (Android)":
                                        spanTipo.innerHTML = '<i class="bi bi-google-play"></i>'
                                    break;
                                    case "Aplicación móvil (IOS)":
                                        spanTipo.innerHTML = '<i class="bi bi-apple"></i>'
                                    break;
                                }

                                /* Añade lo de si es pagina/app bajo el icono*/
                                const spanTipoDescripcion = document.createElement("span");
                                    spanTipoDescripcion.style['font-size'] = '12px';
                                    spanTipoDescripcion.innerHTML = `${valor}`
                                spanTipo.append(spanTipoDescripcion)
                                divNombreAplicacion.append(spanTipo)
                                
                                /* con prepend aca le decismo que siempre lo inserte primero */
                                divGrid.prepend(divNombreAplicacion)
                            } else if (propiedad === "Formato_Ingreso") {        // LISTO
                                const spanParrafoFormatoIngreso = document.createElement('span');
                                    spanParrafoFormatoIngreso.classList.add('px-3', 'my-1')
                                    spanParrafoFormatoIngreso.textContent = `-Ingresa mediante: ${formatosINGRESOS[valor].Tipo}`
                                divParrafosInformacionGeneral.append( spanParrafoFormatoIngreso)
                                
                                // console.log(formatosINGRESOS[2].Tipo)  tengo para usar .Tipo y .Ejemplo
                            } else if (propiedad === "Funcion") {                // LISTO
                                const spanParrafoFuncion = document.createElement('span');
                                    spanParrafoFuncion.classList.add('px-3', 'my-1')
                                    spanParrafoFuncion.textContent = `-Funcion: ${valor}`
                                divParrafosInformacionGeneral.append(spanParrafoFuncion)
        
                            } else if (elemento.hasOwnProperty(propiedad)) {     // LISTO o casi, ver lo de que si no tiene enlace en la propiedad no añadirlo
                                // Verificar si el valor es un objeto anidado
                                if (typeof valor === 'object' && valor !== null) {
                                    const divEnlacesMDS = document.createElement('div');
                                        divEnlacesMDS.classList.add('nested-object', 'order-2', 'px-3','bg-primary-subtle','pt-1'); 
                                    const parrafoTituloEnlacesMDS = document.createElement('p');
                                        parrafoTituloEnlacesMDS.textContent = '-Enlaces Mesa de Servicio TI'
                                    const divBotonesEnlacesMDS = document.createElement('div');
                                        divBotonesEnlacesMDS.classList.add('d-flex','gap-2','flex-wrap','pb-2');
                                    // Crear párrafos para las propiedades del objeto anidado
                                    for (const nestedPropiedad in valor) {

                                        
                                        if (valor.hasOwnProperty(nestedPropiedad) && valor[nestedPropiedad] !== '') {
                                            const botonEnlace = document.createElement('a');
                                                botonEnlace.classList.add('btn', 'btn-sm', 'btn-light', 'text-wrap', 'g-col-6')
                                                botonEnlace.setAttribute('href', `${valor[nestedPropiedad]}`);
                                                botonEnlace.setAttribute('role', 'button');
                                                botonEnlace.setAttribute('target', '_blank');
                                                botonEnlace.setAttribute('rel', 'noopener noreferrer');
                                        /* Si valor calza con cada caso se añade su icono representativo */
                                            switch (nestedPropiedad) {
                                                case "Crear/Modificar cuenta":
                                                    botonEnlace.innerHTML = `<i class="bi bi-person-gear"></i> ${nestedPropiedad} <i class="bi bi-box-arrow-up-right"></i>`
                                                break;
                                                case "Desbloquear/Bloquear cuenta":
                                                    botonEnlace.innerHTML = `<i class="bi bi-person-lock"></i> ${nestedPropiedad} <i class="bi bi-box-arrow-up-right"></i>`
                                                break;
                                                case "Reportar Problema":
                                                    botonEnlace.innerHTML = `<i class="bi bi-exclamation-triangle"></i> ${nestedPropiedad} <i class="bi bi-box-arrow-up-right"></i>`
                                                break;
                                            }
                                            divBotonesEnlacesMDS.append(botonEnlace)
                                        }
                                    }
                                /*  El boton que carga las coincidencias acorde a nombre sitio/app en portal de mesa de servicios */
                                    const botonEnlaceOtros = document.createElement('a');
                                        botonEnlaceOtros.classList.add('btn', 'btn-sm', 'btn-light', 'text-wrap', 'g-col-6')
                                        botonEnlaceOtros.setAttribute('href', `https://www.qwant.com/?q=${key}`); // aqui iria referencia a plataforma servicenow, quitada por privacidad
                                        botonEnlaceOtros.setAttribute('role', 'button');
                                        botonEnlaceOtros.setAttribute('target', '_blank');
                                        botonEnlaceOtros.setAttribute('rel', 'noopener noreferrer');
                                        botonEnlaceOtros.innerHTML = `Otros <i class="bi bi-box-arrow-up-right"></i>`
                                    divBotonesEnlacesMDS.append(botonEnlaceOtros)

                                    divEnlacesMDS.append(parrafoTituloEnlacesMDS, divBotonesEnlacesMDS)        
                                    divGrid.append(divEnlacesMDS)
                                } else {
                                    // Si no es un objeto anidado, simplemente hacer na 
                                    const p = document.createElement("p");
                                    p.classList.add('px-3')
                                    // Si no es un objeto anidado, simplemente agregar el párrafo
                                    p.textContent = `-${propiedad}: ${valor}`;
                                    divParrafosInformacionGeneral.append(p);
                                }
                            } else {
                                /* const p = document.createElement("p");
                                p.classList.add('px-3') */
                                // Si no es un objeto anidado, simplemente agregar el párrafo
                             /*    p.textContent = `${propiedad}: ${valor}`;
                                divParrafosInformacionGeneral.append(p); */
                            }
                            
                            divGrid.append(divParrafosInformacionGeneral, divEnlaceAplicacion)
                        }
                        contenedor.append(divGrid);

                    }
                }
                gridContainer.append(fragmentContainer)
            }

            agregarElementosAlGrid(internoSMU, fragmentContainer, "Interno SMU");
            agregarElementosAlGrid(externoSMU, fragmentContainer, "Externo SMU");
        });
});