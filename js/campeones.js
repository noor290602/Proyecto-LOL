/* FETCH -> sirve para hacer la llamada a la API*/

fetch('https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json') // + adelante cambiar idioma y version por variables
.then(response => response.json())
.then((response) => {
    const json = response;
    const champions = json.data;
    const championsContainer = document.getElementsByClassName('tarjetasChampions')[0];
    console.log(championsContainer);
    championsContainer.innerHTML = '';
    let htmlChampions = '';

    Object.values(champions).forEach(champion => {
        console.log(champion.id);

        let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champion.image.full}`;

        htmlChampions += `<a href="championsProfile.html/#${champion.id}">`;
        htmlChampions += '<div class="tarjetaCampeon">';
        htmlChampions += '<div class="marcoImagenCampeon">';
        htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions += '<p class="nombreCampeon">' + champion.id + '</p></div></a>';    
    });

    championsContainer.innerHTML = htmlChampions;

    //se sigue aquí
})