// Existing Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Existing product-listing & cart functionality goes here...
// Ensure you've defined productListing properly.

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
