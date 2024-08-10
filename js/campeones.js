/* FETCH -> sirve para hacer la llamada a la API*/

fetch('https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion.json') // + adelante cambiar idioma y version por variables
.then(response => response.json())
.then((response) => {
    const json = response;
    const champions = json.data;

    const championsContainer = document.getElementsByClassName('tarjetasChampions')[0];
    championsContainer.innerHTML = '';
    let htmlChampions = '';

    Object.values(champions).forEach(champion => {
        let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champion.image.full}`;

        htmlChampions += `<a class="enlace" href="#" data-idCampeon = "${champion.id}">`;
        htmlChampions += '<div class="tarjetaCampeon">';
        htmlChampions += '<div class="marcoImagenCampeon">';
        htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions += '<p class="nombreCampeon">' + champion.id + '</p></div></a>';    
    });

    championsContainer.innerHTML = htmlChampions;

    //Guardamos todos los enlaces en un array
    let arrayCampeones = document.querySelectorAll(".enlace");

    arrayCampeones.forEach((element) => {
        //para cada <a> añadir el valor del atributo
        element.addEventListener("click", function() {
            const perfilCampeon = this.getAttribute("data-idCampeon");
            const infoAñadidaURL = new URLSearchParams({id: perfilCampeon}).toString();
           
            //Accedemos al objeto ventan (la barra de búsqueda del navegador) para escribir el link
            // el interrogante (?) es importante para que no de indefinido
            window.location.href = `championsProfile.html?${infoAñadidaURL}`;
        })
        
    });
})