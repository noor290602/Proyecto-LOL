// Función para establecer la última versión por defecto
function versionPorDefecto(arrayVersiones) {
    if (!localStorage.getItem("version") && arrayVersiones.length > 0) {
        localStorage.setItem("version", arrayVersiones[0]);
    }
    
    return localStorage.getItem("version") || arrayVersiones[0];
}

// Función para establecer un idioma por defecto
function idiomaPorDefecto() {
    if (!localStorage.getItem("idioma")) {
        localStorage.setItem("idioma", "es_ES");
    }
    
    return localStorage.getItem("idioma") || "es_ES";
}

// Funciones para guardar los selects
function guardarSelectVersion(event) {
    localStorage.setItem("version", event.target.value);
    location.reload();
}

function guardarSelectIdioma(event) {
    localStorage.setItem("idioma", event.target.value);
    location.reload();
}

// Variables globales para versión e idioma
let versionActual = "";
let idiomaActual = "";

// Cargar versiones
function cargarVersiones() {
    const contenedorVersiones = document.getElementById("menuVersiones");
    let contenidoSelectVersiones = "";

    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(response => response.json())
        .then((versiones) => {
            versionActual = versionPorDefecto(versiones);

            versiones.forEach(version => {
                const selected = versionActual === version ? 'selected' : '';
                contenidoSelectVersiones += `<option value="${version}" ${selected}>${version}</option>`;
            });

            contenedorVersiones.innerHTML = contenidoSelectVersiones;
            contenedorVersiones.addEventListener("change", guardarSelectVersion);
            
            // Disparar evento de versión cargada
            document.dispatchEvent(new Event('versionLoaded'));
        })
        
}

// Cargar idiomas
function cargarIdiomas() {
    const contenedorIdiomas = document.getElementById("menuIdiomas");
    let contenidoSelectIdiomas = "";

    fetch('https://ddragon.leagueoflegends.com/cdn/languages.json')
        .then(response => response.json())
        .then((idiomas) => {
            idiomaActual = idiomaPorDefecto();

            idiomas.forEach(idioma => {
                const selected = idiomaActual === idioma ? 'selected' : '';
                contenidoSelectIdiomas += `<option value="${idioma}" ${selected}>${idioma}</option>`;
            });

            contenedorIdiomas.innerHTML = contenidoSelectIdiomas;
            contenedorIdiomas.addEventListener("change", guardarSelectIdioma);
            
            // Disparar evento de idioma cargado
            document.dispatchEvent(new Event('idiomaLoaded'));
        })
        
}

// Cargamos el DOM antes de cargar las versiones y el idioma
document.addEventListener('DOMContentLoaded', () => {
    cargarVersiones();
    cargarIdiomas();
});

// Evento cuando ambos (versión e idioma) están cargados
let versionLoaded = false;
let idiomaLoaded = false;

document.addEventListener('versionLoaded', () => {
    versionLoaded = true;
    checkBothLoaded();
});

document.addEventListener('idiomaLoaded', () => {
    idiomaLoaded = true;
    checkBothLoaded();
});

function checkBothLoaded() {
    if (versionLoaded && idiomaLoaded) {
        document.dispatchEvent(new Event('configLoaded'));
    }
}