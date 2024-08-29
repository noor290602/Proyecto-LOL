document.addEventListener('configLoaded', function() {
    let championsSinFiltrar = [];
    let textoBuscado = ""; //variable global

    fetch(`https://ddragon.leagueoflegends.com/cdn/${versionActual}/data/${idiomaActual}/champion.json`)
        .then(response => response.json())
        .then((response) => {
            const json = response;
            const champions = json.data;
            championsSinFiltrar = Object.values(champions);

            //Buscador --------------------------------------------------------------------------------------------
            let inputBuscador = document.getElementById("buscador"); //valor que escribe el user

            inputBuscador.addEventListener("input", () => {
                textoBuscado = inputBuscador.value.toLowerCase();
                mostrarCampeones();
            })

            //Borrar buscador --------------------------------------------------------------------------------------
            let btnBorrar = document.getElementById("btnBorrar");

            function limpiar() {
                let inputBuscador = document.getElementById("buscador");
                inputBuscador.value = ""; // Cambia innerContent por value
                inputBuscador.dispatchEvent(new Event('input')); // Dispara el evento input
            }

            btnBorrar.addEventListener("click", limpiar);

            mostrarCampeones();
        })

    function mostrarCampeones(){
        let championsFiltrados = championsSinFiltrar;

        if (textoBuscado.length > 0){
            championsFiltrados = championsFiltrados.filter((champion) => champion.name.toLowerCase().includes(textoBuscado));
        }

        const championsContainer = document.getElementsByClassName('tarjetasChampions')[0];
        championsContainer.innerHTML = '';
        let htmlChampions = '';

        if (championsFiltrados.length === 0){
            championsContainer.innerHTML = `<p class="mensajeNoItems">NO HAY CAMPEONES QUE CUMPLAN ESTE REQUISITO</p>`;
        } else {
            championsFiltrados.forEach(champion => {
                let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/${versionActual}/img/champion/${champion.image.full}`;

                htmlChampions += `<a class="enlace" href="championsProfile.html?id=${champion.id}">`;
                htmlChampions += '<div class="tarjetaCampeon">';
                htmlChampions += '<div class="marcoImagenCampeon">';
                htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
                htmlChampions += '<p class="nombreCampeon">' + champion.name + '</p></div></a>';    
            });

            championsContainer.innerHTML = htmlChampions;
        }
    }
});
