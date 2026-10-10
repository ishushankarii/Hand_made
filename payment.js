// Get order details
const customer =
    JSON.parse(
        localStorage.getItem("customerDetails")
    ) || {};

const total =
    Number(
        localStorage.getItem("orderTotal")
    ) || 0;


// Display customer information

document.getElementById("customerName")
    .textContent =
    `${customer.firstName || ""} ${customer.lastName || ""}`;


document.getElementById("customerAddress")
    .textContent =
    `${customer.address || ""}, ${customer.city || ""}, ${customer.state || ""} - ${customer.pincode || ""}`;


document.getElementById("customerPhone")
    .textContent =
    `📞 ${customer.phone || "Not available"}`;


// Calculate summary

let cart =
    JSON.parse(
        localStorage.getItem("aishuCart")
    ) || [];

let subtotal = 0;

cart.forEach(item => {

    subtotal +=
        item.price * item.quantity;

});


let delivery = cart.length > 0 ? 50 : 0;

let discount =
    subtotal >= 1000 ? 100 : 0;

let finalTotal =
    subtotal + delivery - discount;


// Display summary

document.getElementById("subtotal")
    .textContent =
    "₹" + subtotal;

document.getElementById("discount")
    .textContent =
    "₹" + discount;

document.getElementById("total")
    .textContent =
    "₹" + finalTotal;


// Payment method selection

const paymentMethods =
    document.querySelectorAll(
        'input[name="paymentMethod"]'
    );

const upiDetails =
    document.getElementById("upiDetails");

const cardDetails =
    document.getElementById("cardDetails");

const codDetails =
    document.getElementById("codDetails");

const payBtn =
    document.getElementById("payBtn");


paymentMethods.forEach(method => {

    method.addEventListener("change", function() {

        upiDetails.style.display = "none";
        cardDetails.style.display = "none";
        codDetails.style.display = "none";


        if (this.value === "UPI") {

            upiDetails.style.display = "block";

            payBtn.textContent =
                "Pay ₹" + finalTotal;

        }


        else if (this.value === "Card") {

            cardDetails.style.display = "block";

            payBtn.textContent =
                "Pay ₹" + finalTotal;

        }


        else if (
            this.value === "Cash on Delivery"
        ) {

            codDetails.style.display = "block";

            payBtn.textContent =
                "Place Order";

        }

    });

});


// Make Payment

function makePayment() {

    const selectedMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        ).value;


    // UPI validation

    if (selectedMethod === "UPI") {

        const upi =
            document.getElementById("upiId").value.trim();


        if (upi === "") {

            alert("Please enter your UPI ID.");

            return;

        }

        if (!upi.includes("@")) {

            alert("Please enter a valid UPI ID.");

            return;

        }

    }


    // Card validation

    if (selectedMethod === "Card") {

        const name =
            document.getElementById("cardName").value.trim();

        const number =
            document.getElementById("cardNumber").value.trim();

        const expiry =
            document.getElementById("expiry").value.trim();

        const cvv =
            document.getElementById("cvv").value.trim();


        if (
            name === "" ||
            number === "" ||
            expiry === "" ||
            cvv === ""
        ) {

            alert(
                "Please fill all card details."
            );

            return;

        }


        if (number.length !== 16) {

            alert(
                "Card number must contain 16 digits."
            );

            return;

        }


        if (cvv.length !== 3) {

            alert(
                "CVV must contain 3 digits."
            );

            return;

        }

    }


    // Create order

    const order = {

        orderId:
            "AM" + Date.now(),

        customer:
            customer,

        items:
            cart,

        subtotal:
            subtotal,

        delivery:
            delivery,

        discount:
            discount,

        total:
            finalTotal,

        paymentMethod:
            selectedMethod,

        orderDate:
            new Date().toLocaleString(),

        status:
            "Order Placed"

    };


    // Get previous orders

    let orders =
        JSON.parse(
            localStorage.getItem("aishuOrders")
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "aishuOrders",
        JSON.stringify(orders)
    );


    // Clear cart

    localStorage.removeItem("aishuCart");


    // Save latest order

    localStorage.setItem(
        "latestOrder",
        JSON.stringify(order)
    );


    // Success

    alert(
        "🎉 Order placed successfully!"
    );


    // Go to order history

    window.location.href =
        "order-history.html";

}
