document.addEventListener("DOMContentLoaded", function(){

    let valorVariable = localStorage.getItem('loggeado');

    if(valorVariable === "false" || (valorVariable != "true" && valorVariable != "false")){
        setTimeout(function() {
            window.location.replace('login.html');
        }, 3000);
    }

});