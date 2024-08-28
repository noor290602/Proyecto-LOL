//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");
let itemsSinFiltrar = [];

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/item.json`) 
.then(response => response.json())
.then((response) => {
    const json = response;
    const items = json.data;
    itemsSinFiltrar = Object.entries(items);

    const itemsContainer = document.getElementById('tarjetasItems');
    itemsContainer.innerHTML = '';
    let htmlItems = '';

    itemsSinFiltrar.forEach(([key, item]) => {
        let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;

        console.log(urlImagenItem);

        htmlItems += `<a href="itemProfile.html?id=${key}">`; //forma de pasar variables por una URL -> ?id=
        htmlItems += '<div class="tarjetaItem">';
        htmlItems += '<div class="marcoImagenItems">';
        htmlItems += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
        htmlItems += '<p class="nombreItems">' + item.name + '</p></div></a>';    
    });

    itemsContainer.innerHTML = htmlItems;


     //Buscador --------------------------------------------------------------------------------------

     let textoBuscado = ""; //variable global
     let inputBuscador = document.getElementById("buscador"); //valor que escribe el user
 
     inputBuscador.addEventListener("input", () => {
 
        const itemsContainer = document.getElementById('tarjetasItems');
        itemsContainer.innerHTML = '';
        let htmlItems = '';

        textoBuscado = inputBuscador.value.toLowerCase();
        let arrayFiltrados = itemsSinFiltrar.filter(([key, item]) => item.name.toLowerCase().includes(textoBuscado));
        
        console.log(arrayFiltrados);

        arrayFiltrados.forEach(([key, item]) => {
            let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;

            console.log(urlImagenItem);
            
            htmlItems += `<a href="itemProfile.html?id=${key}">`; //forma de pasar variables por una URL -> ?id=
            htmlItems += '<div class="tarjetaItem">';
            htmlItems += '<div class="marcoImagenItems">';
            htmlItems += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
            htmlItems += '<p class="nombreItems">' + item.name + '</p></div></a>';        
        });
    
        itemsContainer.innerHTML = htmlItems;
     })

      //Borrar buscador --------------------------------------------------------------------------------------
        let btnBorrar = document.getElementById("btnBorrar"); 

        function limpiar() {
            let inputBuscador = document.getElementById("buscador");
            inputBuscador.value = ""; // Cambia innerContent por value
            inputBuscador.dispatchEvent(new Event('input')); // Dispara el evento input
        }

        btnBorrar.addEventListener("click", limpiar);
})

