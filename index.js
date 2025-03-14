// Existing Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const productListing = document.querySelector('.product-listing');
const additionalProducts = [
  { category: "electronics", name: "Apple Airpods (2nd gen)",  price: "$199.99", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836" },
  { category: "clothing",     name: "Crocs Kids",     price: "$39.99", image: "https://m.media-amazon.com/images/I/61Cev2aFG5L._AC_UY1000_.jpg" },
  { category: "accessories",  name: "Amazon Echo Dot (5th gen)",  price: "$49.99", image: "https://www.nfm.com/dw/image/v2/BDFM_PRD/on/demandware.static/-/Sites-nfm-master-catalog/default/dw7f623500/images/063/38/63384283-1.jpg?sw=1000&sh=1000&sm=fit" },
  { category: "electronics", name: "USB LED Car Interior Lamp",  price: "$149.99", image: "https://m.media-amazon.com/images/I/61+a3StrxlL._AC_SX466_PIbundle-4,TopRight,0,0_SH20_.jpg" },
  { category: "clothing",     name: "Gildan Men's Crew T-Shirts",     price: "$59.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3SswKIW0SEPUiAoWq9WFMF9l1PKQSD9Rgw&s" },
  { category: "accessories",  name: "Car Seat Gap Filler", price: "$19.99", image: "https://m.media-amazon.com/images/I/61PQLFTG79L._AC_SX466_.jpg" },
  { category: "electronics", name: "Samsung Galaxy Tab A9+", price: "$199.99", image: "https://m.media-amazon.com/images/I/61d46oYQgdL._AC_SX466_.jpg" },
  { category: "clothing",     name: "Dickies Men's Crew Socks",    price: "$79.99", image: "https://m.media-amazon.com/images/I/A1zTvk9g+pL._AC_SL1500_.jpg" },
  { category: "accessories",  name: "LISEN Retractable Car Charger", price: "$24.99", image: "https://m.media-amazon.com/images/I/71R6ka8Os4L._AC_SX466_.jpg" },
  { category: "electronics", name: "Rotating Electric Toothbrush", price: "$129.99", image: "https://www.gosupps.com/media/catalog/product/7/1/71gurlBWmYL_1.jpg" },
  { category: "clothing",     name: "Women's Vintage Hoodie",    price: "$53.99", image: "https://m.media-amazon.com/images/I/61zUqH-GwFL._AC_SX569_.jpg" },
  { category: "accessories",  name: "Portable Tire Inflator", price: "$40.99", image: "https://m.media-amazon.com/images/I/61-hn2YnNPL._AC_SX679_PIbundle-7,TopRight,0,0_SH20_.jpg" },
  { category: "electronics", name: "Apple iPad (10th Generation)", price: "$279.99", image: "https://m.media-amazon.com/images/I/61uA2UVnYWL._AC_SX522_.jpg" },
  { category: "clothing",     name: "Lightweight Running Jacket",    price: "$19.99", image: "https://m.media-amazon.com/images/I/517A3-FwBrL._AC_SX569_.jpg" },
  { category: "accessories",  name: "3-in-1 Car Phone Holder", price: "$15.99",  image: "https://m.media-amazon.com/images/I/71O2w5u9ECL._AC_SX679_.jpg" },
  { category: "electronics", name: "Sleep Headphones with Mask", price: "$159.99", image: "https://m.media-amazon.com/images/I/71GGksIzY-L._AC_SX679_.jpg" },
  { category: "clothing",     name: "Oversized Fleece Sweatshirt",    price: "$25.99", image: "https://m.media-amazon.com/images/I/71wp-f9m0-L._AC_SY550_.jpg" },
  { category: "accessories",  name: "Logitech MeetUp 2 Conference Camera", price: "$802.99", image: "https://m.media-amazon.com/images/I/61QSqwOCEpL._AC_SX466_.jpg" },
  { category: "electronics", name: "JBL Tune 510BT Headphones", price: "$219.99", image: "https://m.media-amazon.com/images/I/51EUjPMn6UL._AC_SX466_.jpg" },
  { category: "clothing",     name: "Men's Dress Shirts",    price: "$99.99", image: "https://m.media-amazon.com/images/I/61owdlDd7wL._AC_SX466_.jpg" }
];

additionalProducts.forEach(product => {
  productListing.innerHTML += `
    <div class="product-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="view-btn">View Details</button>
      <button class="add-cart-btn">Add to Cart</button>
    </div>
  `;
});

// Category Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
let productCards = document.querySelectorAll('.product-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    productCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// AUTH0 CONFIGURATION
const auth0Config = {
  domain: "dev-w1dec3w1uj8hl5pr.us.auth0.com",
  client_id: "m3GMZ4bXVrZflYm5HCe5q7MDPXS66Kg6"
};

let auth0Client = null;

// Initialize Auth0 client
const initAuth0 = async () => {
  auth0Client = await createAuth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.client_id,
    cacheLocation: 'localstorage'
  });

  // Handle Auth callback after redirect
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  updateUI();
};

// Update UI for authentication status
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  document.getElementById("login").style.display = isAuthenticated ? "none" : "block";
  document.getElementById("logout").style.display = isAuthenticated ? "block" : "none";
};

// Event listener for Login
document.getElementById("login").addEventListener("click", async () => {
  await auth0Client.loginWithRedirect({ redirect_uri: window.location.href });
});

// Logout button event
document.getElementById("logout").addEventListener("click", () => {
  auth0Client.logout({ returnTo: window.location.href });
});

// Initialize everything on page load
window.addEventListener('load', () => {
  initAuth0();
});

// Existing cart logic (with added modal functionality)
// Cart data
let cart = [];
const cartCountElement = document.getElementById('cart-count');

// Add to cart functionality
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCartCount();
  alert(`${productName} added to cart.`);
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Cart Modal Functionality
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items-list');
const checkoutBtn = document.getElementById('checkout-btn');

// Show cart modal
cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'block';
  renderCartItems();
});

// Close cart modal
document.getElementById('close-cart').onclick = function() {
  cartModal.style.display = 'none';
};

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
};

// Render Cart Items
function renderCartItems() {
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}`;
      document.getElementById('cart-items-list').appendChild(li);
    });
  }
}

// Checkout button functionality
document.getElementById('checkout-btn').onclick = function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Checkout successful!');
    cart = [];
    updateCartCount();
    cartModal.style.display = 'none';
  }
};

// Attach event listeners to dynamically created buttons
function attachCartListeners() {
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('p').textContent;
      addToCart(productName, productPrice);
    });
  });
};

// Ensure event listeners are attached after product cards are created
window.addEventListener('load', () => {
  updateCartCount();
  attachCartEventListeners();
});

// Fix duplicate initialization and listeners
attachCartEventListeners();

function attachCartEventListeners() {
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('p').textContent;
      cart.push({ name: productName, price: productPrice });
      updateCartCount();
      alert(`${productName} added to cart.`);
    });
  });
}

// Initialize Cart and attach listeners once DOM is loaded
window.addEventListener('load', attachCartEventListeners);
