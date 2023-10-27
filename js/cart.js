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
    subtotalFinalPrice = 0;
    for(let i=0; i<(productQuantity); i++){
        if(productsInTheCart[currentUserCart].articles[i].currency == "UYU"){
            subtotalFinalPrice += parseInt(document.getElementById("subtotal" + i).innerHTML)/dolarPrice;
        } else {
            subtotalFinalPrice += parseInt(document.getElementById("subtotal" + i).innerHTML);
        }
    }
    finalSubtotal.innerHTML = (subtotalFinalPrice).toFixed(2);
}

// Calcula el precio de envío individualmente

function calculateSend(){
    sendFinalPrice = 0;
    sendFinalPrice = (subtotalFinalPrice/100)*sendTax;
    finalSend.innerHTML = (sendFinalPrice).toFixed(2);
}

// Calcula el precio final (la suma del subtotal + el envío)

function calculateTotal(){
    finalTotal.innerHTML = (sendFinalPrice + subtotalFinalPrice).toFixed(2);

    // Para la validación: revisa que se haya comprado al menos un producto

    if(finalTotal.innerHTML <= 0){
        let atLeastOneProduct = document.getElementById("atLeastOneProduct");
        atLeastOneProduct.classList.add("d-block");
        atLeastOneProduct.classList.remove("d-hide");
    } else {
        let atLeastOneProduct = document.getElementById("atLeastOneProduct");
        atLeastOneProduct.classList.add("d-hide");
        atLeastOneProduct.classList.remove("d-block");
    }
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
    let subtotalUSD = document.getElementById("subtotalUSD" + num);
    let productCurrency = document.getElementById("productCurrency" + num);
    if(newQuantity.value >= 0 && newQuantity.value <= 10000000000){
        subtotalPrice.innerHTML = newQuantity.value * priceTag.innerHTML;
    } else {
        subtotalPrice.innerHTML = 0;
        newQuantity.value = 0;
    }
    if(productCurrency.innerHTML == "UYU"){
        subtotalUSD.innerHTML = subtotalFinalPrice = (subtotalPrice.innerHTML/dolarPrice).toFixed(2);
    } else {
        subtotalUSD.innerHTML = subtotalPrice.innerHTML;
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
        <td class="align-middle"> <span id="productCurrency${num}">${product.currency}</span> <span id="subtotal${num}"> ${product.unitCost} </span></td>
        <td class="align-middle">USD <span id="subtotalUSD${num}"></span></td>
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
        senderName.disabled = true;
    }
});

// 'Presiono' el radiobutton para que esté activado por default

radioButton1.click();

radioButton2.addEventListener("change", function() {
    if (radioButton2.checked) {

        // Si se selecciona la opción de transferencia, habilitar los campos correspondientes

        accountNumber.disabled = false;
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

let purchaseBtn = document.getElementById("purchaseBtn");
let confirmationForm = document.getElementById("confirmationForm");
let modalBtn = document.getElementById("modalBtn");

// Devuelve true si el radio button1 está apretado (el del método de pago 1), sino devuelve false (que es interpretado como el método de pago 2)

function getPaymentMethodSelected(){
    return radioButton1.checked;
}

// Revisa que los inputs no estén vacíos

function checkMethodOneInputs(){
    const inputFields = [cardNumber, cardName, cardMonth, cardYear, cvc];
    for(let input of inputFields){
        if(input.value == ""){
            return false;
        }
    }
    return true;
}

function checkMethodTwoInputs(){
    const inputFields = [accountNumber, senderName];
    for(let input of inputFields){
        if(input.value == ""){
            return false;
        }
    }
    return true;
}

// Muestra el feedback de cada input del modal debajo del botón de toggle del modal

let modalFeedback = document.getElementById("modalFeedback");

function showModalFeedback(){
    modalFeedback.innerHTML = "";
    if(getPaymentMethodSelected()){
        modalBtn.classList.remove("is-invalid");
        if(!cardNumber.checkValidity() || cardNumber.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar su numero de tarjeta, y debe tener 16 números.`;
            modalBtn.classList.add("is-invalid");
        }
        if(!cardName.checkValidity() || cardName.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar el nombre del titular, solo puede contener letras.`;
            modalBtn.classList.add("is-invalid");
        }
        if(!cardMonth.checkValidity() || cardMonth.value == "" || !cardYear.checkValidity() || cardYear.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar la fecha de vencimiento de su tarjeta.`;
            modalBtn.classList.add("is-invalid");
        }
        if(!cvc.checkValidity() || cvc.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar su CVC.`;
            modalBtn.classList.add("is-invalid");
        }
    } else {
        modalBtn.classList.remove("is-invalid");
        if(!accountNumber.checkValidity() || accountNumber.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar el número de cuenta.`;
            modalBtn.classList.add("is-invalid");
        }
        if(!senderName.checkValidity() || senderName.value == ""){
            modalFeedback.innerHTML+=`Debe ingresar su nombre, solo puede contener letras.`;
            modalBtn.classList.add("is-invalid");
        }
    }
}

// Revisa que las condiciones de cada input se cumplan, para cambiar la estética del botón de toggle del modal

function checkModalPaymentMethodOne(){
    if(cardNumber.checkValidity() && cardName.checkValidity() && cardMonth.checkValidity() && cardYear.checkValidity() && cvc.checkValidity() && checkMethodOneInputs()){
        modalBtn.classList.add("btn-outline-primary");
        modalBtn.classList.remove("btn-danger");
        modalFeedback.innerHTML = "";
        return true;
    } else {
        modalBtn.classList.add("btn-danger");
        modalBtn.classList.remove("btn-outline-primary");
        showModalFeedback();
        return false;
    }
}

function checkModalPaymentMethodTwo(){
    if(accountNumber.checkValidity() && senderName.checkValidity() && checkMethodTwoInputs()){
        modalBtn.classList.add("btn-outline-primary");
        modalBtn.classList.remove("btn-danger");
        modalFeedback.innerHTML = "";
        return true;
    } else {
        modalBtn.classList.add("btn-danger");
        modalBtn.classList.remove("btn-outline-primary");
        showModalFeedback();
        return false;
    } 
}

// Ve qué método de pago se seleccionó y revisa si se cumplen las condiciones de los input

function checkModalValidities(){
    if(getPaymentMethodSelected()){
        return checkModalPaymentMethodOne();
    } else {
        return checkModalPaymentMethodTwo();
    }
}

// Revisa los inputs fuera del modal, si todos cumplen con sus condiciones, retorna true

function checkOutOfModalValidities(){
    let nom_LastName = document.getElementById("nom_LastName");
    let department = document.getElementById("department");
    let location = document.getElementById("location");
    let address = document.getElementById("address");
    let streetNumber = document.getElementById("streetNumber");
    let phoneNumber = document.getElementById("phoneNumber");
    let officeRadio = document.getElementById("officeRadio");

    let outOfTheModalInputs = [nom_LastName, department, location, address, streetNumber, phoneNumber, officeRadio];

    for(let input of outOfTheModalInputs){
        if(!input.checkValidity() || input.value == ""){
            return false;
        }
    }
    return true;
}

// Hace que los botones muestren feedback en tiempo real gracias a la clase 'was-validated' y las funciones previas
// Si se cumplen las condiciones de compras muestra una alerta, en caso contrario impide el envío del formulario

purchaseBtn.addEventListener("click", function(){
    const inputFields = [cardNumber, cardName, cardMonth, cardYear, cvc, accountNumber, senderName];

    confirmationForm.classList.add("was-validated");

    checkModalValidities();

    radioButton1.addEventListener("click", function(){
        checkModalValidities();
    });

    radioButton2.addEventListener("click", function(){
        checkModalValidities();
    });

    inputFields.forEach(function(inputField) {
        inputField.addEventListener("input", function(){
            checkModalValidities();
        });
    });

    if(checkModalValidities() && checkOutOfModalValidities() && finalTotal.innerHTML > 0){

        // Agrega el cartel de compra satisfactoria

        let body = document.getElementsByTagName("body")[0];
        body.innerHTML += `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Compra realizada con éxito</strong>
        </div>
        `;
        event.preventDefault();

        // Muestra que todos los inputs se llenaron de manera satisfactoria al enviar el formulario y que todos los datos sean correctos

        let outOfTheModalInputs = [nom_LastName, department, location, address, streetNumber, phoneNumber, officeRadio];
        for(let input of outOfTheModalInputs){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
        }

        // Reinicia la ventana después de 2 segundos

        setTimeout(function(){
        window.location.replace('cart.html');
        }, 2000);
    } else {
        event.preventDefault();
        event.stopPropagation();
    }
});