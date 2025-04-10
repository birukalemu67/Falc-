// Replace with your own Auth0 values
const auth0Config = {
  domain: "dev-w1dec3w1uj8hl5pr.us.auth0.com",
  clientId: "QbEE5GmUEHXU9ZaaUsONo3WbgLJJTye1"
};

let auth0Client = null;

/**
 * Initialize the Auth0 client
 */
async function initAuth0() {
  auth0Client = await createAuth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.clientId,
    redirect_uri: window.location.origin + "/index.html",
    scope: "openid profile email"
  });

  // Handle Auth0 redirect callback after login
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    try {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      console.error("Error handling redirect:", err);
    }
  }

  updateUI();
}

/**
 * Update the UI based on authentication state
 */
async function updateUI() {
  const isAuthenticated = await auth0Client.isAuthenticated();

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const protectedContent = document.getElementById("protected-content");
  const protectedLinks = document.querySelectorAll(".protected-link");
  const usernameElem = document.getElementById("username");

  if (isAuthenticated) {
    protectedLinks.forEach(link => {
      link.style.display = "inline-block";
    });

    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (protectedContent) protectedContent.style.display = "block";

    const user = await auth0Client.getUser();
    console.log("Auth0 user profile:", user);

    if (usernameElem) {
      usernameElem.textContent = user.nickname || user.name || user.email || "User";
    }
  } else {
    protectedLinks.forEach(link => {
      link.style.display = "none";
    });

    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (protectedContent) protectedContent.style.display = "none";

    if (usernameElem) {
      usernameElem.textContent = "";
    }
  }
}

/**
 * Start login flow
 */
async function login() {
  await auth0Client.loginWithRedirect();
}

/**
 * Log out
 */
function logout() {
  auth0Client.logout({
    returnTo: window.location.origin + "/index.html"
  });
}

// Set up event listeners and initialize Auth0
window.addEventListener("DOMContentLoaded", async () => {
  const loginButton = document.getElementById("loginBtn");
  const logoutButton = document.getElementById("logoutBtn");

  if (loginButton) {
    loginButton.addEventListener("click", login);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  await initAuth0();
});
