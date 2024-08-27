// VERSIONS --------------------------------------------------------------------------

const contenedorVersiones = document.getElementById("menuVersiones");
let contenidoSelectVersiones = "";

fetch('https://ddragon.leagueoflegends.com/api/versions.json') 
    .then(response => response.json())
    .then((versiones) => {
        
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

contenedorVersiones.addEventListener("change", guardarSelectVersion); //escucha el select de versiones

//IDIOMAS --------------------------------------------------------------------------

const contenedorIdiomas = document.getElementById("menuIdiomas");
let contenidoSelectIdiomas = "";

contenedorIdiomas.addEventListener("change", guardarSelectIdioma); //escucha el select de idiomas

fetch('https://ddragon.leagueoflegends.com/cdn/languages.json') 
    .then(response => response.json())
    .then((idiomas) => {
        
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


 function guardarSelectVersion(event) {
    // Para ver el evento
    // debugger;
    // console.log(event);
    //version = event.target;
    localStorage.setItem("version", event.target.value);
    location.reload();
}

function guardarSelectIdioma(event) {
    localStorage.setItem("idioma", event.target.value);
    location.reload();
}