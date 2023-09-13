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

URL = PRODUCT_INFO_URL + JSON.parse(localStorage.getItem("ItemID")) + ".json";

console.log(URL);

fetch(URL)
.then(response => {
    return response.json()
})
.then(data => {
    info = data;
    // if (Array.isArray(info)) {
      // Construir la lista de productos en el DOM
    //   data.forEach(product => displayProduct(product));
      displayProduct(data);
    // }
})
.catch(error => {
    console.log("Error: ", error)
});


//PARTE 4 - AÑADE EFECTO ESTRELAS
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