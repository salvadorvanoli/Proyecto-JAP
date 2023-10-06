let cartProductList = document.getElementById("cartProductList");
let productsInTheCart = JSON.parse(localStorage.getItem("productsInTheCart")) || [];

// Elimina un producto del carrito

function deleteItem(idP){
    let noItemArray = productsInTheCart.filter(element => {
        return element.id != idP;
    })
    productsInTheCart = noItemArray;
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
    window.location.replace('cart.html');
}

// Agrega un elemento a la tabla del carrito

function createListItem(product){
    let productListItem = 
    `<tr>
        <td class="align-middle"><img src="${product.images[0]}" alt="Picture" class="img-thumbnail productImage"></td>
        <td class="align-middle">${product.name}</td>
        <td class="align-middle">${product.currency} ${product.cost}</td>
        <td class="align-middle"><input type="number" min="1" value="1"></td>
        <td class="align-middle"><input type="text" disabled></td>
        <td class="align-middle"><button type="button" class="btn-close" aria-label="Close" onclick="deleteItem('${product.id}')"></button></td>
    </tr>`
    return productListItem;
}

// Muestra los productos en el carrito

function displayProductInTheCart(productList){
    for(let product of productList){
        cartProductList.innerHTML += createListItem(product);
    }
}


// Llamado a la función para mostrar todos los productos del carrito

displayProductInTheCart(productsInTheCart);