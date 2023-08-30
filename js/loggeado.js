document.addEventListener("DOMContentLoaded", function(){

    let valorVariable = JSON.parse(localStorage.getItem('loggeado')) || false;

    if(!valorVariable){
        setTimeout(function() {
            window.location.replace('login.html');
        }, 3000);
    }

});

