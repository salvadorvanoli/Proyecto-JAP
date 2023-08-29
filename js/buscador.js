//const precio = document.getElementById("priceElement")

/*for(let i =0; 1< precio.length; i++){
    console.log(precio[i].textContent);
} */

//Esta funcion es para tomar los elementos del precio y guardarlos
/*function showList(array) {
    const container = document.getElementsByClassName("priceElement");
    container.innerHTML = "";
    array.forEach((element) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(element));
      container.appendChild(li);
    });
  }
  
  //esta funcion es para mostrar los elementos precio
  document.addEventListener("DOMContentLoaded", (e) => {
  const arrayStrings = precio.filter(item => typeof item === "number");
  const newArray = arrayStrings.sort();
  showList(precio)
  }); */
  
  /*const elements = document.getElementsByClassName("mi-priceElement");

 const contentList = [
    createImage({ class: 'imageElement', image: product.image, name: product.name }),
    createText({ element: 'h2', class: 'nameElement', text: product.name }),
    createText({ element: 'p', class: 'descriptionElement', text: product.description }),
    createText({ element: 'p', class: 'priceElement', text: `$${product.cost} ${product.currency}` }),
    createText({ element: 'p', class: 'soldElement', text: `Vendidos: ${product.soldCount}` }),
  ];


for (let i = 0; i < priceElement.length; i++) {
  console.log(elements[i]);
} */

// Obtén referencias a los elementos del DOM


const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterButton = document.getElementById("filterButton");
//const productList = document.getElementById("productList");
//const price = document.getElementsByClassName("productsUrl");
let searchText = document.getElementById("searchInput").value.toLowerCase();
// Función para mostrar productos en la página
function displayProducts(products) {
  searchText.innerHTML = ""; // Limpia la lista de productos

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - Precio: ${product.price} - Vendidos: ${product.soldCount}`;
        searchText.appendChild(li);
    });
}

// Agrega un event listener al botón de filtrado
filterButton.addEventListener("click", function() {
    const minPrice = parseInt(minPriceInput.value);
    const maxPrice = parseInt(maxPriceInput.value);

    // Filtra y muestra los productos en función del rango de precio
    const filteredProducts = filterByPriceRange(searchText, minPrice, maxPrice);
    displayProducts(filteredProducts);
});

// Ejemplo de lista de productos
/* const productList = [
    { name: "Producto A", price: 50, soldCount: 10 },
    { name: "Producto B", price: 30, soldCount: 20 },
    { name: "Producto C", price: 70, soldCount: 5 }
]; */

// Función para filtrar productos por rango de precio
function filterByPriceRange(products, minPrice, maxPrice) {
    return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

// Mostrar todos los productos al cargar la página
displayProducts(searchText);
