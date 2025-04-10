document.addEventListener("DOMContentLoaded", async () => {
    // 1️⃣ Initialize Auth0
    auth0Client = await createAuth0Client({
      domain: 'dev-w1dec3w1uj8hl5pr.us.auth0.com',
      client_id: 'QbEE5GmUEHXU9ZaaUs0No3WbgLJJTye1',
      cacheLocation: 'localstorage',
    });
  
    // 2️⃣ Handle redirect back from Auth0 (IMPORTANT: do this first)
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/"); // Clean up the URL
    }
  
    // 3️⃣ Then check login status
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');
  
    if (isAuthenticated) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      const user = await auth0Client.getUser();
      if (userInfo) {
        userInfo.innerHTML = `<p><strong>Welcome:</strong> ${user.name || user.email}</p>`;
      }
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      if (userInfo) userInfo.innerHTML = '';
    }
  
    // 4️⃣ Add login/logout handlers
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
  