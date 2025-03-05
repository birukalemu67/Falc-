// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Generate Additional 20 Product Cards
const productListing = document.querySelector('.product-listing');
const additionalProducts = [
  { category: "electronics", name: "Apple Airpods(2nd gen)",  price: "$199.99", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836" },
  { category: "clothing",     name: "crocs kids",     price: "$39.99", image: "https://m.media-amazon.com/images/I/61Cev2aFG5L._AC_UY1000_.jpg" },
  { category: "accessories",  name: "Amazon Echo Dot(5th gen)",  price: "$49.99", image: "https://www.nfm.com/dw/image/v2/BDFM_PRD/on/demandware.static/-/Sites-nfm-master-catalog/default/dw7f623500/images/063/38/63384283-1.jpg?sw=1000&sh=1000&sm=fit" },
  { category: "electronics", name: "Augeny 4 PCS USB LED Car Interior Atmosphere Lamp, Plug-in USB Decor Night Light, Portable Auto Ambient Lighting Kit, Universal Vehicle Interior Accessories for Most Cars (Blue)",  price: "$149.99", image: "https://m.media-amazon.com/images/I/61+a3StrxlL._AC_SX466_PIbundle-4,TopRight,0,0_SH20_.jpg" },
  { category: "clothing",     name: "Gildan Men's Crew T-Shirts, Multipack, Style G1100",     price: "$59.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3SswKIW0SEPUiAoWq9WFMF9l1PKQSD9Rgw&s" },
  { category: "accessories",  name: "2PCS Car Seat Gap Filler - Car Seat Gap Filler Organizer for Holding Phone,Key,Purse - Universal Car Gap Filler Fits Car Truck SUV Car Interior Accessories (Black/2PCS)", price: "$19.99", image: "https://m.media-amazon.com/images/I/61PQLFTG79L._AC_SX466_.jpg" },
  { category: "electronics", name: "Samsung Galaxy Tab A9+ Tablet 11” 64GB Android Tablet, Big Screen, Quad Speakers, Upgraded Chipset, Multi Window Display, Slim, Light, Durable Design, US Version, 2024, Graphite", price: "$199.99", image: "https://m.media-amazon.com/images/I/61d46oYQgdL._AC_SX466_.jpg" },
  { category: "clothing",     name: "Dickies Men's Dri-Tech Original Moisture Control Crew Socks, Available in M-XXL (6, 12, 18 Pairs)",    price: "$79.99", image: "https://m.media-amazon.com/images/I/A1zTvk9g+pL._AC_SL1500_.jpg" },
  { category: "accessories",  name: "LISEN Retractable Car Charger [69W USB C Car Accessories Adapter ] for iPhone 16 USB C Charger Fast Charging, Travel Essentials Gifts for Women Men, Road Trip Essentials for iPhone 16e 16 15 14 13 12", price: "$24.99", image: "https://m.media-amazon.com/images/I/71R6ka8Os4L._AC_SX466_.jpg" },
  { category: "electronics", name: "Rotating Electric Toothbrush for Adults with 8 Brush Heads (2 Types), 4 Modes Deep Clean Electric Toothbrush with Rechargeable Power and 2 Min Smart Timer, Fast Charge (Black)", price: "$129.99", image: "https://www.gosupps.com/media/catalog/product/7/1/71gurlBWmYL_1.jpg" },
  { category: "clothing",     name: "Womens Oversized Vintage Acid Wash Cotton Fleece Hoodie for Women",    price: "$53.99", image: "https://m.media-amazon.com/images/I/61zUqH-GwFL._AC_SX569_.jpg" },
  { category: "accessories",  name: "Tire Inflator Portable Air Compressor", price: "$40.99", image: "https://m.media-amazon.com/images/I/61-hn2YnNPL._AC_SX679_PIbundle-7,TopRight,0,0_SH20_.jpg" },
  { category: "electronics", name: "Apple iPad (10th Generation)", price: "$279.99", image: "https://m.media-amazon.com/images/I/61uA2UVnYWL._AC_SX522_.jpg" },
  { category: "clothing",     name: "Lviefent Womens Lightweight Full Zip Running Track Jacket",    price: "$19.99", image: "https://m.media-amazon.com/images/I/517A3-FwBrL._AC_SX569_.jpg" },
  { category: "accessories",  name: "Upgraded 3-in-1 Car Phone Holder Mount [Powerful Suction] Phone Mount for Car Dashboard Air Vent Windshield,for All iPhone Android Phone (Black)", price: "$15.99",  image: "https://m.media-amazon.com/images/I/71O2w5u9ECL._AC_SX679_.jpg" },
  { category: "electronics", name: "LC-dolida Sleep Headphones, 3D Sleep Mask Bluetooth Wireless Music Eye Mask, Sleeping Headphones for Side Sleepers Sleep Mask with Bluetooth Headphones Ultra-Thin Stereo Speakers Perfect for Sleeping", price: "$159.99", image: "https://m.media-amazon.com/images/I/71GGksIzY-L._AC_SX679_.jpg" },
  { category: "clothing",     name: "Trendy Queen Womens Oversized Hoodies Fleece Sweatshirts Sweaters Spring Outfits 2025 Pullover Fall Winter Clothes",    price: "$25.99", image: "https://m.media-amazon.com/images/I/71wp-f9m0-L._AC_SY550_.jpg" },
  { category: "accessories",  name: "Logitech MeetUp 2 All-in-One USB Conference Room Camera, Compact Video Bar with Built-in AI Features, Works with Microsoft Teams, Zoom Rooms, Google Meet, and More", price: "$802.99", image: "https://m.media-amazon.com/images/I/61QSqwOCEpL._AC_SX466_.jpg" },
  { category: "electronics", name: "JBL Tune 510BT - Bluetooth headphones with up to 40 hours battery, microphone for call, foldable and comfortable, Android and iOs compatible (White)", price: "$219.99", image: "https://m.media-amazon.com/images/I/51EUjPMn6UL._AC_SX466_.jpg" },
  { category: "clothing",     name: "J.VER Men's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free Formal Shirt Business Casual Button Down Shirts",    price: "$99.99", image: "https://m.media-amazon.com/images/I/61owdlDd7wL._AC_SX466_.jpg" }
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

// Modal Functionality for Viewing Product Details
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalText.textContent = "This is a detailed description of the product.";
    modal.style.display = 'block';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
document.querySelectorAll('.add-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1000);
  });
});

// Smooth Page Transition: Adding a fade-in effect on page load
window.addEventListener('load', () => {
  document.body.classList.add('fade-in-page');
});