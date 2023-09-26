let images = [];
let productsShow = [];
let commentsToAppend = '';


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
   

  //  crea elementos del contenedor (imagen, nombre, descripción, precio y cantidad de vendidos)
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

// Display de comentarios e info

function displayComments(comments){
  
  let commentsDiv = document.getElementById("comments-container");
  let commentsToAppend = "";
  let commentsLength = Object.keys(comments).length;

  console.log(comments.description);

  for (let i = 0; i < commentsLength; i++) {   
    commentsToAppend += `
      <div class="comentarios">
        <h2>${comments[i].user}</h2>
        <p>${comments[i].description}</p>
        <p>${comments[i].dateTime}</p>
        <p>comments[i].score</p>
        <p>comentario</p>
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
      // infoComments = dataComments;
      displayComments(dataComments);
      
  })
  .catch(error => {
      console.log("Error: ", error)
  });
});

// dropdown issue

("/product-info.html").ready(function() {
  (".dropdown-toggle").dropdown();
});