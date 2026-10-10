// ================= CART COUNT =================

let cart =
    JSON.parse(
        localStorage.getItem("aishuCart")
    ) || [];


updateCartCount();


function updateCartCount() {

    let total = 0;

    cart.forEach(function(product) {

        total += product.quantity;

    });

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.innerText = total;

    }

}


// ================= CATEGORY =================

function openCategory(category) {

    /*
        Store selected category temporarily
        so the Products page can use it.
    */

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href =
        "products.html";

}
