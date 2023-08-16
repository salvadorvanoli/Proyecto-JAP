document.addEventListener("DOMContentLoaded", function(){

    valorVariable = localStorage.getItem('loggeado');

    if(valorVariable === "false" || valorVariable === ""){
        setTimeout(function() {
            window.location.href = "../login.html";
        }, 3000);
    }
    
});