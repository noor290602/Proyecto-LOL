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
