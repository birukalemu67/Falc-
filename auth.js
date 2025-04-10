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

 

  // Select protected nav items dynamically inside function

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  

  const protectedContent = document.getElementById("protected-content");

  const protectedLinks = document.querySelectorAll(".protected-link");

 

  if (isAuthenticated) {

      // Show protected links

      protectedLinks.forEach(link => {

          link.style.display = "inline-block"; // Or 'block' depending on your layout

      });

 

      // Show Logout button, hide Login button

      loginBtn.style.display = "none";

      logoutBtn.style.display = "inline-block";

 

      // Show protected content

      if (protectedContent) protectedContent.style.display = "block";

 

      // Get user's profile

      const user = await auth0Client.getUser();

      console.log("Auth0 user profile:", user);

 

      // Display user's name

      const usernameElem = document.getElementById("username");

      if (usernameElem) {

          // Use nickname, name, or email as available, fallback to "User"

          usernameElem.textContent = user.nickname || user.name || user.email || "User";

      }

  } else {

      // Hide protected links

      protectedLinks.forEach(link => {

          link.style.display = "none";

      });

 

      // Show Login button, hide Logout button

      loginBtn.style.display = "inline-block";

      logoutBtn.style.display = "none";

 

      // Hide protected content

      if (protectedContent) protectedContent.style.display = "none";

 

      // Clear username display if it exists

      const usernameElem = document.getElementById("username");

      if (usernameElem) {

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