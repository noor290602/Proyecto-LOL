fetch('https://ddragon.leagueoflegends.com/cdn/14.16.1/data/en_US/profileicon.json') // + adelante cambiar idioma y version por variables
.then(response => response.json())
.then((response) => {
    const json = response;
    const profilePics = json.data;

    let profilePicsContainer = document.getElementById('profilePics');
    profilePicsContainer.innerHTML = '';
    let htmlProfilePics = '';

    console.log(profilePics);

    Object.values(profilePics).forEach(profilePic => {
        let urlImagenChampionProfilePics = `https://ddragon.leagueoflegends.com/cdn/14.16.1/img/profileicon/${profilePic.image.full}`;

        htmlProfilePics += `<div class="tarjetaPP">
                                <div class="marcoImagenPP">
                                    <div class="imagenPP" style="background-image: url(${urlImagenChampionProfilePics}); background-repeat: no-repeat;"></div>
                                </div>
                            </div>`;
    });

    profilePicsContainer.innerHTML = htmlProfilePics;
})
