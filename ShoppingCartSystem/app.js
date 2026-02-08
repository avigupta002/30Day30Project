function myNav() {
  let bar = document.querySelector(".bar");
  let nav = document.querySelector(".navigation");
  bar.onclick = () => {
    if (nav.style.left == "0%") {
      nav.style.left = "-100%";
      bar.src = "assets/images/others/menu.png";
      document.body.style.overflow = "";
    } else {
      nav.style.left = "0%";
      bar.src = "assets/images/others/x.png";
      document.body.style.overflow = "hidden";
    }
  };
  document.onclick = (event) => {
    if (
      !nav.contains(event.target) &&
      !bar.contains(event.target) &&
      nav.style.left == "0%"
    ) {
      nav.style.left = "-100%";
      bar.src = "assets/images/others/menu.png";
      document.body.style.overflow = "";
    }
  };
}
myNav();

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
  }
});


/* ================= CART SYSTEM ================= */

let cart = [];

// ADD TO CART
window.addToCart = function (button) {
    const card = button.closest(".shop1");
    const name = card.querySelector("h2").innerText;
    const priceText = card.querySelector("article").innerText;
    const price = Number(priceText.replace(/[^0-9]/g, ""));
    const img = card.querySelector("img").src;

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }

    showToast(`${name} added to cart 🛒`, "success");
};

// OPEN CART
window.openCart = function (event) {
    event.preventDefault();
    renderCart();
    new bootstrap.Modal(document.getElementById("cartModal")).show();
};

// REMOVE ITEM
window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
    showToast("Item removed ❌", "danger");
};

// RENDER CART
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='text-center'>Cart is empty</p>";
    }

    cart.forEach((item, i) => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
        <div class="d-flex align-items-center mb-3 border-bottom pb-2">
            <img src="${item.img}" width="60" class="me-3 rounded" />
            <div class="flex-grow-1">
                <h6>${item.name}</h6>
                <small>₹${item.price} × ${item.qty}</small>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeItem(${i})">✕</button>
        </div>`;
    });

    cartTotal.innerText = total;
}

// TOAST
function showToast(message, type = "success") {
    const toastEl = document.getElementById("cartToast");
    const toastMsg = document.getElementById("toastMessage");

    toastMsg.innerText = message;

    toastEl.className = "toast align-items-center border-0";
    toastEl.classList.add(
        type === "success" ? "text-bg-success" : "text-bg-danger"
    );

    new bootstrap.Toast(toastEl, { delay: 2000 }).show();
}
