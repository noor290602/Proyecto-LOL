//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");
let championsSinFiltrar = [];

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/champion.json`) 
.then(response => response.json())
.then((response) => {
    const json = response;
    const champions = json.data;
    championsSinFiltrar = Object.values(champions);

    const championsContainer = document.getElementsByClassName('tarjetasChampions')[0];
    championsContainer.innerHTML = '';
    let htmlChampions = '';

    Object.values(champions).forEach(champion => {
        let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;

        htmlChampions += `<a class="enlace" href="championsProfile.html?id=${champion.id}">`; //forma de pasar variables por una URL -> ?id=
        htmlChampions += '<div class="tarjetaCampeon">';
        htmlChampions += '<div class="marcoImagenCampeon">';
        htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions += '<p class="nombreCampeon">' + champion.name + '</p></div></a>';    
    });

    championsContainer.innerHTML = htmlChampions;


    //Buscador --------------------------------------------------------------------------------------
    let textoBuscado = ""; //variable global
    let inputBuscador = document.getElementById("buscador"); //valor que escribe el user

    inputBuscador.addEventListener("input", () => {

        const championsContainer = document.getElementsByClassName('tarjetasChampions')[0];
        championsContainer.innerHTML = '';
        let htmlChampions = '';

        textoBuscado = inputBuscador.value.toLowerCase();
        let arrayFiltrados = championsSinFiltrar.filter((champion) => champion.name.toLowerCase().includes(textoBuscado));
        
        arrayFiltrados.forEach(champion => {
            let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
    
            htmlChampions += `<a class="enlace" href="championsProfile.html?id=${champion.id}">`; //forma de pasar variables por una URL -> ?id=
            htmlChampions += '<div class="tarjetaCampeon">';
            htmlChampions += '<div class="marcoImagenCampeon">';
            htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
            htmlChampions += '<p class="nombreCampeon">' + champion.name + '</p></div></a>';    
        });
    
        championsContainer.innerHTML = htmlChampions;
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