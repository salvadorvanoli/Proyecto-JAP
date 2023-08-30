// crea un de texto definido en options.element y le agrega atributos pasados por la variable options (class y textcontent) 
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

function displayProduct(product) {
  // Crea el contenedor del producto
  const productElement = document.createElement("div");
  productElement.className = "product";

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

function clearProductList (){
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""
}

document.addEventListener("DOMContentLoaded", function () {
    
  // consigue la categoria seleccionada en el index (seteada por index.js)
  const categorySelected = localStorage.getItem("catID");

  // URL para obtener la lista de productos de la categoría 101 (Autos)
  const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${categorySelected}.json`;

  // Realizar la petición web
  fetch(productsUrl)
    .then(response => response.json())
    .then(data => {
      // Verifica que "products" sea un array dentro de la respuesta
      const products = data.products;
      console.log("products: ",products)
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
  });
  
  // Filtro por precios
  const productList = document.getElementById("productList");
  const filterButton = document.getElementById("filterButton");
  const clearButton = document.getElementById("clearButton");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const sortPriceAscButton = document.getElementById("sortPriceAsc");
  const sortPriceDescButton = document.getElementById("sortPriceDesc");
  const sortRelevanceDescButton = document.getElementById("sortRelevanceDesc");

  let productsData = []; //almacena los datos 
  
  // Al hacer click en el boton del filtro (filterButton)
  filterButton.addEventListener("click", () => {
    console.log("¡Botón clickeado! Mensaje en la consola.");
    const minPrice = parseFloat(minPriceInput.value); //Obtenemos el valor del boton Precio Minimo
    const maxPrice = parseFloat(maxPriceInput.value); //"  " del precio màximo
    console.log(minPrice, maxPrice);


    //Toma los datos del ARRAY
    const categorySelected = localStorage.getItem("catID");
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${categorySelected}.json`;
    //funcion para pedir informacion
    fetch(productsUrl)
    .then(response => response.json())
    .then(data => {
      // Verifica que "products" sea un array dentro de la respuesta
      let products = data.products;
      console.log("nuevos products: ",products)
      if (Array.isArray(products)) {
        // Construir la lista de productos en el DOM
       // products.forEach(product => displayProduct(product));
        products = products.filter(product => {
          console.log(product.cost, product.name)

          if (product.cost >= minPrice && product.cost <= maxPrice) {
            return true

          } 
          return false
        })
        console.log(products)

        clearProductList()
        products.forEach(product => displayProduct(product));
        

      } else {
        console.error("La respuesta de la API no contiene un array de productos.");
      }
    })
    .catch(error => {
      console.error("Error al obtener la lista de productos:", error);
    });
    clearButton.addEventListener("click", () => {
      minPriceInput.value = "";
      maxPriceInput.value = "";
      const categorySelected = localStorage.getItem("catID");


      clearProductList ()
  // URL para obtener la lista de productos de la categoría 101 (Autos)
  const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${categorySelected}.json`;
      
  // Realizar la petición web
  fetch(productsUrl)
    .then(response => response.json())
    .then(data => {
      // Verifica que "products" sea un array dentro de la respuesta
      const products = data.products;
      console.log("products: ",products)
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

    });
    

    
});





