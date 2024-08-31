document.addEventListener("configLoaded", function () {
  let championsSinFiltrar = [];
  let textoBuscado = ""; //variable global

  let roles = [];
  let rolesSeleccionados = [];
  let mostrarListaRoles = false;

  let mostrarChampionsOrdenados = false;
  let ordenSeleccionado = 'asc'; // 'asc' para A-Z, 'desc' para Z-A

  fetch(
    `https://ddragon.leagueoflegends.com/cdn/${versionActual}/data/${idiomaActual}/champion.json`
  )
    .then((response) => response.json())
    .then((response) => {
      const json = response;
      const champions = json.data;
      championsSinFiltrar = Object.values(champions);

      //Roles --------------------------------------------------------------------------------------

      championsSinFiltrar.forEach((champion) => {
        champion.tags.forEach((tag) => {
          if (!roles.includes(tag)) {
            roles.push(tag);
          }
        });
      });

      

      let flechaListaRoles = document.getElementById("flechaListaRoles");
      flechaListaRoles.addEventListener("click", desplegarRoles);

      let flechaOrdenarChampions = document.getElementById("flechaOrdenarChampions");
      flechaOrdenarChampions.addEventListener("click", desplegarOpcionesOrdenarPor);

      //Buscador --------------------------------------------------------------------------------------------
      let inputBuscador = document.getElementById("buscador"); //valor que escribe el user

      inputBuscador.addEventListener("input", () => {
        textoBuscado = inputBuscador.value.toLowerCase();
        mostrarCampeones();
      });

      //Borrar buscador --------------------------------------------------------------------------------------
      let btnBorrar = document.getElementById("btnBorrar");

      function limpiar() {
        let inputBuscador = document.getElementById("buscador");
        inputBuscador.value = ""; // Cambia innerContent por value
        inputBuscador.dispatchEvent(new Event("input")); // Dispara el evento input
      }

      btnBorrar.addEventListener("click", limpiar);

      mostrarCampeones();
    });

  function mostrarCampeones() {
    let championsFiltrados = championsSinFiltrar;

    // Buscador
    if (textoBuscado.length > 0) {
      championsFiltrados = championsFiltrados.filter((champion) =>
        champion.name.toLowerCase().includes(textoBuscado)
      );
    }

    // Roles
    if (rolesSeleccionados.length > 0) {
      championsFiltrados = championsFiltrados.filter(champion =>
          rolesSeleccionados.every(rol =>
              champion.tags.includes(rol)
          )
      );
    }

    // Ordenar
    championsFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    if (ordenSeleccionado === 'desc') {
        championsFiltrados.reverse();
    }

    const championsContainer = document.getElementsByClassName("tarjetasChampions")[0];
    championsContainer.innerHTML = "";
    let htmlChampions = "";

    if (championsFiltrados.length === 0) {
      championsContainer.innerHTML = `<p class="mensajeNoItems">NO HAY CAMPEONES QUE CUMPLAN ESTE REQUISITO</p>`;
    } else {
      championsFiltrados.forEach((champion) => {
        let urlImagenChampion = `https://ddragon.leagueoflegends.com/cdn/${versionActual}/img/champion/${champion.image.full}`;

        htmlChampions += `<a class="enlace" href="championsProfile.html?id=${champion.id}">`;
        htmlChampions += '<div class="tarjetaCampeon">';
        htmlChampions += '<div class="marcoImagenCampeon">';
        htmlChampions += `<div class="imagenCampeon" style="background-image: url(${urlImagenChampion}); background-repeat: no-repeat;"></div></div>`;
        htmlChampions +=
          '<p class="nombreCampeon">' + champion.name + "</p></div></a>";
      });

      championsContainer.innerHTML = htmlChampions;
    }
  }

  function desplegarRoles() {
    mostrarListaRoles = !mostrarListaRoles;

    let listaRolesChampions = document.getElementById("listaRolesChampions");

    if (mostrarListaRoles) {
      listaRolesChampions.style.display = "block"; //muestra la lista
      document.getElementById("flechaListaRoles").style.transform = "scaleY(-1)"; //le damos la vuelta a la flecha
      let contenidoRoles = "";

      roles.forEach((rol) => {
        const isChecked = rolesSeleccionados.includes(rol) ? "checked" : "";
        contenidoRoles += `<li class="rolesChampions"><input type="checkbox" class="rolSeleccionado" value="${rol}" ${isChecked}/>${rol}</li>`;
      });

      listaRolesChampions.innerHTML = contenidoRoles;

      //Filtrar
      document.querySelectorAll(".rolSeleccionado").forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
          let valorRol = checkbox.value; //por cada checkbox recogemos el valor
          if (event.target.checked && !rolesSeleccionados.includes(valorRol)) {
            //si está checkeado
            rolesSeleccionados.push(valorRol); //lo añadimos al array de roles seleccionados
          } else {
            const indice = rolesSeleccionados.indexOf(valorRol);

            if (indice > -1) { //si exite dentro del array
              rolesSeleccionados.splice(indice, 1); //eliminamos el rol
            }
          }

          //Mostramos los roles clickados abajo
          let contenedorRolesMostrados = document.getElementById("rolesMostradosChampions");

          let contenidoRolesMostrados = "";

          rolesSeleccionados.forEach((et) => {
            contenidoRolesMostrados += `<div class = "divRolesSeleccionados"><p>${et}</p></div>`;
          });

          contenedorRolesMostrados.innerHTML = contenidoRolesMostrados;
          mostrarCampeones();
        });
      });
    } else {
        listaRolesChampions.style.display = "none"; //cierra la lista
        document.getElementById("flechaListaRoles").style.transform = ""; //le damos la vuelta a la flecha
    }
  }

  function desplegarOpcionesOrdenarPor() {
    mostrarChampionsOrdenados = !mostrarChampionsOrdenados;

    let listaOpcionesOrdenarChampions = document.getElementById("listaOpcionesOrdenarChampions");

    if (mostrarChampionsOrdenados) {
      listaOpcionesOrdenarChampions.style.display = "block"; //muestra la lista
      document.getElementById("flechaOrdenarChampions").style.transform = "scaleY(-1)"; //le damos la vuelta a la flecha
      
      let contenidoOpciones = `
            <li class="opcionOrdenar">
                <input type="radio" class="opcionOrdenarSeleccionada" name="ordenar" value="asc" ${ordenSeleccionado === 'asc' ? 'checked' : ''}/> A-Z
            </li>
            <li class="opcionOrdenar">
                <input type="radio" class="opcionOrdenarSeleccionada"  name="ordenar" value="desc" ${ordenSeleccionado === 'desc' ? 'checked' : ''}/> Z-A
            </li>
        `;

      listaOpcionesOrdenarChampions.innerHTML = contenidoOpciones;

      //Filtrar
       // Agregar event listeners a las opciones de radio
       document.querySelectorAll('input[name="ordenar"]').forEach((radio) => {
        radio.addEventListener("change", (event) => {
                ordenSeleccionado = event.target.value;
                mostrarCampeones();
            });
        });
    
    } else {
      listaOpcionesOrdenarChampions.style.display = "none";
        document.getElementById("flechaOrdenarChampions").style.transform = "";
    }
  }
});
