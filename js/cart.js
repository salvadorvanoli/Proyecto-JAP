let cartProductList = document.getElementById("cartProductList");
let productsInTheCart = JSON.parse(localStorage.getItem("productsInTheCart")) || [];

// Busca cuál es el carrito del usuario actual

function searchUserCart(username){
    let cont = 0;
    for(let userCart of productsInTheCart){
        if(userCart.user == username){
        return cont;
        }
        cont++;
    }
    return -1;
}

let currentUserCart = searchUserCart(JSON.parse(localStorage.getItem("username")));

// Elimina un producto del carrito

function deleteItem(idP){
    let noItemArray = productsInTheCart[currentUserCart].articles.filter(element => {
        return element.id != idP;
    })
    productsInTheCart[currentUserCart].articles = noItemArray;
    localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
    window.location.replace('cart.html');
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
    let cart = productsInTheCart[currentUserCart].articles;
    let newQuantity = document.getElementById("quantity" + number);
    if(newQuantity.value >= 0){
        productsInTheCart[currentUserCart].articles[searchProduct(id, cart)].count = newQuantity.value;
        if(productsInTheCart[currentUserCart].articles[searchProduct(id, cart)].count == ""){
            productsInTheCart[currentUserCart].articles[searchProduct(id, cart)].count = 0;
        }
        localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
    }
}

// Fetch al API de cotizaciones

let URL_COTIZACIONES = 'https://cotizaciones-brou-v2-e449.fly.dev/currency/latest';

// Le damos un valor default al dólar por si la API está caída

let dolarPrice = 40;

// Hacemos el fetch a la API con el precio del dólar actualizado

fetch(URL_COTIZACIONES)
.then(response=>{
    return response.json()
})
.then(data=>{
    dolarPrice = data.rates.USD.buy;
    calculateSubtotal();
    calculateSend();
    calculateTotal();
})
.catch(error=>console.log(error));

// Traemos los elementos html

let finalTotal = document.getElementById("finalTotal");
let finalSubtotal = document.getElementById("finalSubtotal");
let finalSend = document.getElementById("finalSend");

let subtotalFinalPrice = 0;
let sendTax = 5;
let sendFinalPrice = 0;

let Premium = document.getElementById("Premium");
let Express = document.getElementById("Express");
let Standard = document.getElementById("Standard");

// Agregamos un eventlistener a cada radio button de envío para actualizar los precios en tiempo real

Premium.addEventListener("click", function(){
    sendTax = 15;
    calculateSend();
    calculateTotal();
});

Express.addEventListener("click", function(){
    sendTax = 7;
    calculateSend();
    calculateTotal();
});

Standard.addEventListener("click", function(){
    sendTax = 5;
    calculateSend();
    calculateTotal();
});

// Actualiza en tiempo real los precios finales

// Calcula el subtotal

function calculateSubtotal(){
    console.log(dolarPrice);
    subtotalFinalPrice = 0;
    for(let i=0; i<(productQuantity); i++){
        if(productsInTheCart[currentUserCart].articles[i].currency == "UYU"){
            subtotalFinalPrice += parseInt(document.getElementById("subtotal" + i).innerHTML)/dolarPrice;
        } else {
            subtotalFinalPrice += parseInt(document.getElementById("subtotal" + i).innerHTML);
        }
    }
    finalSubtotal.innerHTML = Math.round(subtotalFinalPrice);
}

// Calcula el precio de envío individualmente

function calculateSend(){
    sendFinalPrice = 0;
    sendFinalPrice = (subtotalFinalPrice/100)*sendTax;
    finalSend.innerHTML = Math.round(sendFinalPrice);
}

// Calcula el precio final (la suma del subtotal + el envío)

function calculateTotal(){
    finalTotal.innerHTML = Math.round(sendFinalPrice + subtotalFinalPrice);
}

// Actualiza los todos los precios

function newTotal(){
    calculateSubtotal();
    calculateSend();
    calculateTotal();
}

// Cambia de manera dinámica los subtotales de los productos

function changeValue(num, id){
    let priceTag = document.getElementById("price" + num);
    let newQuantity = document.getElementById("quantity" + num);
    let subtotalPrice = document.getElementById("subtotal" + num);
    if(newQuantity.value >= 0 && newQuantity.value <= 10000000000){
        subtotalPrice.innerHTML = newQuantity.value * priceTag.innerHTML;
    } else {
        subtotalPrice.innerHTML = 0;
        newQuantity.value = 0;
    }
    if(id !== 0){
        saveQuantities(num, id);
    }
    newTotal();
}

// Agrega un elemento a la tabla del carrito

function createListItem(product, num) {
    let productListItem = 
    `<tr>
        <td class="align-middle"><img src="${product.image}" alt="Picture" class="img-thumbnail productImage"></td>
        <td class="align-middle">${product.name}</td>
        <td class="align-middle">${product.currency} <span id="price${num}">${product.unitCost}</span></td>
        <td class="align-middle"><input type="number" id="quantity${num}" min="1" value="${product.count}" oninput="changeValue(${num}, ${product.id})"></td>
        <td class="align-middle"> ${product.currency} <span id="subtotal${num}"> ${product.unitCost} </span></td>
        <td class="align-middle"><button type="button" class="btn-close" aria-label="Close" onclick="deleteItem('${product.id}')"></button></td>
    </tr>`;

    return productListItem;
}

// Se agrega un producto pre cargado de la URL y permanece en todas las cuentas que se inicien :)

const CART_URL_USER_PRODUCT = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

function inTheCart(info, userNumber){
    for(let i = 0; i<productsInTheCart[userNumber].articles.length; i++){
        if(info.id == productsInTheCart[userNumber].articles[i].id){
        return true;
        }
    }
    return false;
}

fetch(CART_URL_USER_PRODUCT)
.then(response => response.json())
.then(data => {
    let PRODUCT_CART_USER = data.articles[0];
    if (!inTheCart(PRODUCT_CART_USER, currentUserCart)){
        productsInTheCart[currentUserCart].articles.push(PRODUCT_CART_USER);
        localStorage.setItem("productsInTheCart", JSON.stringify(productsInTheCart));
        window.location.replace('cart.html');
    }
})
.catch(error => console.log(error));


// Muestra los productos en el carrito y carga los precios de subtotal

function displayProductInTheCart(productList){
    let cantProd = 0;
    for(let product of productList[currentUserCart].articles){
        cartProductList.innerHTML += createListItem(product, cantProd);
        cantProd++;
    }
}

let productQuantity = 0;

function loadPrices(){
    productQuantity = 0;
    for(let product of productsInTheCart[currentUserCart].articles){
        changeValue(productQuantity, 0);
        productQuantity++;
    }
    newTotal();
}

// Llamado a la función para mostrar todos los productos del carrito 

displayProductInTheCart(productsInTheCart);
loadPrices();

// Deshabilitar los campos del modal

let radioButton1 = document.getElementById("flexRadioDefault1");
let radioButton2 = document.getElementById("flexRadioDefault2");


// Obtener los elementos de input

let cardNumber = document.getElementById("numberCard");
let cardName = document.getElementById("nameCard");
let cardMonth = document.getElementById("monthsCard");
let cardYear = document.getElementById("yearCard");
let cvc = document.getElementById("codCard");
let accountNumber = document.getElementById("accountNumber");
let amount = document.getElementById("amount");
let senderName = document.getElementById("senderName")



// Agregar un listener para detectar cambios en los radio buttons

radioButton1.addEventListener("change", function() {
    if (radioButton1.checked) {
        // Si se selecciona la opción de tarjeta, habilitar los campos correspondientes
        cardNumber.disabled = false;
        cardName.disabled = false;
        cardMonth.disabled = false;
        cardYear.disabled = false;
        cvc.disabled = false;

        // Deshabilitar los campos de transferencia
        accountNumber.disabled = true;
        amount.disabled = true;
        senderName.disabled = true;
    }
});

// 'Presiono' el radiobutton para que esté activado por default

radioButton1.click();

radioButton2.addEventListener("change", function() {
    if (radioButton2.checked) {

        // Si se selecciona la opción de transferencia, habilitar los campos correspondientes

        accountNumber.disabled = false;
        amount.disabled = false;
        senderName.disabled = false;

        // Deshabilitar los campos de tarjeta
        
        cardNumber.disabled = true;
        cardName.disabled = true;
        cardMonth.disabled = true;
        cardYear.disabled = true;
        cvc.disabled = true;
    }
});

// Lógica de las validaciones 

