document.addEventListener("DOMContentLoaded", function(){

    let estaLoggeado = false;

    function verificarLoggeo(){
        if(!estaLoggeado){
            setTimeout(function() {
                window.location.href = "../login.html";
            }, 3000);
        }
    }

    verificarLoggeo();

});