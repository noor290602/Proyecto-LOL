document.addEventListener('configLoaded', function() {
//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");
//let championsSinFiltrar = [];

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/summoner.json`) 
.then(response => response.json())
.then((response) => {
    const json = response;
    const summoners = json.data;
    summonersSinFiltrar = Object.values(summoners);

    const summonersContainer = document.getElementById('tarjetasSummoners');;
    summonersContainer.innerHTML = '';
    let htmlSummoners = '';

    Object.values(summoners).forEach(summoner => {
        let urlImagenSummoner = `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/spell/${summoner.image.full}`;

        htmlSummoners += '<div class="tarjetaSummoner">';
        htmlSummoners += '<div class="marcoImagenSummoner">';
        htmlSummoners += `<div class="imagenSummoner" style="background-image: url(${urlImagenSummoner}); background-repeat: no-repeat;"></div></div>`;
        htmlSummoners += '<p class="nombreSummoner">' + summoner.name + '</p></div>';    
    });

    summonersContainer.innerHTML = htmlSummoners;

})
});