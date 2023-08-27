document.addEventListener("DOMContentLoaded", function(){

    let spanishBool = true;
    let englishBool = false;
    let itsDark = false;

    // Lógica del botón para mostrar o ocultar la contraseña en la pestaña de login

    const password1 = document.getElementById("password1");
    let showPasswordImg = document.getElementById("showPasswordImg");

    function visionToggle(elemento, boton){
        if (elemento.type === "password") {
            elemento.type = "text";
            boton.src = "../img/not-show-password-icon.png";
        } else {
            elemento.type = "password";
            boton.src = "../img/show-password-icon.png";
        }
    }
});