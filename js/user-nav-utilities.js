document.addEventListener("DOMContentLoaded", function(){

    // Lógica para mostrar el nombre de perfil en los html

    let userStorage = JSON.parse(localStorage.getItem('username')) || null;
    let usernameNavButton = document.getElementById("usernameNavButton");
    let logOut = document.getElementById("logOut");
    let navItem = document.getElementsByClassName("nav-item");

    // Agrega una animación de puntos para la redirección

    function addDot() {
        usernameNavButton.textContent += ".";
    }

    if(userStorage === null){
        usernameNavButton.innerHTML += "Redirigiendo";
        for(let i = 0; i < navItem.length; i++){
            navItem[i].style.pointerEvents = "none";
        }
        setInterval(addDot, 1000);
    } else {
        for(let i = 0; i < navItem.length; i++){
            navItem[i].style.pointerEvents = "block";
        }
        if(userStorage.length > 10){
            for(let i=0; i<10; i++){
                usernameNavButton.textContent += userStorage[i];
            }
            usernameNavButton.textContent += "...";
        } else {
            usernameNavButton.textContent += userStorage;
        }
    }

    // Lógica para el botón de modo oscuro

    // Agregar código acá Nina
    let btnSwitch = document.getElementById("switch");
    btnSwitch.addEventListener("click", () =>{
        document.body.classList.toggle("darkMode");
        btnSwitch.classList.toggle("active")
    });
    // Lógica para el botón de cerrar sesión

    logOut.addEventListener("click", function(){
        localStorage.setItem("loggedIn", JSON.stringify(false));
        localStorage.setItem("username", JSON.stringify(null));
        window.location.replace('login.html');
    });
});