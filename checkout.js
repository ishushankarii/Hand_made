// Get cart
let cart = JSON.parse(localStorage.getItem("aishuCart")) || [];

const checkoutItems =
    document.getElementById("checkoutItems");


// If cart is empty
if (cart.length === 0) {

    checkoutItems.innerHTML = `
        <p style="text-align:center; color:#80675a;">
            Your cart is empty.
        </p>
    `;

}


// Display products
function displayCheckoutItems() {

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        const itemElement =
            document.createElement("div");

        itemElement.className = "checkout-item";

        itemElement.innerHTML = `

            <div class="item-icon">
                🧶
            </div>

            <div class="item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <div class="item-total">
                ₹${item.price * item.quantity}
            </div>

        `;

        checkoutItems.appendChild(itemElement);

    });

    calculateTotal();
}


// Calculate order total
function calculateTotal() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    let delivery =
        subtotal > 0 ? 50 : 0;


    let discount =
        subtotal >= 1000 ? 100 : 0;


    let total =
        subtotal + delivery - discount;


    document.getElementById("subtotal")
        .textContent = "₹" + subtotal;


    document.getElementById("delivery")
        .textContent = "₹" + delivery;


    document.getElementById("discount")
        .textContent = "₹" + discount;


    document.getElementById("total")
        .textContent = "₹" + total;

}


// Form Submit
document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty!");

            window.location.href =
                "products.html";

            return;

        }


        // Store customer information
        const customer = {

            firstName:
                document.getElementById("firstName").value,

            lastName:
                document.getElementById("lastName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            state:
                document.getElementById("state").value,

            pincode:
                document.getElementById("pincode").value,

            country:
                document.getElementById("country").value

        };


        // Save customer details
        localStorage.setItem(
            "customerDetails",
            JSON.stringify(customer)
        );


        // Save total
        let subtotal = 0;

        cart.forEach(item => {

            subtotal +=
                item.price * item.quantity;

        });


        let delivery = 50;

        let discount =
            subtotal >= 1000 ? 100 : 0;

        let total =
            subtotal + delivery - discount;


        localStorage.setItem(
            "orderTotal",
            total
        );


        // Go to payment
        window.location.href =
            "payment.html";

    });


// Load
displayCheckoutItems();
