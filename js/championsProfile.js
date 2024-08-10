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

        consejos1.forEach(consejo1 => {
            listaConsejos1 += `<li class="contenidoSubconsejo">	<b>·</b> ${consejo1}<li/>`;
        });


        contenidoConsejos1 += `<p class="tituloSubconsejo">Aliados:</p>
                          <ul>${listaConsejos1}</ul>`;

        contenedorConsejos1.innerHTML = contenidoConsejos1;

        //Consejos 2 - Aliados 

        let contenedorConsejos2 = document.getElementsByClassName("seccionSubconsejosEnemigos")[0];
        contenedorConsejos2.innerHTML = '';

        const consejos2 = atributosCampeon.enemytips;


        let contenidoConsejos2 = "";
        let listaConsejos2 = "";

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


        //Tabla

        let contenedorTabla = document.getElementsByClassName("tabla")[0];
        contenedorTabla.innerHTML = '';

        //Función que calcula el maxLevel y lo redondea a 2 decimales si es el caso

        const calcularMaxLevel = (base, perLevel, level = 17) => { //level = 17 -> deducción

            if (isNaN(base) || isNaN(perLevel)) {
                return '-';
            }

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

        const valorOGuion = (valor) => {
            return (valor === undefined || valor === null || isNaN(valor)) ? '-' : valor;
        };


        contenidoTabla = ` <div class="headerTabla">
                                <p class="titHeaderTabla">ESTADÍSTICAS</p>
                                <div class="restoHeadersTabla">
                                    <p class="titHeaderTabla">BASE</p>
                                    <p class="titHeaderTabla">PER LEVEL</p>
                                    <p class="titHeaderTabla">MAX LEVEL</p>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Salud</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.hp)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.hpperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.hp, atributosCampeon.stats.hpperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla impar">
                                <p class="estadisticaTabla">Maná</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.mp)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.mpperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.mp, atributosCampeon.stats.mpperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Velocidad de movimiento</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.movespeed)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.movespeedperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.movespeed, atributosCampeon.stats.movespeedperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla impar">
                                <p class="estadisticaTabla">Armadura</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.armor)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.armorperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.armor, atributosCampeon.stats.armorperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Resistencia mágica</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.spellblock)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.spellblockperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.spellblock, atributosCampeon.stats.spellblockperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla impar">
                                <p class="estadisticaTabla">Rango de ataque</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackrange)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackrangeperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.attackrange, atributosCampeon.stats.attackrangeperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Regeneración de salud</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.hpregen)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.hpregenperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.hpregen, atributosCampeon.stats.hpregenperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla impar">
                                <p class="estadisticaTabla">Regeneración de maná</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.mpregen)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.mpregenperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.mpregen, atributosCampeon.stats.mpregenperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Probabilidad de golpe crítico</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.crit)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.critperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.crit, atributosCampeon.stats.critperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla impar">
                                <p class="estadisticaTabla">Daño de ataque</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackdamage)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackdamageperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.attackdamage, atributosCampeon.stats.attackdamageperlevel)}</div>
                                </div>
                            </div>

                            <div class="filasTabla par">
                                <p class="estadisticaTabla">Velocidad de ataque</p>
                                <div class="numeros">
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackspeed)}</div>
                                    <div class="num">${valorOGuion(atributosCampeon.stats.attackspeedperlevel)}</div>
                                    <div class="num">${calcularMaxLevel(atributosCampeon.stats.attackspeed, atributosCampeon.stats.attackspeedperlevel)}</div>
                                </div>
                            </div>`;

        contenedorTabla.innerHTML = contenidoTabla;

        
        //Gráfica
        let ataque = atributosCampeon.info.attack * 40;
        let defensa = atributosCampeon.info.defense * 40;
        let magia = atributosCampeon.info.magic * 40;
        let dificultad = atributosCampeon.info.difficulty * 40;


        let contenedorBarras = document.getElementsByClassName("barras")[0];
        contenedorBarras.innerHTML = '';

        let contenidoGrafica = `<div class="barra1" style="height: ${ataque}px; width: 54px" data-valor="${ataque / 40}"></div>
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


        //Habilidades
        //TODO 

        //Aspectos
        //TODO
    });
