fetch(PRODUCT_INFO_URL + JSON.parse(localStorage.getItem("ItemID")))
.then(response => {
    return response
})
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
});
