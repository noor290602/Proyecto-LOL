//Obtenemos el id de la URL del perfil del campeon
const urlCampeon = new URLSearchParams(window.location.search);
const idCampeon = urlCampeon.get("id");

//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");


fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/champion/${idCampeon}.json`) // + adelante cambiar idioma y version por variables
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
            etiquetaPropiedad += `<div class="propiedadCP">${etiqueta}</div>`;
        });

        let contenidoPropiedades = "";

        contenidoPropiedades += `<div class="propiedadesCP">
                                ${etiquetaPropiedad}
                              </div>`;

        contenedorChampionProfileImage.innerHTML = contenidoPropiedades;


        //Nombres ----------------------------------------------------------------------------------------------------------------------------------------
        let contenedorNombres = document.getElementsByClassName("nombres")[0];
        contenedorNombres.innerHTML = '';

        let contenidoNombres = "";

        contenidoNombres += `<p class="nombreChampion">${atributosCampeon.name.toUpperCase()}</p>
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

        //Cargamos las spells y la passive -----------------------

        let spells = atributosCampeon.spells;
        let pasiva = atributosCampeon.passive;

        // Crear un array que incluya la pasiva con los atributos que nos interesen

        const habilidadPasiva = [
            {
                id: "Pasiva",
                nombre: pasiva.name,
                descripcion: pasiva.description,
                imagen: pasiva.image.full
            }
        ];

        // Mapear las spells y agregarlas al array habilidades ----------------------

        const habilidades = [];

        spells.forEach(spell => {
            habilidades.push({
                id: spell.id,
                nombre: spell.name,
                descripcion: spell.description,
                imagen: spell.image.full
            });
        });


        // Cargamos las imágenes -----------------------------

        let contenedorImagenes = document.getElementById("contenedorImagenesHabilidades");
        contenedorImagenes.innerHTML = '';

        let contenidoImagenes = "";


        //Cargamos la imagen pasiva ---------------------------

        habilidadPasiva.forEach(spell => {
            contenidoImagenes = `<div class="contenedorHabilidad" data-id="${spell.id}">
                                    <div class="imagenHabilidad" style="background-image: url(https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${spell.imagen}); background-repeat: no-repeat;"></div> 
                                    <div class="selectorItem"></div>
                                </div>`
        });


        //Cargamos las imagenes del resto de las habilidades ------------------------

        habilidades.forEach(spell => {
            contenidoImagenes += `<div class="contenedorHabilidad" data-id="${spell.id}">
                                    <div class="imagenHabilidad" style="background-image: url(https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.imagen}); background-repeat: no-repeat;"></div> 
                                    <div class="selectorItem"></div>
                                </div>`;
        });

        contenedorImagenes.innerHTML = contenidoImagenes;


        //Actualizar nombre, titulo y descripcion ----------------------------------

        //Nos guardamos todas las habilidades en un array (passive + spells)
        const allSpells = habilidadPasiva.concat(habilidades);

        // Habilidad que queremos seleccionada por defecto
        const habilidadPredeterminadaId = habilidadPasiva[0].id;

        // Marcar la habilidad predeterminada como seleccionada
        const habilidadPredeterminada = document.querySelector(`.contenedorHabilidad[data-id="${habilidadPredeterminadaId}"]`);

        if (habilidadPredeterminada) {
            habilidadPredeterminada.querySelector('.selectorItem').classList.add('selectedItem'); //agregamos la clase selectedItem. classList-> mira

            // Actualizar la información de la habilidad seleccionada
            const habilidad = allSpells.find(spell => spell.id === habilidadPredeterminadaId);
            if (habilidad) {
                document.getElementById('nombreHabilidad').innerHTML = habilidad.id;
                document.getElementById('tituloSubconsejo').innerHTML = habilidad.nombre;
                document.getElementById('contenidoSubconsejo').innerHTML = habilidad.descripcion;
            }
        }

        // Manejador de eventos para actualizar la información de la habilidad
        contenedorImagenes.addEventListener('click', (event) => {

            let target = event.target; //target = objetivo del click

            /*

            |-- EXPLICACIÓN: --------------------------------------------------------------------------------------------------------------------------------------------------------|
            |                                                                                                                                                                        |
            |           Se empieza desde el objetivo del clic (event.target) y se sube en la jerarquía de elementos hasta encontrar un elemento con la clase contenedorHabilidad     |
            |                                                                                                                                                                        |
            |------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

            */

            // Si el clic NO fue en una imagenHabilidad, sube a contenedorHabilidad (se va subiendo hasta encontrarla)
            while (target && !target.classList.contains('contenedorHabilidad')) {
                target = target.parentElement;
            }

            // Si el clic SÍ fue en una imagenHabilidad...
            if (target) {
                const habilidadId = target.getAttribute('data-id'); //cogemos el id del elemento clicado
                const habilidad = allSpells.find(spell => spell.id === habilidadId); //buscamos el id en el array allSpells
                if (habilidad) { //si dicha hablidad existe...

                    // Actualizar el ID, nombre y descripción
                    document.getElementById('nombreHabilidad').innerHTML = habilidad.id;
                    document.getElementById('tituloSubconsejo').innerHTML = habilidad.nombre;
                    document.getElementById('contenidoSubconsejo').innerHTML = habilidad.descripcion;

                    // Quitar la clase 'selectedItem' de todos los contenedores de habilidad
                    document.querySelectorAll('.selectorItem').forEach(item => {
                        item.classList.remove('selectedItem');
                    });

                    // Agregar la clase 'selectedItem' al contenedor de habilidad clicado
                    target.querySelector('.selectorItem').classList.add('selectedItem');
                }
            }
        });


        //Aspectos -------------------------------------------------------------------------------------------------------------------------------------------


        const contenedorImagenesAspectos =  document.getElementById('contenedorImagenesAspectos');

        contenedorImagenesAspectos.innerHTML = "";

        let imagenesSlider = atributosCampeon.skins;

        let contenidoImagenesAspectos = "";

        imagenesSlider.forEach(skin => {
            urlImagenSkin = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${atributosCampeon.id}_${skin.num}.jpg`;

            contenidoImagenesAspectos += `<div class="imagenAspectos" name ="${skin.name}" style="background-image: url(${urlImagenSkin}); background-repeat: no-repeat;"></div> `;

        });

        contenedorImagenesAspectos.innerHTML = contenidoImagenesAspectos;



        let skinActual = 0;
        let arraySkins = document.getElementsByClassName('imagenAspectos');
        

        function actualizarSkin(skin){

            //Borramos la skin actual al pulsar el botón
            arraySkins[skinActual].style.display = "none";

            //Guardamos la posición nueva a la que queremos acceder
            skinActual = (skin + arraySkins.length) % arraySkins.length; //si da 0 es que está dentro del array, si da 1 se ha "sobresalido" del array | tmb es para el slider infinito

            //Mostramos la nueva skin
            arraySkins[skinActual].style.display = "block";

            //Pintamos el nombre de la imagen
            document.getElementById('nombreAspecto').innerHTML = arraySkins[skinActual].getAttribute("name");
        };

        //Inicializamos en la primera skin
        actualizarSkin(skinActual);

         //Manejamos los botones
         document.getElementById('prevImage').addEventListener("click", () => actualizarSkin(skinActual + 1));
        
         document.getElementById('nextImage').addEventListener("click",  () => actualizarSkin(skinActual - 1));

    });