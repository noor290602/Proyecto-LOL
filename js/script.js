// VERSIONS --------------------------------------------------------------------------

const contenedorVersiones = document.getElementById("menuVersiones");
let contenidoSelectVersiones = "";


// Función para establecer la última version por defecto

function versionPorDefecto(arrayVersiones) {
    
    if (!localStorage.getItem("version")) {
        localStorage.setItem("version", arrayVersiones[0]);
    }
}

contenedorVersiones.addEventListener("change", guardarSelectVersion); //escucha el select de versiones

fetch('https://ddragon.leagueoflegends.com/api/versions.json') 
    .then(response => response.json())
    .then((versiones) => {

        versionPorDefecto(versiones);

        versiones.forEach(version => {
            if (localStorage.version != null){ //comprobamos que tenga datos
                if(localStorage.version == version){ //comprobamos que sea el mismo
                    contenidoSelectVersiones += `<option value="${version}" selected>${version}</option> <img src="resources/svg/gaming-pad.svg"/>`;
                    return //salir del if
                }
            }

           contenidoSelectVersiones += `<option value="${version}">${version}</option> <img src="resources/svg/gaming-pad.svg"/>`;
        });

        contenedorVersiones.innerHTML = contenidoSelectVersiones;
 })


//IDIOMAS --------------------------------------------------------------------------

const contenedorIdiomas = document.getElementById("menuIdiomas");
let contenidoSelectIdiomas = "";

// Función para establecer un idioma por defecto
function idiomaPorDefecto() {

    if (!localStorage.getItem("idioma")) {
        localStorage.setItem("idioma", "es_ES"); 
    }
}

contenedorIdiomas.addEventListener("change", guardarSelectIdioma); //escucha el select de idiomas

fetch('https://ddragon.leagueoflegends.com/cdn/languages.json') 
    .then(response => response.json())
    .then((idiomas) => {
        
        idiomaPorDefecto();

        idiomas.forEach(idioma => {
            if (localStorage.idioma != null){ //comprobamos que tenga datos
                if(localStorage.idioma == idioma){ //comprobamos que sea el mismo
                    contenidoSelectIdiomas += `<option value="${idioma}" selected>${idioma}</option> <img src="resources/svg/gaming-pad.svg"/>`;
                    return //salir del if
                }
            }
            contenidoSelectIdiomas += `<option value="${idioma}">${idioma}</option>`;
         });

         contenedorIdiomas.innerHTML = contenidoSelectIdiomas;
})


// Funciones para guardar los selects -----------------------------------------------------------------------------------

function guardarSelectVersion(event) {
    if (localStorage == null){
        localStorage.setItem("version", event.target.arrayVersiones[0])
    } else {
        localStorage.setItem("version", event.target.value);
    }
    
    location.reload();
}

function guardarSelectIdioma(event) {
    localStorage.setItem("idioma", event.target.value);
    location.reload();
}

// NOTAS ------------------------
 // Para ver el evento:
    // debugger;
    // console.log(event);
    //version = event.target;