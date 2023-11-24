// URL DE LAS CATEGORÍAS

const CATEGORIES_URL = "http://localhost:3000/cats";
const PRODUCTS_URL = "http://localhost:3000/cats/products/";

// URL's de los productos

const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products/comments/";

// URL's del carrito JSON

const CART_INFO_URL = "http://localhost:3000/cart/getjson/";
const CART_BUY_URL = "http://localhost:3000/cart/success";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell";

// URL's del carrito comprado

const LAST_PURCHASE_URL = "http://localhost:3000/cart/purchases/lastpurchase/"
const ADD_PURCHASE_URL = "http://localhost:3000/cart/purchases/addpurchase/";
const PURCHASES_URL = "http://localhost:3000/cart/purchases/";
const ADD_DETAILS_URL = "http://localhost:3000/cart/details/adddetails/";
const DETAILS_URL = "http://localhost:3000/cart/details/";

// URL del TOKEN y del type

const KEY_URL = "http://localhost:3000/login";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Función para obtener un token

async function getToken(user, pass){
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
      "user": user,
      "pass": pass
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch(KEY_URL, requestOptions)
  .then(response => response.json())
  .then(result => {
    localStorage.setItem("TOKEN", JSON.stringify(result));
  })
  .catch(error => console.log('error', error));
}

// Variable para hacer fetch GET con una key

let requestOptions = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "access-token": JSON.parse(localStorage.getItem("TOKEN")).token,
  },
};
