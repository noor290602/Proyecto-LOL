/* FETCH -> sirve para hacer la llamada a la API*/

fetch('https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/item.json') // + adelante cambiar idioma y version por variables
.then(response => response.json())
.then((response) => {
    const json = response;
    const items = json.data;

    const itemsContainer = document.getElementById('tarjetasItems');
    itemsContainer.innerHTML = '';
    let htmlChampions = '';

    let i = 0; //variable que me permite usar las "entries" del array "data"

    Object.values(items).forEach(item => {
        let urlImagenItem = `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${item.image.full}`;

        htmlChampions += `<a href="itemProfile.html?id=${parseInt(Object.keys(json.data)[i])}">`; //forma de pasar variables por una URL -> ?id=
        htmlChampions += '<div class="tarjetaItem">';
        htmlChampions += '<div class="marcoImagenItems">';
        htmlChampions += `<div class="imagenItems" style="background-image: url(${urlImagenItem}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions += '<p class="nombreItems">' + item.name + '</p></div></a>';    

        i += 1;
    });

    itemsContainer.innerHTML = htmlChampions;
})