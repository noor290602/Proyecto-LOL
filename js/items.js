//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/item.json`) 
.then(response => response.json())
.then((response) => {
    const json = response;
    const items = json.data;

    const itemsContainer = document.getElementById('tarjetasItems');
    itemsContainer.innerHTML = '';
    let htmlChampions = '';

    Object.entries(items).forEach(([key, item]) => {
        let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;

        htmlChampions += `<a href="itemProfile.html?id=${key}">`; //forma de pasar variables por una URL -> ?id=
        htmlChampions += '<div class="tarjetaItem">';
        htmlChampions += '<div class="marcoImagenItems">';
        htmlChampions += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions += '<p class="nombreItems">' + item.name + '</p></div></a>';    
    });

    itemsContainer.innerHTML = htmlChampions;
})

