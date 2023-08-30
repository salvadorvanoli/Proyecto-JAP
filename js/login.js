document.addEventListener("DOMContentLoaded", function(){

    let spanishBool = true;
    let englishBool = false;
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    let showPasswordImg = document.getElementById("showPasswordImg");
    let showPasswordImg2 = document.getElementById("showPasswordImg2");
    let formularioLogin = document.getElementById("formularioLogin");
    let email = document.getElementById("email");

    // Lógica para guardar los datos de inicio de sesión en localhost

    let usernameArray = JSON.parse(localStorage.getItem("todosLosEmail")) || [];
    let passwordArray = JSON.parse(localStorage.getItem("todasLasContrasenias")) || [];

    function existeElUsuario(){
        for(let username of usernameArray){
            if(email.value === username){
                return true;
            }
        }
        return false;
    }
    
    formularioLogin.addEventListener("submit", function(){
        if(password1.value===password2.value){
            if(!existeElUsuario()){
                usernameArray.push(email.value);
                passwordArray.push(password1.value);
                localStorage.setItem('username', JSON.stringify(email.value));
                localStorage.setItem('todosLosEmail', JSON.stringify(usernameArray));
                localStorage.setItem('todasLasContrasenias', JSON.stringify(passwordArray));
                localStorage.setItem('loggeado', JSON.stringify(true));
            } else {
                alert("Usuario ya existente, inicie sesión");
                event.preventDefault();
            }
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

    showPasswordImg2.addEventListener("click", function(){
        visionToggle(password2, showPasswordImg2);
    });

    // Lógica para el modo oscuro

    let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
    let fondo = document.getElementsByTagName("body")[0];

    function darkmodeToggle(){
        if(fondo.style.backgroundColor == "black"){
            fondo.style.backgroundColor = "antiquewhite";
        } else {
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
    let labelRepeatPassword = document.getElementById("labelRepeatPassword");
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
        labelRepeatPassword.innerHTML = 'Repeat Password <img src="img/contraseña-candado.png">';
        japabajo.innerHTML = 'This website is a property of <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        signUpText.innerHTML = 'Sign up <img src="img/Flecha-derecha.png">';
        password1.placeholder = "Enter your password";
        password2.placeholder = "Repeat your password";
        welcomeButton.innerHTML = 'Log In <img src="img/Flecha-derecha.png">';
        welcomeTitle.textContent = 'Welcome to eMercado';
        welcomeText.textContent = 'If you already have an account please log in here.';
        createTitle.textContent = 'Create an account';
        goBackText.textContent = 'Back to top';
    }

    englishLanguage.addEventListener("click", function(){
        changeToEnglish();
    });

    function changeToSpanish(){
        spanishBool = true;
        englishBool = false;
        labelPassword.innerHTML = 'Contraseña <img src="img/contraseña-candado.png">';
        labelRepeatPassword.innerHTML = 'Repetir contraseña <img src="img/contraseña-candado.png">';
        japabajo.innerHTML = 'Este sitio forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a>';
        signUpText.innerHTML = 'Registrarme <img src="img/Flecha-derecha.png">';
        password1.placeholder="Ingrese su contraseña";
        password2.placeholder="Vuelva a introducir la contraseña";
        welcomeButton.innerHTML = 'Iniciar Sesion <img src="img/Flecha-derecha.png">';
        welcomeTitle.textContent = 'Bienvenido a eMercado';
        welcomeText.textContent = 'Si ya tienes una cuenta por favor inicia sesion aquí.';
        createTitle.textContent = 'Crear una cuenta';
        goBackText.textContent = 'Volver al inicio';
    }

    spanishLanguage.addEventListener("click", function(){
        changeToSpanish();
    });
});