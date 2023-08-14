document.addEventListener("DOMContentLoaded", function(){

    let spanishBool = true;
    let englishBool = false;
    let itsPasswordVisible = false;
    let itsDark = false;

    // Lógica del botón para mostrar o ocultar la contraseña en la pestaña de login

    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    let showPassword = document.getElementById("showPassword");

    function visionToggle(elemento){
        if (elemento.type === "password") {
            itsPasswordVisible = true;
            elemento.type = "text";
            if(spanishBool){
                showPassword.value = "Ocultar contraseñas";
            }
            if(englishBool){
                showPassword.value = "Hide passwords";
            }
        } else {
            itsPasswordVisible = false;
            elemento.type = "password";
            if(spanishBool){
                showPassword.value = "Mostrar contraseñas";
            }
            if(englishBool){
                showPassword.value = "Show passwords";
            }
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
        if(password1.value===password2.value){
            username = email.value;
            localStorage.setItem('loggeado', 'true');
        } else {
            if(englishBool){
                alert("The entered passwords do not match");
                event.preventDefault();
            }
            if(spanishBool){
                alert("Las contraseñas introducidas no coinciden");
                event.preventDefault();
            }
        }
    });

    // Lógica para el modo oscuro

    let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
    let fondo = document.getElementsByTagName("body")[0];
    let darkmodeButton = document.getElementById("darkmodeButton"); 
    let darkmodeText = document.getElementById("darkmodeText");

    function darkmodeToggle(){
        if(fondo.style.backgroundColor == "black"){
            itsDark = false;
            fondo.style.backgroundColor = "rgb(248, 249, 250)";
            darkmodeToggleButton.style.backgroundImage = "url(../img/cloudy-bckgrnd.png)";
            darkmodeToggleButton.style.border = "solid black 5px"
            darkmodeButton.src="../img/sun.png";
            darkmodeText.style.color = "black";
            formularioLogin.style.border="solid 10px black";
            if(spanishBool){
                darkmodeText.textContent = "Activar modo oscuro";
            }
            if(englishBool){
                darkmodeText.textContent = "Activate dark mode";
            }
        } else {
            itsDark = true;
            fondo.style.backgroundColor = "black";
            darkmodeToggleButton.style.backgroundImage = "url(../img/night-bckgrnd.png)";
            darkmodeToggleButton.style.border = "solid white 5px"
            darkmodeButton.src="../img/moon.png"
            darkmodeText.style.color = "white";
            formularioLogin.style.border="solid 10px darkslategray";
            if(spanishBool){
                darkmodeText.textContent = "Activar modo claro";
            }
            if(englishBool){
                darkmodeText.textContent = "Activate light mode";
            }
        }
    }

    darkmodeToggleButton.addEventListener("click", function(){
        darkmodeToggle();
    });

    // Lógica para el cambio de idioma

    let spanishLanguage = document.getElementById("spanishLanguage");
    let englishLanguage = document.getElementById("englishLanguage");
    let labelPassword = document.getElementById("labelPassword");
    let labelRepeatPassword = document.getElementById("labelRepeatPassword");
    let japabajo = document.getElementById("japabajo");
    let goUpText = document.getElementById("goUpText");
    let signUpText = document.getElementById("signUpText");

    function changeToEnglish(){
        spanishBool = false;
        englishBool = true;
        labelPassword.textContent = "Password";
        labelRepeatPassword.textContent = "Repeat Password";
        japabajo.innerHTML = 'This website is a property of <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        goUpText.textContent = 'Go up';
        signUpText.textContent = 'Sign up';
        if(itsDark){
            darkmodeText.textContent = "Activate light mode";
        } else {
            darkmodeText.textContent = "Activate dark mode";
        }
        if(itsPasswordVisible){
            showPassword.value = "Hide passwords";
        } else {
            showPassword.value = "Show passwords";
        }
    }

    englishLanguage.addEventListener("click", function(){
        changeToEnglish();
    });

    function changeToSpanish(){
        spanishBool = true;
        englishBool = false;
        labelPassword.textContent = "Contraseña";
        labelRepeatPassword.textContent = "Repetir contraseña";
        japabajo.innerHTML = 'Este sitio forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        goUpText.textContent = 'Volver arriba';
        signUpText.textContent = 'Registrarme';
        if(itsDark){
            darkmodeText.textContent = "Activar modo claro";
        } else {
            darkmodeText.textContent = "Activar modo oscuro";
        }
        if(itsPasswordVisible){
            showPassword.value = "Ocultar contraseñas";
        } else {
            showPassword.value = "Mostrar contraseñas";
        }
    }

    spanishLanguage.addEventListener("click", function(){
        changeToSpanish();
    });
});