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
  
