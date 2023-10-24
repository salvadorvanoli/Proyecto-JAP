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

function setProductID(id){
  localStorage.setItem("ItemID", JSON.stringify(id));
  window.location = "product-info.html";
}

// function displayProduct(product) {
//   // Crea el contenedor del producto
//   const productElement = document.createElement("div");
//   productElement.className = "product";
//   productElement.onclick = function() {
//     setProductID(product);
//   };

//   // crea elementos del contenedor (imagen, nombre, descripción, precio y cantidad de vendidos)
//   const contentList = [
//     createImage({ class: 'imageElement', image: product.image, name: product.name }),
//     createText({ element: 'h2', class: 'nameElement', text: product.name }),
//     createText({ element: 'p', class: 'descriptionElement', text: product.description }),
//     createText({ element: 'p', class: 'priceElement', text: `${product.cost} ${product.currency}` }),
//     createText({ element: 'p', class: 'soldElement', text: `Vendidos: ${product.soldCount}` }),
//   ];


//   // agrega cada uno de los elementos al contenedor
//   contentList.forEach(item => productElement.appendChild(item));
//   // agrega el contenedor a la lista de elementos
//   const productList = document.getElementById("product-list");
//   productList.appendChild(productElement);
// }

function displayProduct(product){
  let card = `
  <div>
    <div class="card m-2 border border-dark productCard" onclick="setProductID('${product.id}')">
      <img src="${product.image}" class="card-img-top" alt="productPhoto">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text ">${product.description}</p>
      </div>
      <div class="card-footer">
        <small class="text-center">${product.currency} ${product.cost}</small>
        <small class="text-muted">Vendidos en total: ${product.soldCount}</small>
      </div>
    </div>
  </div>
  `;
  let productList = document.getElementById("product-list");
  productList.innerHTML += card;
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
    productsShow = [...products]; // Copia de los productos sin filtro
    calcPrices(products);
    if (Array.isArray(products)) {
      // Construir la lista de productos en el DOM
      products.forEach(product => {
        displayProduct(product);
      });
    } else {
      console.error("La respuesta de la API no contiene un array de productos.");
    }
  })
  .catch(error => {
    console.error("Error al obtener la lista de productos:", error);
  });

// Funcionalidad de filtrado de productos

// Elementos del html

let rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
let rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
let filterPrice = document.getElementById("filterPrice");
let resetPrice = document.getElementById("resetPrice");
let filterHighPrice = document.getElementById("filterHighPrice");
let fiterLowPrice = document.getElementById("fiterLowPrice");
let filterRelevance = document.getElementById("filterRelevance");


// Refresca la lista de productos para aplicar los cambios hechos con los filtrados

function refreshProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(product => displayProduct(product));
}

// Filtrar por nombre
function filterProducts(bool) {
  // Obtener el texto ingresado en el campo de búsqueda
  let searchText = document.getElementById("searchInput").value.toLowerCase();

  // Reiniciar el arreglo cargado
  products = [...productsShow];

  // Filtrar los productos en el array 'products'
  products = products.filter(product => {
    let title = product.name.toLowerCase();
    let description = product.description.toLowerCase();
    return title.includes(searchText) || description.includes(searchText);
  });

  // Si bool es verdadero, aplicar el filtro de precio nuevamente
  if (bool) {
    filterProductsByPrice(false);
  } else {
    // Actualizar la lista de productos en el DOM con los productos filtrados
    refreshProductList();
  }
}

// Elimina los criterios de precio y reinicia la lista

resetPrice.addEventListener("click", function(){
  rangeFilterCountMax.value = "";
  rangeFilterCountMin.value = "";
  filteredProducts = [];
  document.getElementById("searchInput").value = "";
  products = [...productsShow];
  refreshProductList();
});

// Filtra por precio

function filterProductsByPrice(bool){
  if(document.getElementById("searchInput").value){
    if(bool){
      filterProducts(false);
    }
  } else {
    products = [...productsShow];
  }
  let minPrice = parseFloat(rangeFilterCountMin.value);
  let maxPrice = parseFloat(rangeFilterCountMax.value);

  // Establece los precios máximos y mínimos en el caso de que no existan
  if(minPrice<minItemPrice || !minPrice){
    minPrice = minItemPrice;
  }
  if(maxPrice>maxItemPrice || !maxPrice){
    maxPrice = maxItemPrice;
  }


  // Filtra los productos por precio
  filteredProducts = products.filter(product => {
    return product.cost >= minPrice && product.cost <= maxPrice;
  });

  // Carga el arreglo de productos con los filtrados
  products = filteredProducts;
  refreshProductList();
}

filterPrice.addEventListener("click", function(){
  filterProductsByPrice(true);
});

// Muestra desde los precios más altos a los más bajos en orden descendiente

filterHighPrice.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts[0]){
    products = filteredProducts;
  }
  products.sort((a, b) => b.cost - a.cost);
  refreshProductList();
});

// Muestra desde los precios más bajos a los más altos en orden ascendente

fiterLowPrice.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts[0]){
    products = filteredProducts;
  }
  products.sort((a, b) => a.cost - b.cost);
  refreshProductList();
});

// Filtra los productos por relevancia o cantidad de vendidos

filterRelevance.addEventListener("click", function(){
  products = [...productsShow];
  if(filteredProducts[0]){
    products = filteredProducts;
  }
  products.sort((a, b) => b.soldCount - a.soldCount);
  refreshProductList();
});