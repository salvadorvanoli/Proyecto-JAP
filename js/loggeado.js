document.addEventListener("DOMContentLoaded", function(){

    valorVariable = localStorage.getItem('loggeado');

    if(valorVariable === "false" || (valorVariable != "true" && valorVariable != "false")){
        setTimeout(function() {
            // window.location.href = "../login.html";
            window.location.replace('login.html');
        }, 3000);
    }

});