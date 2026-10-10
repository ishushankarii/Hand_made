// Get orders from localStorage

let orders =
    JSON.parse(
        localStorage.getItem("aishuOrders")
    ) || [];


const ordersContainer =
    document.getElementById("ordersContainer");

const emptyOrders =
    document.getElementById("emptyOrders");


// Display Orders

function displayOrders() {

    ordersContainer.innerHTML = "";


    // No orders

    if (orders.length === 0) {

        emptyOrders.style.display = "block";

        return;
    }


    emptyOrders.style.display = "none";


    // Show latest order first

    const reversedOrders =
        [...orders].reverse();


    reversedOrders.forEach(order => {

        const orderCard =
            document.createElement("div");

        orderCard.className =
            "order-card";


        // Products HTML

        let productsHTML = "";


        order.items.forEach(item => {

            productsHTML += `

                <div class="order-product">

                    <div class="product-icon">
                        🧶
                    </div>

                    <div class="product-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ₹${item.price}
                            ×
                            ${item.quantity}
                        </p>

                    </div>

                    <div class="product-price">

                        ₹${item.price * item.quantity}

                    </div>

                </div>

            `;

        });


        // Order Card

        orderCard.innerHTML = `

            <div class="order-top">

                <div class="order-id">

                    <h3>
                        Order #${order.orderId}
                    </h3>

                    <p>
                        ${order.orderDate}
                    </p>

                </div>


                <div class="order-status">

                    ✓ ${order.status}

                </div>

            </div>


            <div class="order-products">

                ${productsHTML}

            </div>


            <div class="order-bottom">

                <div class="payment-info">

                    Payment:
                    <strong>
                        ${order.paymentMethod}
                    </strong>

                </div>


                <div class="order-total">

                    <p>
                        Order Total
                    </p>

                    <h2>
                        ₹${order.total}
                    </h2>

                </div>

            </div>

        `;


        ordersContainer.appendChild(orderCard);

    });

}


// Load Orders

displayOrders();
