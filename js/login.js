document.addEventListener("DOMContentLoaded", function(){

    // Lógica del botón para mostrar o ocultar la contraseña en la pestaña de login

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

    // Lógica para guardar los datos de inicio de sesión en localhost

    let formularioLogin = document.getElementById("formularioLogin");
    let username;
    let email = document.getElementById("email");

    formularioLogin.addEventListener("submit", function(){
        username = email.value;
        localStorage.setItem('loggeado', 'true');
    });
});