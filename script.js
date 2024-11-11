var body = document.querySelector("body")
var checkoutModal = document.getElementById('checkout-modal')
var container = document.getElementById('container')

// Each items picture by id
var waf = document.getElementById("waffles")
var bru = document.getElementById("brulee")
var mac = document.getElementById("macaron")
var tir = document.getElementById("tiramisu")
var bak = document.getElementById("baklava")
var mer = document.getElementById("meringue")
var cak = document.getElementById("cake")
var bro = document.getElementById("brownie")
var cot = document.getElementById("cotta")
var cart = document.getElementById("cart")
var fine = document.getElementById("fine")
var header = document.getElementById("header")
var totalItems = document.getElementById("items-in-cart")
var cartPriceTotalSpan = document.getElementById("cart-price-total")
var cartTotal = 0
var toggleCart = document.getElementById("items-in-cart")







var cartImg = "url(../pics/illustration-empty-cart.svg)"
cart.style.backgroundImage = cartImg


// all the buttons
var addToCartButtons = document.getElementsByClassName("buttons")
for (let i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  button.addEventListener("click", addToCartClicked)

}


function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName("item-des")[0].innerText
  var price = shopItem.getElementsByClassName("item-price")[0].innerText.substring(1)
   
  

  fine.style.display = "none"
  cart.style.backgroundImage = ""


  addItemToCart(title, price)
  
}



function addItemToCart(title, price) {
  total = price
  var qtySpan = 1
  var addCartRow = document.createElement("div")
  addCartRow.className = "cartRow"
  var cartItems = document.getElementsByClassName("cart-item")
  var orange = document.getElementsByClassName("orange")
  var font = document.getElementsByClassName("total-font")
  var totalQtySpan = document.getElementById("items-in-cart").innerText
  totalItems.innerText = parseInt(totalItems.innerText) + 1


  cartTotal = parseFloat(cartTotal) + parseFloat(price)
  cartPriceTotalSpan.innerText = cartTotal.toFixed(2)
  

  //make 2 different titles, one for display and one for id usage 

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].children[0].innerText == title) {
      var cartQty = document.getElementById(title + "Qty")
      var cartPrice = document.getElementById(title + "Price")
      var qty = parseFloat(cartQty.innerText)
      var prices = parseFloat(cartPrice.innerText)
      var itemTotalSpan = document.getElementById(title + "Total")
      

  
      qtySpan = qty++

      total = qty * prices

      total = total.toFixed(2)

      totalQtySpan = totalQtySpan++

      itemTotalSpan.innerText = total

      cartQty.innerText = qty

      return



    }

  }
  document.getElementById("cart-items").append(addCartRow)      // vvvvv---   creates new id for row   
  var cartRowContents = `<div id="${title}Row" class="cart-item">
                <p class="cart-title">${title}</p> 
                <p class="cart-price"> <span class="orange" id="${title}Qty">${qtySpan}</span><span class="orange">x</span> @  $<span id="${title}Price">${price}</span> <span class="total-font">$</span><span class="total-font" id="${title}Total">${total}</span><button id="${title}Remove" class="remove">&#9938</button></p>
            </div>`     
  addCartRow.innerHTML = cartRowContents
 document.getElementById(title + "Remove").addEventListener("click", removeFromCartClicked)
}



// remove item button functions


  var removeItemFromCartButtons = document.getElementsByClassName("remove")
  for (let i = 0; i < removeItemFromCartButtons.length; i++) {
  var removeButton = removeItemFromCartButtons[i]
  removeButton.addEventListener("click", removeItemFromCartClicked)
  }

  function removeFromCartClicked (event) {
    var removeButton = event.target
    var cartRow = removeButton.parentElement.parentElement

      let title = cartRow.querySelector(".cart-title").innerText;

  // Use attribute selectors to handle IDs with spaces
  let priceElement = cartRow.querySelector(`.cart-price span[id="${title}Total"]`);
  let qtyElement = cartRow.querySelector(`.cart-price span[id="${title}Qty"]`);

  if (priceElement && qtyElement) {
    let price = parseFloat(priceElement.innerText); // Get the total price
    let qty = parseInt(qtyElement.innerText); // Get the quantity

    // Update the cart totals
    cartRow.remove();
    totalItems.innerText = parseInt(totalItems.innerText) - qty;
    cartTotal -= price;
    cartPriceTotalSpan.innerText = cartTotal.toFixed(2);
  
  }

  
  if (toggleCart.innerText === "0") {
        fine.style.display = "block"
        cart.style.backgroundImage = "url(../pics/illustration-empty-cart.svg)"
  }
}


var confrimOrderButton = document.getElementById("checkout")


confrimOrderButton.addEventListener("click", function(){
  if (toggleCart.innerText >= "1") {
    container.classList.add('dark-bg')
    checkoutModal.classList.remove('display-none')
    document.getElementById('checkout-receipt').innerHTML = document.getElementById('cart-items').innerHTML 
    document.getElementById('checkout-total').innerHTML =  document.getElementById('cart-price-total').innerHTML

    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
      button.style.display = 'none';
    });
    

  } else {
    alert("Your cart is empty")
  }
})




var startNewOrderButton = document.getElementById('close-modal')

startNewOrderButton.addEventListener("click", function(){
  // refreshes the page
  window.location.reload();

  // reset page without refreashing page   vvvv----

  // totalItems.innerText = "0"
  // document.getElementById('cart-items').innerHTML = ""
  // document.getElementById('cart-price-total').innerHTML = '0'
  // container.classList.remove('dark-bg')
  // checkoutModal.classList.add('display-none')
  // fine.style.display = "block"
  // cart.style.backgroundImage = "url(../pics/illustration-empty-cart.svg)"
})





