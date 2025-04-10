document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }
  

  const listProductHTML = document.querySelector('.listProduct');
  const listCartHTML = document.querySelector('.listCart');
  const iconCart = document.querySelector('.icon-cart');
  const iconCartSpan = document.querySelector('.icon-cart span');
  const body = document.querySelector('body');
  const closeCartBtn = document.querySelector('.close');
  const totalPriceEl = document.getElementById('totalPrice');
  const checkoutBtn = document.querySelector('.checkOut');
  


  let products = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Toggle cart visibility
  const toggleCart = () => body.classList.toggle('showCart');
  iconCart.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);

  // Fetch products from JSON file
  const loadProducts = async () => {
    const res = await fetch('./products.json');
    products = await res.json();
    renderProducts();
    renderCart();
  };

  // Render product list to HTML
  const renderProducts = () => {
    products.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'item';
      productEl.dataset.id = product.id;
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">Add To Cart</button>
      `;
      listProductHTML.appendChild(productEl);
    });
  };

  // Add product to cart
  const addToCart = (productId) => {
    const item = cart.find(p => p.product_id == productId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ product_id: productId, quantity: 1 });
    }
    updateCart();
  };

  // Update local storage and render cart
  const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  // Render cart to HTML
  const renderCart = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      const product = products.find(p => p.id == item.product_id);
      if (!product) return;

      totalQuantity += item.quantity;
      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'item';
      cartItem.dataset.id = item.product_id;
      cartItem.innerHTML = `
        <div class="image"><img src="${product.image}"></div>
        <div class="name">${product.name}</div>
        <div class="totalPrice">$${itemTotal.toFixed(2)}</div>
        <div class="quantity">
          <span class="minus">-</span>
          <span>${item.quantity}</span>
          <span class="plus">+</span>
        </div>
      `;
      listCartHTML.appendChild(cartItem);
    });

    iconCartSpan.innerText = totalQuantity;
    totalPriceEl.innerText = totalPrice.toFixed(2);
  };

  // Handle clicks on product list (for adding to cart)
  listProductHTML.addEventListener('click', (e) => {
    if (e.target.classList.contains('addCart')) {
      const productId = e.target.closest('.item').dataset.id;
      addToCart(productId);
    }
  });

  // Adjust cart quantities
  listCartHTML.addEventListener('click', (e) => {
    const btn = e.target;
    const productId = btn.closest('.item')?.dataset.id;

    if (!productId) return;

    const item = cart.find(p => p.product_id == productId);
    if (!item) return;

    if (btn.classList.contains('plus')) {
      item.quantity += 1;
    } else if (btn.classList.contains('minus')) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.product_id != productId);
      }
    }

    updateCart();
  });

  // Checkout functionality
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'Checkout.html';
  });

  loadProducts();
});
