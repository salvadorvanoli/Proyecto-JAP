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
// Agrega un elemento a la tabla del carrito

function createListItem(product){
    let productListItem = 
    `<tr>
        <td class="align-middle"><img src="${product.image}" alt="Picture" class="img-thumbnail productImage"></td>
        <td class="align-middle">${product.name}</td>
        <td class="align-middle" id="costo">${product.currency} ${product.unitCost}</td>
        <td class="align-middle"><input type="number" id="cantidad" min="1" value="${product.count}"></td>
        <td class="align-middle"> ${product.currency} <span id="subtotal"> ${product.unitCost} </span></td>
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
    for(let product of productList[actualUserCart].articles){
        cartProductList.innerHTML += createListItem(product);
    }
}

// Llamado a la función para mostrar todos los productos del carrito

displayProductInTheCart(productsInTheCart);
