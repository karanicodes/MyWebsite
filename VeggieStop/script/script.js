document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear before re-rendering
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td class="cart-item">
                <div class="cart-item-container">
                    <img src="${item.image}" class="cart-item-image">
                    <p class="cart-item-name">${item.name}</p>
                </div>
            </td>
            <td>Ksh ${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="qty-input"></td>
            <td>Ksh ${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;

            cartItemsContainer.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    }

    // Update quantity
    document.addEventListener("change", function (event) {
        if (event.target.classList.contains("qty-input")) {
            let index = event.target.getAttribute("data-index");
            cart[index].quantity = parseInt(event.target.value);
            renderCart(); // Re-render cart
        }
    });

    // Remove item
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1); // Remove item
            renderCart();
        }
    });

    document.getElementById("checkoutButton").addEventListener("click", function () {
        alert("Thank you for shopping with us! Redirecting to home...");
        localStorage.removeItem("cart"); // Clear cart after checkout
        window.location.href = "landingpage.html"; // Redirect to home page
    });

    renderCart(); // Load cart on page load
});
    

