document.addEventListener('configLoaded', function() {
//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");
let itemsSinFiltrar = [];
let textoBuscado = ""; //variable global

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/item.json`) 
.then(response => response.json())
.then((response) => {
    const json = response;
    const items = json.data;
    itemsSinFiltrar = Object.entries(items);

     //Buscador --------------------------------------------------------------------------------------

     let inputBuscador = document.getElementById("buscador"); //valor que escribe el user
 
     inputBuscador.addEventListener("input", () => {
        textoBuscado = inputBuscador.value.toLowerCase();
        mostrarItems();
     })

      //Borrar buscador --------------------------------------------------------------------------------------
        let btnBorrar = document.getElementById("btnBorrar"); 

        function limpiar() {
            let inputBuscador = document.getElementById("buscador");
            inputBuscador.value = ""; // Cambia innerContent por value
            inputBuscador.dispatchEvent(new Event('input')); // Dispara el evento input
        }

        btnBorrar.addEventListener("click", limpiar);

        mostrarItems();
})

function mostrarItems(){
    let itemsFiltrados = itemsSinFiltrar;

    if (textoBuscado.length > 0){
        itemsFiltrados =  itemsFiltrados.filter(([key, item]) => item.name.toLowerCase().includes(textoBuscado));
    }

    const itemsContainer = document.getElementById('tarjetasItems');
    itemsContainer.innerHTML = '';
    let htmlItems = '';

    if (itemsFiltrados.length === 0){
        itemsContainer.innerHTML = `<p class = "mensajeNoItems">NO HAY ITEMS QUE CUMPLAN ESTE REQUISITO</p>`;
    }else {
        itemsFiltrados.forEach(([key, item]) => {
            let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
            
            htmlItems += `<a href="itemProfile.html?id=${key}">`; //forma de pasar variables por una URL -> ?id=
            htmlItems += '<div class="tarjetaItem">';
            htmlItems += '<div class="marcoImagenItems">';
            htmlItems += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
            htmlItems += '<p class="nombreItems">' + item.name + '</p></div></a>';        
        });
    
        itemsContainer.innerHTML = htmlItems;
    }
}
});
