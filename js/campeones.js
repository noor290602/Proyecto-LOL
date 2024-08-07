/* FETCH -> sirve para hacer la llamada a la API*/

fetch('https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json')
.then(response => response.json)
.then((response) => {
    const json = response;
    const champions = json.data;
    const championsContainer = document.getElementsByClassName('tarjetasChampions');
    championsContainer.innerHTML = '';

    Object.values(champions).forEach(champions => {
        //console.log(champions.id);
        let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.image.full}`;

        let htmlChampions = '<a href="championsProfile.html">';
            htmlChampions     += '<div class="tarjetaCampeon">';
            htmlChampions     += '<div class="imagenCampeon">';
            htmlChampions     += `<img src="${urlImagenChampion}" /> </div>`;
            htmlChampions     += '<p class="nombreCampeon">' + champions.id + '</p></div></a>';    
            
        championsContainer.innerHTML = htmlChampions;
    });
})