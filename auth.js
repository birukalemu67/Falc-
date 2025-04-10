
let auth0Client;

document.addEventListener("DOMContentLoaded", async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-w1dec3w1uj8hl5pr.us.auth0.com',
    client_id: 'QbEE5GmUEHXU9ZaaUs0No3WbgLJJTye1',
    cacheLocation: 'localstorage',
  });

  if (userInfo) {
    userInfo.innerHTML = `<p><strong>Welcome:</strong> ${user.name || user.email}</p>`;
  }
  

  // Handle redirect back from Auth0
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userInfo = document.getElementById('userInfo');

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    const user = await auth0Client.getUser();
    userInfo.innerHTML = `<p><strong>Welcome:</strong> ${user.name || user.email}</p>`;
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    userInfo.innerHTML = '';
  }

  loginBtn.addEventListener('click', () => {
    auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  });

  logoutBtn.addEventListener('click', () => {
    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  });
});
