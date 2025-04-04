let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

// Toggle cart display
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

// Render products to HTML
const addDataToHTML = () => {
  if (products.length > 0) {
    products.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.dataset.id = product.id;
      newProduct.classList.add('item');
      newProduct.innerHTML = `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};

// Add item to cart
listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('addCart')) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});

const addToCart = (product_id) => {
  let index = cart.findIndex(item => item.product_id == product_id);
  if (index < 0) {
    cart.push({ product_id, quantity: 1 });
  } else {
    cart[index].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Render cart items
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  let totalPrice = 0;

  if (cart.length > 0) {
    cart.forEach(item => {
      const product = products.find(p => p.id == item.product_id);
      if (!product) return;

      totalQuantity += item.quantity;
      totalPrice += product.price * item.quantity;

      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.dataset.id = item.product_id;
      newItem.innerHTML = `
        <div class="image">
          <img src="${product.image}">
        </div>
        <div class="name">${product.name}</div>
        <div class="totalPrice">$${(product.price * item.quantity).toFixed(2)}</div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${item.quantity}</span>
          <span class="plus">></span>
        </div>`;
      listCartHTML.appendChild(newItem);
    });
  }

  iconCartSpan.innerText = totalQuantity;
  const totalPriceEl = document.getElementById('totalPrice');
  if (totalPriceEl) {
    totalPriceEl.innerText = totalPrice.toFixed(2);
  }
};

// Handle cart quantity changes
listCartHTML.addEventListener('click', (event) => {
  let btn = event.target;
  if (btn.classList.contains('minus') || btn.classList.contains('plus')) {
    let product_id = btn.closest('.item').dataset.id;
    let type = btn.classList.contains('plus') ? 'plus' : 'minus';
    changeQuantityCart(product_id, type);
  }
});

const changeQuantityCart = (product_id, type) => {
  let index = cart.findIndex(item => item.product_id == product_id);
  if (index >= 0) {
    if (type === 'plus') {
      cart[index].quantity += 1;
    } else {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
    addCartToHTML();
    addCartToMemory();
  }
};

// Handle checkout click with Auth0 protection
document.querySelectorAll('.checkOut').forEach(button => {
  button.addEventListener('click', async () => {
    if (typeof requireLogin === 'function') {
      const isLoggedIn = await requireLogin();
      if (isLoggedIn) {
        window.location.href = 'checkout.html';
      }
    } else {
      alert('Authentication not ready yet. Please try again in a moment.');
    }
  });
});

// Initialize the app
const initApp = () => {
  fetch('./products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      addDataToHTML();
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    });
};

initApp();
