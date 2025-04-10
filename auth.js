// Replace with your own Auth0 values

const auth0Config = {

  domain: "dev-w1dec3w1uj8hl5pr.us.auth0.com",         // <-- Replace with your Auth0 domain

  clientId: "QbEE5GmUEHXU9ZaaUsONo3WbgLJJTye1"     // <-- Replace with your Auth0 client ID

};

 

let auth0Client = null;

 

/**

* Initialize the Auth0 client

*/

async function initAuth0() {

  auth0Client = await createAuth0Client({

    domain: auth0Config.domain,

    client_id: auth0Config.clientId,

    redirect_uri: window.location.origin + "/index.html", // Or your specific callback URL

    scope: "openid profile email" // <--- Include profile + email scopes

  });

 

  // If returning from Auth0 (the user just logged in), handle the redirect

  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {

    try {

      await auth0Client.handleRedirectCallback();

      // Remove query params from the URL

      window.history.replaceState({}, document.title, window.location.pathname);

    } catch (err) {

      console.error("Error handling redirect:", err);

    }

  }

 

  // Now update the UI

  updateUI();

}

 

/**

* Update the UI based on authentication state

*/

async function updateUI() {

  const isAuthenticated = await auth0Client.isAuthenticated();

 

  // Select elements

  const loginBtn = document.getElementById("login-btn");

  const logoutBtn = document.getElementById("logout-btn");

  const protectedContent = document.getElementById("protected-content");

  const protectedLinks = document.querySelectorAll(".protected-link");

  const usernameElem = document.getElementById("username"); // Select username element too

 

  if (isAuthenticated) {

      // Show protected links (safe, querySelectorAll returns empty list, not null)

      protectedLinks.forEach(link => {

          link.style.display = "inline-block";

      });

 

      // Show/hide buttons WITH CHECKS

      if (loginBtn) loginBtn.style.display = "none";         // Check if loginBtn exists

      if (logoutBtn) logoutBtn.style.display = "inline-block"; // Check if logoutBtn exists

 

      // Show protected content (already has a check)

      if (protectedContent) protectedContent.style.display = "block";

 

      // Get and display user info

      const user = await auth0Client.getUser();

      console.log("Auth0 user profile:", user);

      if (usernameElem) { // Check if usernameElem exists

          usernameElem.textContent = user.nickname || user.name || user.email || "User";

      }

 

  } else {

      // Hide protected links

      protectedLinks.forEach(link => {

          link.style.display = "none";

      });

 

      // Show/hide buttons WITH CHECKS

      if (loginBtn) loginBtn.style.display = "inline-block"; // Check if loginBtn exists

      if (logoutBtn) logoutBtn.style.display = "none";        // Check if logoutBtn exists

 

      // Hide protected content (already has a check)

      if (protectedContent) protectedContent.style.display = "none";

 

      // Clear username display

      if (usernameElem) { // Check if usernameElem exists

        usernameElem.textContent = "";

      }

  }

}
 

/**

* Initiate the login flow

*/

async function login() {

  await auth0Client.loginWithRedirect();

}

 

/**

* Log out

*/

function logout() {

  auth0Client.logout({

    returnTo: window.location.origin + "/index.html" // Or your specific post-logout URL

  });

}

 

// Set up event listeners and init Auth0

window.addEventListener("DOMContentLoaded", async () => {

  const loginButton = document.getElementById("login-btn");

  const logoutButton = document.getElementById("logout-btn");

 

  if (loginButton) {

    loginButton.addEventListener("click", login);

  }

  if (logoutButton) {

    logoutButton.addEventListener("click", logout);

  }

 

  // It's crucial to initialize Auth0 only after the DOM is ready

  await initAuth0();

});