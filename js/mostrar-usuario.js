document.addEventListener("DOMContentLoaded", function(){

    // Lógica para mostrar el nombre de perfil en los html

    usuarioStorage = localStorage.getItem('username');
    let nombreDeUsuario = document.getElementById("nombreDeUsuario");
    let cerrarSesion = document.getElementById("cerrarSesion");

    if(usuarioStorage === 'null'){
        nombreDeUsuario.textContent += "No se ha iniciado sesión - Redirigiendo";
        cerrarSesion.style.display = "none";

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
        localStorage.setItem("loggeado", false);
        localStorage.setItem("username", null);
        window.location.replace('login.html');
    });
});