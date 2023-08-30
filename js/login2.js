document.addEventListener("DOMContentLoaded", function(){
    let spanishBool = true;
    let englishBool = false;
    let itsDark = false;
    const password1 = document.getElementById("password1");
    let showPasswordImg = document.getElementById("showPasswordImg");
    let formularioLogin = document.getElementById("formularioLogin");
    let email = document.getElementById("email");

    // Lógica para guardar los datos de inicio de sesión en localhost

    let usernameArray = JSON.parse(localStorage.getItem("todosLosUsuarios")) || [];

    function existeElUsuario(){
        for(let username of usernameArray){
            if(email.value === username){
                return true;
            }
        }
        return false;
    }

    formularioLogin.addEventListener("submit", function(){
        if(existeElUsuario()){
            localStorage.setItem('username', email.value);
            localStorage.setItem('loggeado', 'true');
        } else {
            if(englishBool){
                alert("The username does not exist");
                event.preventDefault();
            }
            if(spanishBool){
                alert("El usuario no existe");
                event.preventDefault();
            }
        }
    });

    // Lógica del botón para mostrar o ocultar la contraseña en la pestaña de login

    function visionToggle(elemento, boton){
        if (elemento.type === "password") {
            elemento.type = "text";
            boton.src = "../img/not-show-password-icon.png";
        } else {
            elemento.type = "password";
            boton.src = "../img/show-password-icon.png";
        }
    }

    showPasswordImg.addEventListener("click", function(){
        visionToggle(password1, showPasswordImg);
    });

    // Lógica para el modo oscuro

    let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
    let fondo = document.getElementsByTagName("body")[0];

    function darkmodeToggle(){
        if(fondo.style.backgroundColor == "black"){
            itsDark = false;
            fondo.style.backgroundColor = "antiquewhite";
        } else {
            itsDark = true;
            fondo.style.backgroundColor = "black";
        }
    }

    darkmodeToggleButton.addEventListener("click", function(){
        darkmodeToggle();
    });

    // Lógica para el cambio de idioma

    let spanishLanguage = document.getElementById("spanishLanguage");
    let englishLanguage = document.getElementById("englishLanguage");
    let labelPassword = document.getElementById("labelPassword");
    let japabajo = document.getElementById("japabajo");
    let signUpText = document.getElementById("signUpText");
    let welcomeText = document.getElementById("welcomeText");
    let welcomeTitle =  document.getElementById("welcomeTitle");
    let welcomeButton =  document.getElementById("welcomeButton");
    let createTitle = document.getElementById("createTitle");
    let goBackText = document.getElementById("goBackText");

    function changeToEnglish(){
        spanishBool = false;
        englishBool = true;
        labelPassword.innerHTML = 'Password <img src="img/contraseña-candado.png">';
        japabajo.innerHTML = 'This website is a property of <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        signUpText.innerHTML = 'Sign up <img src="img/Flecha-derecha.png">';
        password1.placeholder = "Enter your password";
        welcomeButton.innerHTML = 'Log In <img src="img/Flecha-derecha.png">';
        welcomeTitle.textContent = 'Welcome to eMercado';
        welcomeText.textContent = 'If you already have an account please log in here.';
        createTitle.textContent = 'Log in';
        goBackText.textContent = 'Back to top';
    }

    englishLanguage.addEventListener("click", function(){
        changeToEnglish();
    });

    function changeToSpanish(){
        spanishBool = true;
        englishBool = false;
        labelPassword.innerHTML = 'Contraseña <img src="img/contraseña-candado.png">';
        japabajo.innerHTML = 'Este sitio forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        signUpText.innerHTML = 'Registrarme <img src="img/Flecha-derecha.png">';
        password1.placeholder="Ingrese su contraseña";
        welcomeButton.innerHTML = 'Iniciar Sesion <img src="img/Flecha-derecha.png">';
        welcomeTitle.textContent = 'Bienvenido a eMercado';
        welcomeText.textContent = 'Si ya tienes una cuenta por favor inicia sesion aquí.';
        createTitle.textContent = 'Inicia sesión';
        goBackText.textContent = 'Volver al inicio';
    }

    spanishLanguage.addEventListener("click", function(){
        changeToSpanish();
    });

    // Variable local storage para mantener la sesión iniciada y que no te rediriga al login

    localStorage.setItem('loggeado', 'false');
});