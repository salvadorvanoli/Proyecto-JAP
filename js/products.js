document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
  
    // URL para obtener la lista de productos de la categoría 101 (Autos)
    const categoryId = 101;
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
  
    // Realizar la petición web
    fetch(productsUrl)
      .then(response => response.json())
      .then(data => {
        // Verifica que "products" sea un array dentro de la respuesta
        const products = data.products;
        if (Array.isArray(products)) {
          // Construir la lista de productos en el DOM
          products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "product";
  
            const imageElement = document.createElement("img");
            imageElement.src = product.image;
            imageElement.alt = product.name;
  
            const nameElement = document.createElement("h2");
            nameElement.textContent = product.name;
  
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = product.description;
  
            const priceElement = document.createElement("p");
            priceElement.textContent = `Precio: $${product.cost} ${product.currency}`;
  
            const soldElement = document.createElement("p");
            soldElement.textContent = `Vendidos: ${product.soldCount}`;
  
            productElement.appendChild(imageElement);
            productElement.appendChild(nameElement);
            productElement.appendChild(descriptionElement);
            productElement.appendChild(priceElement);
            productElement.appendChild(soldElement);
  
            productList.appendChild(productElement);
          });
        } else {
          console.error("La respuesta de la API no contiene un array de productos.");
        }
      })
      .catch(error => {
        console.error("Error al obtener la lista de productos:", error);
      });
  });
  
