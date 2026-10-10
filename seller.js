
const sellerForm = document.getElementById("sellerForm");
const productList = document.getElementById("productList");

let products = [];

// Add Product
sellerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sellerName =
        document.getElementById("sellerName").value.trim();

    const productName =
        document.getElementById("productName").value.trim();

    const category =
        document.getElementById("category").value;

    const price =
        Number(document.getElementById("price").value);

    const stock =
        Number(document.getElementById("stock").value);

    const description =
        document.getElementById("description").value.trim();

    // Validation
    if (
        !sellerName ||
        !productName ||
        !category ||
        !description ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        alert("Please enter valid product details!");
        return;
    }

    // Create Product Object
    const product = {
        id: Date.now(),
        sellerName: sellerName,
        productName: productName,
        category: category,
        price: price,
        stock: stock,
        description: description
    };

    products.push(product);

    displayProducts();

    sellerForm.reset();

    alert("Product added successfully!");
});

// Display Products
function displayProducts() {
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.textContent = "No products added yet.";
        return;
    }

    products.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "product";

        const title = document.createElement("h3");
        title.textContent = product.productName;

        const seller = document.createElement("p");
        seller.textContent = "Seller: " + product.sellerName;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + product.price;

        const stock = document.createElement("p");
        stock.textContent = "Available Stock: " + product.stock;

        const description = document.createElement("p");
        description.textContent =
            "Description: " + product.description;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete Product";

        deleteButton.addEventListener("click", function () {
            deleteProduct(product.id);
        });

        card.append(
            title,
            seller,
            category,
            price,
            stock,
            description,
            deleteButton
        );

        productList.appendChild(card);
    });
}

// Delete Product
function deleteProduct(productId) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
        return;
    }

    products = products.filter(function (product) {
        return product.id !== productId;
    });

    displayProducts();

    alert("Product deleted successfully!");
}
