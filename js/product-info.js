let images = [];
let productsShow = [];

function createText(options) {
  const element = document.createElement(options.element);
  element.classList.add(options.class);
  element.textContent = options.text;

  return element;
}

// crea un elemento IMG y le agrega atributos pasados por parámetro (class, src y alt) 
function createImage(options) {
    const imageElement = document.createElement("img");
    imageElement.classList.add(options.class);
    imageElement.src = options.image;
    return imageElement;
}

function displayProduct(product) {
  // Crea el contenedor del producto
  const productInfo = document.createElement("div");
  productInfo.className = "product";

  // crea elementos del contenedor (imagen, nombre, descripción, precio y cantidad de vendidos)
  const contentList = [
    createText({ element: 'h2', class: 'name', text: product.name }),
    createText({ element: 'p', class: 'description', text: `Descripción: ${product.description}` }),
    createText({ element: 'p', class: 'cost', text: `Precio: $${product.cost}` }),
    createText({ element: 'p', class: 'category', text: `Categoría: ${product.category}` }),
    createText({ element: 'p', class: 'soldCount', text: `Vendidos: ${product.soldCount}` }),
  ];

  // agrega cada uno de los elementos al contenedor
  contentList.forEach(item => productInfo.appendChild(item));
  // agrega el contenedor a la lista de elementos
  const productInfoDiv = document.getElementById("containerInfo");
  productInfoDiv.appendChild(productInfo);

  for(let i = 0; i<product.images.length; i++){
    let options = {class: 'imageElement', image: product.images[i], name: product.name};
    productInfo.appendChild(createImage(options));
  }
}

// Display de comentarios

function displayStarsInComments(score){
  let starString = "";
  for(let i = 0; i<score; i++){
    starString += `<i class="bi bi-star-fill star checked"></i>`;
  }
  for(let i = 0; i<(5-score); i++){
    starString += `<i class="bi bi-star-fill star"></i>`;
  }
  return starString;
}

function displayComments(comments){
  
  let commentsDiv = document.getElementById("comments-container");
  let commentsToAppend = "";
  let commentsLength = Object.keys(comments).length;

  for (let i = 0; i < commentsLength; i++) {   
    commentsToAppend = `
      <div class="comentarios">
      <div class="d-inline">
        <h2 class="nombreUsuario">${comments[i].user} <span>${comments[i].dateTime}</span></h2>
      </div>
        <p>${comments[i].description}</p>
        <p class="placeholderEstrellas">${
          displayStarsInComments(comments[i].score)
        }
        </p>
      </div>
    `;

    commentsDiv.innerHTML += commentsToAppend;
  }
}

document.addEventListener("DOMContentLoaded", listado => {

  URL = PRODUCT_INFO_URL + JSON.parse(localStorage.getItem("ItemID")) + ".json";
  let URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + JSON.parse(localStorage.getItem("ItemID")) + EXT_TYPE;

  // Fetch Products
  fetch(URL)
  .then(response => {
      return response.json()
  })
  .then(data => {
      info = data;
      displayProduct(data);
  })
  .catch(error => {
      console.log("Error: ", error)
  });

  // Fetch Comments
  fetch(URL_COMMENTS)
  .then(response => {
      return response.json()
  })
  .then(dataComments => {
      displayComments(dataComments);
  })
  .catch(error => {
      console.log("Error: ", error)
  });
});


//PARTE 4 - AÑADE EFECTO ESTRELLAS
const ComentariOpinion = document.getElementById("Opinion")
const ComentaPuntuacion = document.getElementById("puntuacion")
const buttonSend = document.getElementById("button")
const stars = document.querySelectorAll('.star');


stars.forEach(function(star, index){
    star.addEventListener('click', function(){
        for (let i=0; i<=index; i++){
            stars[i].classList.add('checked');
        }
        for (let i=index+1; i<stars.length; i++){
            stars[i].classList.remove('checked')
        }
    })
})

// Lógica para enviar los comentarios

const submitButton = document.getElementById("submitButton");
let userInput = JSON.parse(localStorage.getItem("username"));
const opinionInput = document.getElementById("opinion");
const commentsContainer = document.getElementById("comments-container");

function getStarRate(){
  let cont = 0;
  for (let i=0; i<stars.length; i++){
    if(stars[i].classList.contains('checked')){
      cont++;
    }
  }
  return cont;
}

function restartStars(){
  for (let i=0; i<stars.length; i++){
    stars[i].classList.remove('checked');
  }
}

function obtenerFechaYHoraActual() {
  const fechaActual = new Date();
  
  const año = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const hora = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

  // Formatea la fecha y la hora como "YYYY-MM-DD HH:MM:SS"
  const fechaYHoraFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  return fechaYHoraFormateada;
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); 

  let userUser = userInput;
  let userOpinion = opinionInput.value;

  if(!userOpinion){
    return;
  }

  if(getStarRate() <= 0){
    return;
  }

  // Crear una caja para el usuario, el comentario y la puntuación
  const commentBox = document.createElement("div");
  commentBox.classList.add("comment-box");
  commentBox.classList.add("comentarios");

  const userElement = document.createElement("h2");
  if(userUser.length>10){
    let userMenor = "";
    for(let i = 0; i<10; i++){
      userMenor+=userUser[i];
    }
    userUser = userMenor + "...";
    userElement.textContent = userUser;
  } else {
    userElement.textContent = userUser;
  }
  userElement.classList.add("nombreUsuario");

  const commentElement = document.createElement("p");
  commentElement.textContent = userOpinion;

  const fechaElement = document.createElement("span");
  fechaElement.textContent += " " + obtenerFechaYHoraActual();
  userElement.appendChild(fechaElement);

  const puntuacionElement = document.createElement("p");
  puntuacionElement.innerHTML = displayStarsInComments(getStarRate());

  // Agregar los elementos al contenedor de comentarios
  commentBox.appendChild(userElement);
  commentBox.appendChild(commentElement);
  commentBox.appendChild(puntuacionElement);
  commentsContainer.appendChild(commentBox);

  // Limpiar los campos de usuario, comentario y puntuación después de enviar
  userInput.value = "";
  opinionInput.value = "";
  restartStars();
});

