let productsInTheCart = JSON.parse(localStorage.getItem("productsInTheCart")) || [];
let allTheEmails = JSON.parse(localStorage.getItem("allTheEmails"));

// Busca cuál es el carrito del usuario actual

function searchUserCart(username){
    let cont = 0;
    for(let userCart of productsInTheCart){
        if(userCart.user == username){
        return cont;
        }
        cont++;
    }
    return -1;
}

let currentUserCart = searchUserCart(JSON.parse(localStorage.getItem("username")));
let username = JSON.parse(localStorage.getItem("username"));

// Archivo por defecto que va a tener la imagen

const img = document.getElementById("img");
const file = document.getElementById("picture");

// Carga la imagen guardada en el localStorage
const savedImg = productsInTheCart[currentUserCart].img || "img/img_perfil.png";
img.src = savedImg;

// Guarda el valor de una nueva imagen

let newImage;

// Cuando se introduce una nueva imagen, la actualiza en el html

file.addEventListener('change', e => {

  // Pregunta si el evento target tiene un archivo seleccionado
  
  if (e.target.files[0]) {
    const reader = new FileReader();

    // Establece la propiedad src del elemento de la imagen en la ruta del archivo
    reader.onload = function(e) {
      img.src = e.target.result;
      newImage = e.target.result;
    }

    // Lee el contenido del archivo como una URL de datos base64
    reader.readAsDataURL(e.target.files[0]);
  }
});

// Inputs

let emailInput = document.getElementById("emailInput");
let nameInput = document.getElementById("nameInput");
let secondNameInput = document.getElementById("secondNameInput");
let phoneInput = document.getElementById("phoneInput");
let lastnameInput = document.getElementById("lastnameInput");
let secondLastnameInput = document.getElementById("secondLastnameInput");

document.addEventListener("DOMContentLoaded", () =>{
  emailInput.value = productsInTheCart[currentUserCart].user;
  nameInput.value = productsInTheCart[currentUserCart].name;
  secondNameInput.value =productsInTheCart[currentUserCart].second_name;
  phoneInput.value = productsInTheCart[currentUserCart].phone_number;
  lastnameInput.value = productsInTheCart[currentUserCart].lastname;
  secondLastnameInput.value = productsInTheCart[currentUserCart].second_lastname;
});

// Lógica de la validación

const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("form");
const invalidEmail = document.getElementById("invalidEmail");

function emailDoesNotExist(email){
  filteredAllTheEmails = allTheEmails.filter(element => {
    return element != JSON.parse(localStorage.getItem("username"))
  })
  for(let user of filteredAllTheEmails){
    if(email == user){
      invalidEmail.classList.add("d-block");
      invalidEmail.classList.remove("d-none");
      return false;
    }
  }
  invalidEmail.classList.add("d-none");
  invalidEmail.classList.remove("d-block");
  return true;
}

function searchUserInTheArray(array){
  let userNumber = 0;
  for(let user of array){
    console.log(user);
    console.log(username);
    if(user == username){
      console.log(userNumber);
      return userNumber;
    }
    userNumber++;
  }
}

submitBtn.addEventListener("click", function(){
  form.classList.add("was-validated");
  if(emailInput.checkValidity() && nameInput.checkValidity() && lastnameInput.checkValidity() && emailDoesNotExist(emailInput.value)){
    productsInTheCart[currentUserCart].user = emailInput.value;
    allTheEmails[searchUserInTheArray(allTheEmails)] = emailInput.value;
    localStorage.setItem("allTheEmails", JSON.stringify(allTheEmails));
    if(newImage){
      productsInTheCart[currentUserCart].img = newImage;
    }
    productsInTheCart[currentUserCart].name = nameInput.value;
    productsInTheCart[currentUserCart].lastname = lastnameInput.value;
    productsInTheCart[currentUserCart].phone_number = phoneInput.value;
    productsInTheCart[currentUserCart].second_name = secondNameInput.value;
    productsInTheCart[currentUserCart].second_lastname = secondLastnameInput.value;
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
    localStorage.setItem("username", JSON.stringify(emailInput.value));
  } else {
    event.preventDefault();
  }
})