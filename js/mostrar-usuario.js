document.addEventListener("DOMContentLoaded", function(){

    // Lógica para mostrar el nombre de perfil en los html

    let usuarioStorage = JSON.parse(localStorage.getItem('username')) || null;
    let nombreDeUsuario = document.getElementById("nombreDeUsuario");
    let cerrarSesion = document.getElementById("cerrarSesion");

    function agregarPunto() {
        nombreDeUsuario.textContent += ".";
    }

    if(usuarioStorage === null){
        nombreDeUsuario.textContent += "Redirigiendo";
        cerrarSesion.style.display = "none";
        setInterval(agregarPunto, 1000);
    } else {
        cerrarSesion.style.display = "block";
        if(usuarioStorage.length > 10){
            for(let i=0; i<10; i++){
                nombreDeUsuario.textContent += usuarioStorage[i];
            }
            nombreDeUsuario.textContent += "...";
        } else {
            nombreDeUsuario.textContent += usuarioStorage;
        }
    }

    // Lógica para el botón de cerrar sesión

    cerrarSesion.addEventListener("click", function(){
        localStorage.setItem("loggeado", JSON.stringify(false));
        localStorage.setItem("username", JSON.stringify(null));
        window.location.replace('login.html');
    });
});