document.addEventListener("DOMContentLoaded", function(){

    usuarioStorage = localStorage.getItem('username');
    let nombreDeUsuario = document.getElementById("nombreDeUsuario");

    if(usuarioStorage === null){
        nombreDeUsuario.textContent += "No se ha iniciado sesión - Redirigiendo";
    } else {
        if(usuarioStorage.length > 10){
            for(let i=0; i<10; i++){
                nombreDeUsuario.textContent += usuarioStorage[i];
            }
            nombreDeUsuario.textContent += "...";
        } else {
            nombreDeUsuario.textContent += usuarioStorage;
        }
    }

});