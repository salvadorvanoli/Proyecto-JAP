let cartProductList = document.getElementById("cartProductList");
let productsInTheCart = JSON.parse(localStorage.getItem("productsInTheCart")) || [
    {
        "user": [
            JSON.parse(localStorage.getItem("username"))
        ],
        "articles": []
    }
];

// Busca cuál es el carrito del usuario actual

function searchUserCart(username){
    let cont = 0;
    for(let userCart of productsInTheCart){
      if(userCart.user[0] == username){
        return cont;
      }
      cont++;
    }
    return -1;
}

let actualUserCart = searchUserCart(JSON.parse(localStorage.getItem("username")));

// Elimina un producto del carrito

function deleteItem(idP){
    let noItemArray = productsInTheCart[actualUserCart].articles.filter(element => {
        return element.id != idP;
    })
    productsInTheCart[actualUserCart].articles = noItemArray;
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
    window.location.replace('cart.html');
}

// Resetea las cantidades negativas

function resetNegatives(number){
    if(document.getElementById("quantity" + number).value <= 0){
        document.getElementById("quantity" + number).value = 1;
    }
}

// Busca el número de un producto en un array y lo devuelve

function searchProduct(id, cart){
    let cont = 0;
    for(let product of cart){
        if(product.id === id){
            return cont;
        }
        cont++;
    }
    return -1;
}

// Guarda las cantidades actualizadas de los productos agregados al carrito

function saveQuantities(number, id){
    let cart = productsInTheCart[actualUserCart].articles;
    productsInTheCart[actualUserCart].articles[searchProduct(id, cart)].count = document.getElementById("quantity" + number).value;
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
}

// Combina las funciones de resetear los valores negativos y guardar las cantidades actualizadas

function quantityOnBlur(number, id){
    resetNegatives(number);
    saveQuantities(number, id);
}

// Cambia de manera dinámica los subtotales de los productos

function changeValue(num){
    let priceTag = document.getElementById("price" + num);
    let newQuantity = document.getElementById("quantity" + num);
    let subtotalPrice = document.getElementById("subtotal" + num);
    if(newQuantity.value > 0){
        subtotalPrice.innerHTML = newQuantity.value * priceTag.innerHTML;
    } else {
        subtotalPrice.innerHTML = priceTag.innerHTML;
    }
}

// Agrega un elemento a la tabla del carrito

function createListItem(product, num){
    let productListItem = 
    `<tr>
        <td class="align-middle"><img src="${product.image}" alt="Picture" class="img-thumbnail productImage"></td>
        <td class="align-middle">${product.name}</td>
        <td class="align-middle">${product.currency} <span id="price${num}">${product.unitCost}</span></td>
        <td class="align-middle"><input type="number" id="quantity${num}" min="1" value="${product.count}" oninput="changeValue(${num})" onblur="quantityOnBlur(${num}, ${product.id})"></td>
        <td class="align-middle"> ${product.currency} <span id="subtotal${num}"> ${product.unitCost} </span></td>
        <td class="align-middle"><button type="button" class="btn-close" aria-label="Close" onclick="deleteItem('${product.id}')"></button></td>
    </tr>`
    return productListItem;
}

// Muestra los productos en el carrito

function displayProductInTheCart(productList){
    let cantProd = 0;
    for(let product of productList[actualUserCart].articles){
        cartProductList.innerHTML += createListItem(product, cantProd);
        cantProd++;
    }
}

// Llamado a la función para mostrar todos los productos del carrito

displayProductInTheCart(productsInTheCart);

const CART_URL_USER_PRODUCT = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
fetch(CART_URL_USER_PRODUCT)
    .then(response => response.json())
    .then(data => {
        let CART_USER_PRODUCTS = data.articles;
        let PRODUCT_CART_USER = data.articles[0];
        cartProductList.innerHTML += createListItem(PRODUCT_CART_USER, 1);
    })
    .catch(error => console.log(error));
