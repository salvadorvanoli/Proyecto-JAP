document.addEventListener("DOMContentLoaded", function(){

    let loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;

    if(!loggedIn){
        setTimeout(function() {
            window.location.replace('login.html');
        }, 3000);
    }

});