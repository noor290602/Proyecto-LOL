document.addEventListener('configLoaded', function() {
    // Paso de variables a través de localStorage
    let storage = window.localStorage;
    let version = storage.getItem("version");
    let idioma = storage.getItem("idioma");
    let itemsSinFiltrar = [];
    let textoBuscado = ""; // variable global
    
    let etiquetas = [];
    let etiquetasSeleccionadas = [];
    let mostrarListaEtiquetas = false;

    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/item.json`)
    .then(response => response.json())
    .then((response) => {
        const json = response;
        const items = json.data;
        itemsSinFiltrar = Object.entries(items);

        // Etiquetas --------------------------------------------------------------------------------------
        itemsSinFiltrar.forEach(([key, item]) => {
            item.tags.forEach(tag => {
                if (!etiquetas.includes(tag)) {
                    etiquetas.push(tag);
                }
            });
        });

        let flechaListaEtiquetas = document.getElementById("flechaListaEtiquetas");
        flechaListaEtiquetas.addEventListener("click", desplegarEtiquetasItems);

        // Buscador --------------------------------------------------------------------------------------
        let inputBuscador = document.getElementById("buscador"); // valor que escribe el user
        inputBuscador.addEventListener("input", () => {
            textoBuscado = inputBuscador.value.toLowerCase();
            mostrarItems();
        });

        // Borrar buscador --------------------------------------------------------------------------------------
        let btnBorrar = document.getElementById("btnBorrar");
        function limpiar() {
            let inputBuscador = document.getElementById("buscador");
            inputBuscador.value = ""; // Cambia innerContent por value
            inputBuscador.dispatchEvent(new Event('input')); // Dispara el evento input
        }
        btnBorrar.addEventListener("click", limpiar);

        mostrarItems();
    });

    function mostrarItems() {
        let itemsFiltrados = itemsSinFiltrar;

        if (textoBuscado.length > 0) {
            itemsFiltrados = itemsFiltrados.filter(([key, item]) =>
                item.name.toLowerCase().includes(textoBuscado)
            );
        }

        if (etiquetasSeleccionadas.length > 0) {
            itemsFiltrados = itemsFiltrados.filter(([key, item]) =>
                etiquetasSeleccionadas.every(tag =>
                    item.tags.includes(tag)
                )
            );
        }

        const itemsContainer = document.getElementById('tarjetasItems');
        itemsContainer.innerHTML = '';
        let htmlItems = '';

        if (itemsFiltrados.length === 0) {
            itemsContainer.innerHTML = `<p class="mensajeNoItems">NO HAY ITEMS QUE CUMPLAN ESTE REQUISITO</p>`;
        } else {
            itemsFiltrados.forEach(([key, item]) => {
                let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                
                htmlItems += `<a href="itemProfile.html?id=${key}">`; // forma de pasar variables por una URL -> ?id=
                htmlItems += '<div class="tarjetaItem">';
                htmlItems += '<div class="marcoImagenItems">';
                htmlItems += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
                htmlItems += '<p class="nombreItems">' + item.name + '</p></div></a>';
            });
        
            itemsContainer.innerHTML = htmlItems;
        }
    }

    function desplegarEtiquetasItems() {
        mostrarListaEtiquetas = !mostrarListaEtiquetas;

        let listaEtiquetasItems = document.getElementById('listaEtiquetasItems');

        if (mostrarListaEtiquetas) {
            listaEtiquetasItems.style.display = "block"; // muestra la lista
            document.getElementById('flechaListaEtiquetas').style.transform = "scaleY(-1)"; // le damos la vuelta a la flecha

            let contenidoEtiqueta = "";

            etiquetas.forEach(tag => {
                const isChecked = etiquetasSeleccionadas.includes(tag) ? "checked" : "";
                contenidoEtiqueta += `<li class="etiquetasItems"><input type="checkbox" class="etiquetaSeleccionada" value="${tag}" ${isChecked}/> ${tag}</li>`;
            });

            listaEtiquetasItems.innerHTML = contenidoEtiqueta;

            // Filtrar
            document.querySelectorAll(".etiquetaSeleccionada").forEach(checkbox => {
                checkbox.addEventListener("change", (event) => {
                    let valorEtiqueta = checkbox.value; // por cada checkbox recogemos el valor
                    if (event.target.checked && !etiquetasSeleccionadas.includes(valorEtiqueta)) { // si está checkeado
                        etiquetasSeleccionadas.push(valorEtiqueta); // lo añadimos al array de etiquetas seleccionadas
                    } else {
                        const indice = etiquetasSeleccionadas.indexOf(valorEtiqueta);
                        
                        if (indice > -1) { // si existe dentro del array
                            etiquetasSeleccionadas.splice(indice, 1); // eliminamos la etiqueta
                        }
                    }

                    // Mostramos las etiquetas seleccionadas abajo
                    let contenedorEtiquetasMostradas = document.getElementById("etiquetasMostradasItems");
                    let contenidoEtiquetasMostradas = "";

                    etiquetasSeleccionadas.forEach(et => {
                        contenidoEtiquetasMostradas += `<div class="divEtiquetasSeleccionadas"><p>${et}</p></div>`;
                    });

                    contenedorEtiquetasMostradas.innerHTML = contenidoEtiquetasMostradas;
                    mostrarItems();
                });
            });

        } else {
            listaEtiquetasItems.style.display = "none"; // cierra la lista
            document.getElementById('flechaListaEtiquetas').style.transform = ""; // le damos la vuelta a la flecha
        }
    }
});
