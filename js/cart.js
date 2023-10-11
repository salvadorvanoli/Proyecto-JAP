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
        <td class="align-middle"><input type="number" id="quantity${num}" min="1" value="${product.count}" oninput="changeValue(${num})" onblur="resetNegatives(${num})"></td>
        <td class="align-middle"> ${product.currency} <span id="subtotal${num}"> ${product.unitCost} </span></td>
        <td class="align-middle"><button type="button" class="btn-close" aria-label="Close" onclick="deleteItem('${product.id}')"></button></td>
    </tr>`
    return productListItem;
}

// Permite calcular en tiempo real el subtotal

// document.addEventListener('DOMContentLoaded', function(){
//     let cantidad = document.getElementById('cantidad');
//     cantidad.dataset.oldValue = cantidad.value;
//     cantidad.addEventListener('change', function(){
//         let subtotal = document.getElementById('subtotal');
//         subtotal.innerHTML = subtotal.innerHTML / cantidad.dataset.oldValue * cantidad.value;
//         cantidad.dataset.oldValue = cantidad.value;
//     });
// });

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
