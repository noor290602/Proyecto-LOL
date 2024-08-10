//Obtenemos el id de la URL del perfil del campeon
const urlCampeon = new URLSearchParams(window.location.search);
const idCampeon = urlCampeon.get("id");


fetch(`https://ddragon.leagueoflegends.com/cdn/14.15.1/data/en_US/champion/${idCampeon}.json`) // + adelante cambiar idioma y version por variables
    .then(response => response.json())
    .then((response) => {
        const json = response;
        const champions = json.data;
        dataCampeones = Object.values(champions); //lo pasamos a un objeto para poder manipularlo
        atributosCampeon = dataCampeones[0];

        let contenedorChampionProfileImage = document.getElementsByClassName("championProfileImage")[0];
        contenedorChampionProfileImage.innerHTML = '';


        //Imagen campeon ---------------------------------------------------------------------------------------------------------------------------------
        contenedorChampionProfileImage.style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${idCampeon}_0.jpg')`;


        //Propiedades ------------------------------------------------------------------------------------------------------------------------------------
        const etiquetas = atributosCampeon.tags; //array etiquetas

        let etiquetaPropiedad = "";

        etiquetas.forEach(etiqueta => {
            etiquetaPropiedad += `<div class="propiedad">${etiqueta}</div>`;
        });

        let contenidoPropiedades = "";

        contenidoPropiedades += `<div class="propiedades">
                                ${etiquetaPropiedad}
                              </div>`;

        contenedorChampionProfileImage.innerHTML = contenidoPropiedades;


        //Nombres ----------------------------------------------------------------------------------------------------------------------------------------
        let contenedorNombres = document.getElementsByClassName("nombres")[0];
        contenedorNombres.innerHTML = '';

        let contenidoNombres = "";

        contenidoNombres += `<p class="nombreChampion">${idCampeon.toUpperCase()}</p>
                         <p class="segundoNombreChampion">${atributosCampeon.title}</p>`;

        contenedorNombres.innerHTML = contenidoNombres;


        //Lore -------------------------------------------------------------------------------------------------------------------------------------------
        let contenedorLore = document.getElementsByClassName("contenidoLore")[0];
        contenedorLore.innerHTML = '';

        let contenidoLore = "";

        contenidoLore += `<p>${atributosCampeon.lore}</p>`;

        contenedorLore.innerHTML = contenidoLore;


        //Consejos -------------------------------------------------------------------------------------------------------------------------------------------

        //Consejos 1 - Aliados 

        let contenedorConsejos1 = document.getElementsByClassName("seccionSubconsejosAliados")[0];
        contenedorConsejos1.innerHTML = '';

        const consejos1 = atributosCampeon.allytips;

        let contenidoConsejos1 = "";
        let listaConsejos1 = "";

        if (consejos1.length == 0) {
            listaConsejos1 = '<p class="contenidoSubconsejo">No hay consejos</p>';
        }

        consejos1.forEach(consejo1 => {
            listaConsejos1 += `<li class="contenidoSubconsejo">	<b>·</b> ${consejo1}<li/>`;
        });

        contenidoConsejos1 += `<p class="tituloSubconsejo">Aliados:</p>
                                <ul>${listaConsejos1}</ul>`;

        contenedorConsejos1.innerHTML = contenidoConsejos1;


        //Consejos 2 - Enemigos 

        let contenedorConsejos2 = document.getElementsByClassName("seccionSubconsejosEnemigos")[0];
        contenedorConsejos2.innerHTML = '';

        const consejos2 = atributosCampeon.enemytips;

        let contenidoConsejos2 = "";
        let listaConsejos2 = "";

        if (consejos2.length == 0) {
            listaConsejos2 = '<p class="contenidoSubconsejo">No hay consejos</p>';
        }

        consejos2.forEach(consejo2 => {
            listaConsejos2 += `<li class="contenidoSubconsejo">	<b>·</b> ${consejo2}<li/>`;
        });


        contenidoConsejos2 += `<p class="tituloSubconsejo">Enemigos:</p>
                          <ul>${listaConsejos2}</ul>`;

        contenedorConsejos2.innerHTML = contenidoConsejos2;


        //Estadisticas -------------------------------------------------------------------------------------------------------------------------------------------

        let contenedorRecurso = document.getElementsByClassName("seccionRecurso")[0];
        contenedorRecurso.innerHTML = '';

        let contenidoRecurso = '<p class="tituloRecurso">Recurso:</p>';

        contenidoRecurso += `<p class="recurso">${atributosCampeon.partype}</p>`;

        contenedorRecurso.innerHTML = contenidoRecurso;


        //Tabla ---------------------------------------------------------------------------------------------------------------------------------------------------

        let contenedorTabla = document.getElementById("filas");
        contenedorTabla.innerHTML = "";

        atributosEstadisticas = [
            { label: "Salud", base: "hp", perLevel: "hpperlevel" },
            { label: "Maná", base: "mp", perLevel: "mpperlevel" },
            { label: "Velocidad de movimiento", base: "movespeed", perLevel: null },
            { label: "Armadura", base: "armor", perLevel: "armorperlevel" },
            { label: "Resistencia mágica", base: "spellblock", perLevel: "spellblockperlevel" },
            { label: "Rango de ataque", base: "attackrange", perLevel: null },
            { label: "Regeneración de salud", base: "hpregen", perLevel: "hpregenperlevel" },
            { label: "Regeneración de maná", base: "mpregen", perLevel: "mpregenperlevel" },
            { label: "Probabilidad de golpe crítico", base: "crit", perLevel: "critperlevel" },
            { label: "Daño de ataque", base: "attackdamage", perLevel: "attackdamageperlevel" },
            { label: "Velocidad de ataque", base: "attackspeed", perLevel: "attackspeedperlevel" }
        ];

         //Función que calcula el maxLevel y lo redondea a 2 decimales si es el caso

         const calcularMaxLevel = (base, perLevel, level = 18) => { //level = 18 -> deducción

            const maxLevel = base + (perLevel * level);

            // Redondear a 2 decimales solo si tiene decimales
            let maxLevelRounded;

            if (maxLevel % 1 === 0) {
                maxLevelRounded = maxLevel; // No tiene decimales, se mantiene como está
            } else {
                maxLevelRounded = parseFloat(maxLevel.toFixed(2)); // Redondea a 2 decimales
            }

            return maxLevelRounded;
        };
    
        let contenidoTabla = "";

        atributosEstadisticas.forEach(atributo => {

            contenidoTabla += `<div class="filasTabla">
                            <p class="estadisticaTabla">${atributo.label}</p>
                            <div class="numeros">
                                <div class="num">${atributosCampeon.stats[atributo.base]}</div>
                                <div class="num">${atributosCampeon.stats[atributo.perLevel] ?? '-'}</div>
                                <div class="num">${atributosCampeon.stats[atributo.perLevel] ? calcularMaxLevel(atributosCampeon.stats[atributo.base], atributosCampeon.stats[atributo.perLevel]) : '-'}</div> 
                            </div>
                        </div>`
        });

        //? -> if ternario
        //?? -> operador de cualescencia nula


        contenedorTabla.innerHTML = contenidoTabla;


        //Gráfica ---------------------------------------------------------------------------------------------------------------------------------------------

        let ataque = atributosCampeon.info.attack * 40;
        let defensa = atributosCampeon.info.defense * 40;
        let magia = atributosCampeon.info.magic * 40;
        let dificultad = atributosCampeon.info.difficulty * 40;


        let contenedorBarras = document.getElementsByClassName("barras")[0];
        contenedorBarras.innerHTML = '';

        let contenidoGrafica = `<div class="barra1" style="height: ${ataque}px; width: 54px" data-valor="${ataque / 40}" ></div>
                                <div class="barra2" style="height: ${defensa}px; width: 54px" data-valor="${defensa / 40}"></div>
                                <div class="barra3" style="height: ${magia}px; width: 54px" data-valor="${magia / 40}"></div>
                                <div class="barra4" style="height: ${dificultad}px; width: 54px" data-valor="${dificultad / 40}"></div>`;

        contenedorBarras.innerHTML = contenidoGrafica;


        // Mostrar el número con hover en las barras
        let barras = contenedorBarras.getElementsByTagName('div');
        let valorBarra = document.getElementById('valor-barra');

        for (let barra of barras) {
            barra.addEventListener('mousemove', function (e) {
                let valor = this.getAttribute('data-valor');
                valorBarra.textContent = valor;
                valorBarra.style.display = 'block';
                valorBarra.style.left = e.pageX + 10 + 'px';
                valorBarra.style.top = e.pageY + 10 + 'px';
            });

            barra.addEventListener('mouseout', function () {
                valorBarra.style.display = 'none';
            });
        }


        //Habilidades -------------------------------------------------------------------------------------------------------------------------------------------
        //TODO 
        

        //Aspectos -------------------------------------------------------------------------------------------------------------------------------------------
        //TODO

    });
