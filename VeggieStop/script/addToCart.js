document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".cart-button");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const productContainer = this.closest(".veggie-container");
            const name = productContainer.querySelector(".veggie-info").innerText.split("\n")[0];
            const priceText = productContainer.querySelector(".veggie-info").innerText.split("\n")[1];
            const price = parseFloat(priceText.replace("Ksh ", "").replace("/kg", "").replace("/bunch", "").replace("/pumpkin", "").replace("/cauliflower", ""));
            const image = productContainer.querySelector(".veggie-edit").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;  // Increase quantity if item already exists
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
            alert(`${name} added to cart!`); // Confirmation alert
        });
    });
});
