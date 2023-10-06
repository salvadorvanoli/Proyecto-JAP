let images = [];
let productInfoFetch;
let productsInTheCart = JSON.parse(localStorage.getItem("productsInTheCart")) || [];

function inTheCart(info){
  for(let i = 0; i<productsInTheCart.length; i++){
    if(info.id == productsInTheCart[i].id){
      return true;
    }
  }
  return false;
}

function buyProduct(){
  if(!inTheCart(productInfoFetch)){
    productsInTheCart.push(productInfoFetch);
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
  }
}

function createText(options) {
  const element = document.createElement(options.element);
  element.classList.add(options.class);
  element.textContent = options.text;

  return element;
}

/* FUERA DE USO  */
// crea un elemento IMG y le agrega atributos pasados por parámetro (class, src y alt) 
// function createImage(options) {
//     const imageElement = document.createElement("img");
//     imageElement.classList.add(options.class);
//     imageElement.src = options.image;
//     return imageElement;
// }

// crea un carousel de bootstrap 
function createCarousel(images, options) {

  let imageElementsString = "";
  let slideButtonsString = "";
  
  // para cada una de las imágenes
  // Hacemos una string que contiene la estructura para una imagen del carousel 
  // y le injectamos el src obtenido por parametro 
  for (let i = 0; i < images.length; i++) {
    // usamos un operador ternario para que solo el primer elemento tenga la clase active
    const imageDOMString = `
    <div class="carousel-item ${ i === 0 ? "active" : "" }">
      <picture>
        <source media="(min-width: 768px)" srcset="${images[i]}" type="image/webp">
        <img src="${images[i]}" class="img-fluid" alt="...">
      </picture>
    </div>
    `;
    

    // por cada imagen, se crea el botón para navegar hacia ella en el slider
    // usando el mismo ternario de antes
    slideButtonsString +=  `
      <button
        type="button"
        data-bs-target="#carousel-product"
        data-bs-slide-to="${i}" 
        ${ i === 0 ? 'class="active"' : '' }
        aria-current="true" aria-label="${options.title}-${i}"
      ></button>
    `
    imageElementsString += imageDOMString;
  }

  // devolvemos la estructura completa del carousel, con botones de navegación y contenedor
  return `
  <div id="carousel-product" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      ${slideButtonsString}
    </div>
    <div class="carousel-inner">
      ${imageElementsString}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-product" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel-product" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `
}

// Crea un carrousel 

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

  //Hace que los titulos esten en negrita
  function createText(options) {
    const element = document.createElement(options.element);
    element.classList.add(options.class);
  
    const titles = ['Descripción:', 'Precio:', 'Categoría:', 'Vendidos:'];
    const matches = titles.filter(title => options.text.includes(title));
  
    if (matches.length > 0) {
      const title = matches[0];
      const content = options.text.split(title)[1];
      element.innerHTML = `<b>${title}</b>${content}`;
    } else {
      element.textContent = options.text;
    }
  
    return element;
  }

  // se pasan las imagenes al metodo de creacion del carousel
  const carousel = createCarousel(product.images, { title: "", description: "" });
  

  // agrega cada uno de los elementos al contenedor
  contentList.forEach(item => productInfo.appendChild(item));

  // agrega el contenedor a la lista de elementos
  const productInfoDiv = document.getElementById("containerInfo");

  // se agrega el carousel por innerHTML porque no es un objeto DOM, si no una string con html
  // se hace así por la cantidad de elementos que hay que crear para un carousel bootstrap
  productInfoDiv.innerHTML = carousel;

  // botón de compra
  let button = `<button type="button" class="btn btn-primary" onclick="buyProduct()">Comprar</button>`;
  productInfo.innerHTML+=button;

  // productInfo si son objetos DOM, entonces se agregan con appendChild
  productInfoDiv.appendChild(productInfo);
}

// Display de comentarios

function displayStarsInComments(score){
  let starString = "";
  for(let i = 0; i<score; i++){
    starString += `<i class="bi bi-star-fill starS checked"></i>`;
  }
  for(let i = 0; i<(5-score); i++){
    starString += `<i class="bi bi-star-fill starS"></i>`;
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

URL = PRODUCT_INFO_URL + JSON.parse(localStorage.getItem("ItemID")) + ".json";
let URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + JSON.parse(localStorage.getItem("ItemID")) + EXT_TYPE;

function irAlRelacionado(id){
  localStorage.setItem("ItemID", JSON.stringify(id));
  window.location.replace('product-info.html');
}

function showRelatedProducts(data){
  let relatedProductsContainer = document.getElementById('relatedProducts');
  let contentToAppend = "";
  for (const item of data.relatedProducts) {
    contentToAppend += `
        <div class="card" style="width: 18rem;">
          <img src="`+item.image+`" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">`+item.name+`</h5>
            <button onclick="irAlRelacionado(${item.id})" class="btn btn-dark">Ir al producto</button>
          </div>
        </div>
      `
  }
  relatedProductsContainer.innerHTML+= contentToAppend;
}

// Fetch Products
fetch(URL)
.then(response => {
  return response.json()
})
.then(data => {
  displayProduct(data);
  showRelatedProducts(data);
  productInfoFetch = data;
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


//PARTE 4 - AÑADE EFECTO ESTRELLAS
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
let userNick = JSON.parse(localStorage.getItem("username"));
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
  const actualDate = new Date();
  
  const year = actualDate.getFullYear();
  const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
  const day = actualDate.getDate().toString().padStart(2, '0');
  const hour = actualDate.getHours().toString().padStart(2, '0');
  const minutes = actualDate.getMinutes().toString().padStart(2, '0');
  const seconds = actualDate.getSeconds().toString().padStart(2, '0');

  // Formatea la fecha y la hora como "YYYY-MM-DD HH:MM:SS"
  const dateAndHour = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  return dateAndHour;
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); 

  let userOpinion = opinionInput.value;

  if(!userOpinion){
    alert("Debe llenar el campo vacío");
    return;
    
  }

  if(getStarRate() <= 0){
    alert("Valor de estrellas no válido");
    return;
  }

  // Crear una caja para el usuario, el comentario y la puntuación
  const commentBox = document.createElement("div");
  commentBox.classList.add("comment-box");
  commentBox.classList.add("comentarios");

  const userElement = document.createElement("h2");
  if(userNick.length>20){
    let shorterUser = "";
    for(let i = 0; i<20; i++){
      shorterUser+=userNick[i];
    }
    userNick = shorterUser + "...";
    userElement.textContent = userNick;
  } else {
    userElement.textContent = userNick;
  }
  userElement.classList.add("nombreUsuario");

  const commentElement = document.createElement("p");
  commentElement.textContent = userOpinion;

  const dateElement = document.createElement("span");
  dateElement.textContent += " " + obtenerFechaYHoraActual();
  userElement.appendChild(dateElement);

  const puntuacionElement = document.createElement("p");
  puntuacionElement.innerHTML = displayStarsInComments(getStarRate());

  // Agregar los elementos al contenedor de comentarios
  commentBox.appendChild(userElement);
  commentBox.appendChild(commentElement);
  commentBox.appendChild(puntuacionElement);
  commentsContainer.appendChild(commentBox);

  // Limpiar los campos de comentario y puntuación después de enviar
  opinionInput.value = "";
  restartStars();
});

