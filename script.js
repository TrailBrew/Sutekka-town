// Load cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart(cart);
  alert(`${name} added to cart!`);
}

// Render cart items in cart.html
function displayCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "product";
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
    `;
    cartItems.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Clear cart (on checkout)
function clearCart() {
  localStorage.removeItem("cart");
}

// Automatically load cart display if on cart page
window.onload = function () {
  displayCart();
};
