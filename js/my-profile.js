document.addEventListener("DOMContentLoaded", () =>{
    let emailInput = document.getElementById("inputEmail");
    let gmailUser = JSON.parse(localStorage.getItem("username"));
    emailInput.value = gmailUser; 
});