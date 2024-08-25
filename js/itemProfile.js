//Obtenemos el id de la URL del perfil del campeon
const urlCampeon = new URLSearchParams(window.location.search);
const idItem = urlCampeon.get("id");

fetch(`https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/item.json`) // + adelante cambiar idioma y version por variables
    .then(response => response.json())
    .then((response) => {
        const json = response;
        const items = json.data;

        entriesItems = Object.entries(items); 
        valuesItems = Object.values(items);
        keysItems = Object.keys(items);

        let actualItem = "";

        entriesItems.forEach(([key, item]) => {
            if(key === idItem){
                actualItem = item;
            }
        });
    
    
    //Imagen principal -------------------------------------------------------------------------------------------------------------------------------------------

    let imagenIP = document.getElementById("imagenIP");

    urlItem = `url('https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${idItem}.png')`;

    imagenIP.style.backgroundImage = urlItem;

    //Nombre item ------------------------------------------------------------------------------------------------------------------------------------------------

    let nombreItem = document.getElementById("nombreItem");
   
    nombreItem.innerHTML = actualItem.name;

    
    //Descripcion item ------------------------------------------------------------------------------------------------------------------------------------------------
    
    let listaDescripcionItem = document.querySelector("#descripcionIP ul");

    listaDescripcionItem.innerHTML = "";

    let plaintext = actualItem.plaintext;
    let descriptions = actualItem.description;

    let contenidoListaDescrpItem = "";

    if (plaintext.length == 0 && descriptions.length == 0) {
        contenidoListaDescrpItem = '<li><p>No hay descripción</p></li>';
    }else {
         contenidoListaDescrpItem = `<li class = "listaDescripcionIP">
                                        <p> ${plaintext} </p>
                                    </li>
                                    <li class = "listaDescripcionIP">
                                        <p> ${descriptions} </p>
                                    </li>`;

    }

   
    listaDescripcionItem.innerHTML = contenidoListaDescrpItem;


    //Precios item --------------------------------------------------------------------------------------------------------------------------------------------------

    let precios = document.querySelector("#preciosIP");
    let contenidoPrecios = `<p class="tituloDescripcionPrecios">Precios</p> <p id="mensajeSinPrecios">Este item no se puede ni comprar ni vender</p>`;
  

    let priceSell = actualItem.gold.sell;
    let priceBase = actualItem.gold.base;
    let priceTotal = actualItem.gold.total;
    let comprable = actualItem.gold.purchasable;

    let precioVenta = document.querySelector("#monedas1 p");
    let precioCompra = document.querySelector("#monedas2 p");
    let precioTotal= document.querySelector("#monedas3 p");

    if(comprable){
        precioVenta.innerHTML = priceBase;
        precioCompra.innerHTML = priceSell;
        precioTotal.innerHTML = priceTotal;

    }else{
        precios.innerHTML = "";
        precios.innerHTML = contenidoPrecios;
    }

  


    //Etiquetas item ------------------------------------------------------------------------------------------------------------------------------------------------

    let etiquetasItem = document.getElementById("propiedadesIP");
    etiquetasItem.innerHTML= "";

    let contenidoItemTags = "";

    actualItem.tags.forEach(tag => {
        contenidoItemTags += `<div class="propiedadIP">${tag}</div>`;
    });

    etiquetasItem.innerHTML = contenidoItemTags;


    //Objetos necesarios item ------------------------------------------------------------------------------------------------------------------------------------------------
   
    let contenedorObjetosNecesarios = document.getElementById("objetosNecesarios");
    contenedorObjetosNecesarios.innerHTML = "";

    let contenidoObjetosNecesarios = "";

    //array de objetos necesarios
    let objetosNecesarios = actualItem.from;

    if(objetosNecesarios !== undefined){

        let arrayObjetosNecesarios = entriesItems.filter(([key, item]) => {
            if(objetosNecesarios.includes(key)){
                return item;
            }
        });
    
        // Otra forma -> filter guarda los 'item' que cumplan la condicion
        //let arrayObjetosNecesarios = entriesItems.filter(([key, item]) => objetosNecesarios.includes(key));
        
    
        arrayObjetosNecesarios.forEach(([key, item]) => {
            
            contenidoObjetosNecesarios += `  <a href="itemProfile.html?id=${key}">
                                                <div class="tarjetaItem">
                                                    <div class="marcoImagenItems">
                                                        <div class="imagenItems" style="background-image: url('https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${key}.png'); background-repeat: no-repeat;"></div>
                                                    </div>
                                                    <p class="nombreItems">${item.name}</p>
                                                </div>
                                            </a>`
        })
    } else{
         contenidoObjetosNecesarios = "<p class= 'mensajeNoItems'>Este objeto no necesita de otros objetos</p>";
    }

    contenedorObjetosNecesarios.innerHTML = contenidoObjetosNecesarios;
    
   
    //Mejoras item ------------------------------------------------------------------------------------------------------------------------------------------------

     //array de mejoras
     let mejoras = actualItem.into;

     let contenedorMejoras = document.getElementById("mejoras");
     contenedorMejoras.innerHTML = "";
 
     let contenidoMejoras = "";

     if(mejoras !== undefined){
        let arrayMejoras = entriesItems.filter(([key, item]) => {
            if(mejoras.includes(key)){
                return item;
            }
        });
    
        // Otra forma -> filter guarda los 'item' que cumplan la condicion
        //let arrayMejoras = entriesItems.filter(([key, item]) => mejoras.includes(key));
        
    
        arrayMejoras.forEach(([key, item]) => {
            
            contenidoMejoras += `  <a href="itemProfile.html?id=${key}">
                                                <div class="tarjetaItem">
                                                    <div class="marcoImagenItems">
                                                        <div class="imagenItems" style="background-image: url('https://ddragon.leagueoflegends.com/cdn/14.16.1/img/item/${key}.png'); background-repeat: no-repeat;"></div>
                                                    </div>
                                                    <p class="nombreItems">${item.name}</p>
                                                </div>
                                            </a>`
        })
    } else{
         contenidoMejoras = "<p class= 'mensajeNoItems'>Este objeto no se puede upgradear</p>";

    }

    contenedorMejoras.innerHTML = contenidoMejoras;

});