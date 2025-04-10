let auth0Client;

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize Auth0 client
  auth0Client = await createAuth0Client({
    domain: 'dev-w1dec3w1uj8hl5pr.us.auth0.com',
    client_id: 'QbEE5GmUEHXU9ZaaUs0No3WbgLJJTye1',
    cacheLocation: 'localstorage',
  });

  // Handle redirect after login
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // UI buttons
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }

  // ✅ Your Requested Code:
  loginBtn.addEventListener('click', () => {
    auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  });

  logoutBtn.addEventListener('click', () => {
    auth0Client.logout({
      returnTo: window.location.origin,
    });
  });
});
