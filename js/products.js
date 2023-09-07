// crea un de texto definido en options.element y le agrega atributos pasados por la variable options (class y textcontent) 

let products = [];
let productsShow = [];
let filteredProducts = [];
let minItemPrice = Infinity;
let maxItemPrice = 0;

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
  imageElement.alt = options.name;

  return imageElement;
}

function setProductID(product){
  localStorage.setItem("ItemID", JSON.stringify(product.id));
  window.location = "product-info.html";
}

function displayProduct(product) {
  // Crea el contenedor del producto
  const productElement = document.createElement("div");
  productElement.className = "product";
  productElement.onclick = function() {
    setProductID(product);
  };

  // crea elementos del contenedor (imagen, nombre, descripción, precio y cantidad de vendidos)
  const contentList = [
    createImage({ class: 'imageElement', image: product.image, name: product.name }),
    createText({ element: 'h2', class: 'nameElement', text: product.name }),
    createText({ element: 'p', class: 'descriptionElement', text: product.description }),
    createText({ element: 'p', class: 'priceElement', text: `$${product.cost} ${product.currency}` }),
    createText({ element: 'p', class: 'soldElement', text: `Vendidos: ${product.soldCount}` }),
  ];


  // agrega cada uno de los elementos al contenedor
  contentList.forEach(item => productElement.appendChild(item));
  // agrega el contenedor a la lista de elementos
  const productList = document.getElementById("product-list");
  productList.appendChild(productElement);
}
    
// consigue la categoria seleccionada en el index (seteada por index.js)
const categorySelected = localStorage.getItem("catID");

// URL para obtener la lista de productos de la categoría 101 (Autos)
const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${categorySelected}.json`;

// Calcula precios máximos y mínimos de los productos

function calcPrices(products){
  for(let i=0; i<products.length; i++){
    if(products[i].cost < minItemPrice){
      minItemPrice = products[i].cost;
    }
    if(products[i].cost > maxItemPrice){
      maxItemPrice = products[i].cost;
    }
  }
}

// Realizar la petición web
fetch(productsUrl)
  .then(response => response.json())
  .then(data => {
    // Verifica que "products" sea un array dentro de la respuesta
    products = data.products;
    productsShow = [...products];
    calcPrices(products);
    if (Array.isArray(products)) {
      // Construir la lista de productos en el DOM
      products.forEach(product => displayProduct(product));
    } else {
      console.error("La respuesta de la API no contiene un array de productos.");
    }
  })
  .catch(error => {
    console.error("Error al obtener la lista de productos:", error);
  });


// Funcionalidad de filtrado de productos

// Refresca la lista de productos para aplicar los cambios hechos con los filtrados

function refreshProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => displayProduct(product));
}

// Filtrar por nombre

function filterProducts() {
  // Obtener el texto ingresado en el campo de búsqueda
  let searchText = document.getElementById("searchInput").value.toLowerCase();

  // Obtener todos los elementos de la lista de productos

  let products = document.getElementById("product-list").children;

  // Recorrer cada producto y ocultar/mostrar según la coincidencia con el texto de búsqueda
  for (let i = 0; i < products.length; i++) {
    let title = products[i].getElementsByClassName("nameElement")[0].innerText.toLowerCase();
    let description = products[i].getElementsByClassName("descriptionElement")[0].innerHTML.toLowerCase();
  
    if (title.includes(searchText) || description.includes(searchText)) {
      products[i].style.display = "block";
    } else {
      products[i].style.display = "none";
    }
  }
}

let rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
let rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
let filtrarPrecio = document.getElementById("filtrarPrecio");
let borrarPrecio = document.getElementById("borrarPrecio");
let filtrarPrecioAlto = document.getElementById("filtrarPrecioAlto");
let filtrarPrecioBajo = document.getElementById("filtrarPrecioBajo");
let filtrarRelevancia = document.getElementById("filtrarRelevancia");

// Elimina los criterios de precio y reinicia la lista

borrarPrecio.addEventListener("click", function(){
  rangeFilterCountMax.value = "";
  rangeFilterCountMin.value = "";
  filteredProducts = [];
  document.getElementById("searchInput").value = "";
  products = [...productsShow];
  refreshProductList();
})

// Filtra por precio

filtrarPrecio.addEventListener("click", function(){
  let minPrice = parseFloat(rangeFilterCountMin.value);
  let maxPrice = parseFloat(rangeFilterCountMax.value);
  products = [...productsShow];
  if(minPrice<minItemPrice || !minPrice){
    minPrice = minItemPrice;
  }
  if(maxPrice>maxItemPrice || !maxPrice){
    maxPrice = maxItemPrice;
  }
  filteredProducts = products.filter(product => {
    return product.cost >= minPrice && product.cost <= maxPrice;
  });
  products = filteredProducts;
  refreshProductList();
});

// Muestra desde los precios más altos a los más bajos en orden descendiente

filtrarPrecioAlto.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts){
    products = filteredProducts;
  }
  products.sort((a, b) => b.cost - a.cost);
  refreshProductList();
})

// Muestra desde los precios más bajos a los más altos en orden ascendente

filtrarPrecioBajo.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts){
    products = filteredProducts;
  }
  products.sort((a, b) => a.cost - b.cost);
  refreshProductList();
})

// Filtra los productos por relevancia o cantidad de vendidos

filtrarRelevancia.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts){
    products = filteredProducts;
  }
  products.sort((a, b) => b.soldCount - a.soldCount);
  refreshProductList();
})