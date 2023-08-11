// Lógica del botón para mostrar o ocultar la contraseña en la pestaña de login

document.addEventListener("DOMContentLoaded", function(){

const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
let showPassword = document.getElementById("showPassword");

function visionToggle(elemento){
    if (elemento.type === "password") {
        elemento.type = "text";
        showPassword.value = "Ocultar contraseñas"
    } else {
        elemento.type = "password";
        showPassword.value = "Mostrar contraseñas"
    }
}

showPassword.addEventListener("click", function(){
    visionToggle(password1);
    visionToggle(password2);
});

});