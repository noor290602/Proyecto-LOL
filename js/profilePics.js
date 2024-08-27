const urlPagina = new URLSearchParams(window.location.search).get("page");
const profilePicsAMostrarPorPagina = 40; // Número de imágenes por página
let pagActual = parseInt(urlPagina) || 1;
let arrayProfilePics = [];

//Paso de variables a traves de localStorage
let storage = window.localStorage;
let version = storage.getItem("version");
let idioma = storage.getItem("idioma");

fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${idioma}/profileicon.json`)
    .then(response => response.json())
    .then((response) => {
        const profilePics = response.data;
        arrayProfilePics = Object.values(profilePics);

        muestraPP(pagActual);
        paginacion();
    });

function muestraPP(pagina) {
    const origen = (pagina - 1) * profilePicsAMostrarPorPagina;
    const fin = origen + profilePicsAMostrarPorPagina;

    const profilePicsContainer = document.getElementById("profilePics");
    profilePicsContainer.innerHTML = "";

    const arrayProfilePicsPartido = arrayProfilePics.slice(origen, fin);
    let htmlProfilePics = '';

    arrayProfilePicsPartido.forEach(profilePic => {
        let urlSpriteProfilePics = `https://ddragon.leagueoflegends.com/cdn/${version}/img/sprite/${profilePic.image.sprite}`;

        htmlProfilePics += `<div class="tarjetaPP">
                                <div class="marcoImagenPP">
                                    <div class="imagenPP" style="background-image: url(${urlSpriteProfilePics});
                                                                background-position: -${profilePic.image.x}px -${profilePic.image.y}px;
                                                                width: ${profilePic.image.w}px;
                                                                height: ${profilePic.image.h}px;">
                                    </div>
                                </div>
                            </div>`;
    });

    profilePicsContainer.innerHTML = htmlProfilePics;
}

function paginacion() {
    const totPaginas = Math.ceil(arrayProfilePics.length / profilePicsAMostrarPorPagina);
    const totPaginasAMostrar = 7 > totPaginas ? totPaginas : 7;

    let inicio = pagActual - 3;
    let fin = pagActual + 3;

    if (inicio < 1) {
        inicio = 1;
        fin = inicio + totPaginasAMostrar - 1;
    }

    if (fin > totPaginas) {
        fin = totPaginas;
        inicio = fin - totPaginasAMostrar + 1;
    }

    const contenedorOpciones = document.getElementById("opciones");
    contenedorOpciones.innerHTML = "";

    for (let i = inicio; i <= fin; i++) {
        const enlace = document.createElement("a");
        enlace.textContent = i;
        enlace.classList.add("opcion");
        enlace.style.textDecoration = "none";
        enlace.setAttribute("href", `profilePics.html?page=${i}`);
        contenedorOpciones.appendChild(enlace);

        if (i === pagActual) {
            enlace.classList.add("pagActual");
        }
    }

    // Manejo de botones de navegación
    const btnPrevPP = document.getElementById('prevPP');
    const btnNextPP = document.getElementById('nextPP');
    const btnPrimerPP = document.getElementById('primerPP');
    const btnUltimoPP = document.getElementById('ultimoPP');

    btnPrevPP.href = pagActual > 1 ? `profilePics.html?page=${pagActual - 1}` : `profilePics.html?page=1`;
    btnNextPP.href = pagActual < totPaginas ? `profilePics.html?page=${pagActual + 1}` : `profilePics.html?page=${totPaginas}`;
    btnPrimerPP.href = `profilePics.html?page=1`;
    btnUltimoPP.href = `profilePics.html?page=${totPaginas}`;
}
