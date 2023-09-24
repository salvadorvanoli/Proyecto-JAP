document.addEventListener("DOMContentLoaded", function(){

    // Lógica para mostrar el nombre de perfil en los html

    let usuarioStorage = JSON.parse(localStorage.getItem('username')) || null;
    let nombreDeUsuario = document.getElementById("nombreDeUsuario");
    let cerrarSesion = document.getElementById("cerrarSesion");
    let navItem = document.getElementsByClassName("nav-item");

    // Agrega una animación de puntos para la redirección

    function agregarPunto() {
        nombreDeUsuario.textContent += ".";
    }

    if(usuarioStorage === null){
        nombreDeUsuario.innerHTML += "Redirigiendo";
        for(let i = 0; i < navItem.length; i++){
            navItem[i].style.pointerEvents = "none";
        }
        setInterval(agregarPunto, 1000);
    } else {
        for(let i = 0; i < navItem.length; i++){
            navItem[i].style.pointerEvents = "block";
        }
        if(usuarioStorage.length > 10){
            for(let i=0; i<10; i++){
                nombreDeUsuario.textContent += usuarioStorage[i];
            }
            nombreDeUsuario.textContent += "...";
        } else {
            nombreDeUsuario.textContent += usuarioStorage;
        }
    }

    // Lógica para el botón de modo oscuro

    // Agregar código acá Nina

    // Lógica para el botón de cerrar sesión

    cerrarSesion.addEventListener("click", function(){
        localStorage.setItem("loggeado", JSON.stringify(false));
        localStorage.setItem("username", JSON.stringify(null));
        window.location.replace('login.html');
    });
});