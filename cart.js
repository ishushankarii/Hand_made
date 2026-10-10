// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("aishuCart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");


// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

        updateCartCount();
        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";


    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="product-image">
                🧶
            </div>

            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="product-price">
                    ₹${item.price}
                </p>
            </div>

            <div class="quantity-box">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span class="quantity">
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <div>
                <strong>
                    ₹${item.price * item.quantity}
                </strong>
            </div>

            <button 
                class="remove-btn"
                onclick="removeItem(${index})">
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });

    calculateTotal();
    updateCartCount();
}


// Increase Quantity

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}


// Decrease Quantity

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove Item

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Save Cart

function saveCart() {

    localStorage.setItem(
        "aishuCart",
        JSON.stringify(cart)
    );

    displayCart();

}


// Calculate Total

function calculateTotal() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });


    let delivery = subtotal > 0 ? 50 : 0;

    let discount = subtotal >= 1000 ? 100 : 0;

    let total = subtotal + delivery - discount;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal;

    document.getElementById("delivery").textContent =
        "₹" + delivery;

    document.getElementById("discount").textContent =
        "₹" + discount;

    document.getElementById("total").textContent =
        "₹" + total;

}


// Cart Count

function updateCartCount() {

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    document.getElementById("cartCount").textContent = count;

}


// Checkout

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "checkout.html";

}


// Load Cart

displayCart();
