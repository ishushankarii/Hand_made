// ================= CART =================

let cart = JSON.parse(localStorage.getItem("aishuCart")) || [];

updateCartCount();


function addProductToCart(productName, price) {

    let existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "aishuCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(productName + " added to cart!");
}


// ================= CART COUNT =================

function updateCartCount() {

    let total = 0;

    cart.forEach(product => {
        total += product.quantity;
    });

    let count = document.getElementById("cart-count");

    if (count) {
        count.innerText = total;
    }
}


// ================= SEARCH & FILTER =================

function filterProducts() {

    let searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let category =
        document
        .getElementById("categoryFilter")
        .value;

    let price =
        document
        .getElementById("priceFilter")
        .value;


    let products =
        document.querySelectorAll(".product-card");


    let visibleProducts = 0;


    products.forEach(product => {

        let name =
            product.dataset.name.toLowerCase();

        let productCategory =
            product.dataset.category;

        let productPrice =
            Number(product.dataset.price);


        let searchMatch =
            name.includes(searchText);


        let categoryMatch =
            category === "all" ||
            productCategory === category;


        let priceMatch = true;


        if (price === "500") {

            priceMatch = productPrice < 500;

        }

        else if (price === "1000") {

            priceMatch =
                productPrice >= 500 &&
                productPrice <= 1000;

        }

        else if (price === "1500") {

            priceMatch = productPrice > 1000;

        }


        if (
            searchMatch &&
            categoryMatch &&
            priceMatch
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    let noProducts =
        document.getElementById("noProducts");


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}
