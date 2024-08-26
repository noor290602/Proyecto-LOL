// FLECHA SCROLL -----------------------------------------------------------------

const btnScroll = document.getElementsByClassName("flechaScroll")[0];
const footer = document.querySelector("footer");

btnScroll.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

window.onscroll = () => {
    addBtnScroll();
};

const addBtnScroll = () => {
    const footerTop = footer.getBoundingClientRect().top; //distancia desde la parte superior del viewport (la ventana visible del navegador) hasta la parte superior del footer
    const btnScrollBottom = btnScroll.getBoundingClientRect().bottom; //distancia desde la parte superior del viewport hasta la parte inferior del botón.
    const windowHeight = window.innerHeight; //altura total de la ventana del navegador

    if (window.scrollY < 50) {
        btnScroll.classList.remove('flechaScroll-on');
    } else {
        btnScroll.classList.add('flechaScroll-on');
    }

    // Ocultar el botón si está demasiado cerca del footer
    if (footerTop < windowHeight) { 
        btnScroll.style.opacity = '0';
    } else {
        btnScroll.style.opacity = '1';
    }
}

/*
//VERSIONS --------------------------------------------------------------------------

let versiones;


fetch('https://ddragon.leagueoflegends.com/api/versions.json') // + adelante cambiar idioma y version por variables
    .then(response => response.json())
    .then((response) => {
        const json = response;
        const versiones = json.data;


    versiones.forEach(version => {
        const option = document.createElement('option');
        option.value = version.id;
        option.textContent = version.nombre;
        select.appendChild(option);

    });
})


const contenedor = document.getElementById('contenedor-menu-versiones');
if (contenedor) {
    contenedor.appendChild(select);
}

// Agregar evento de cambio
select.addEventListener('change', function() {
    localStorage.setItem('versionSeleccionada', this.value);
});

// Cargar selección guardada
const versionSeleccionada = localStorage.getItem('versionSeleccionada');
if (versionSeleccionada) {
    select.value = versionSeleccionada;
}


// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarVersiones);
*/