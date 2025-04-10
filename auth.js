// auth.js
let auth0Client = null;

const configureClient = async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-w1dec3w1uj8hl5pr.us.auth0.com',
    client_id: 'QbEE5GmUEHXU9ZaaUsONo3WbgLJJTye1',
    cacheLocation: 'localstorage',
  });
};

window.onload = async () => {
  await configureClient();

  const isAuthenticated = await auth0Client.isAuthenticated();

  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById('userInfo').innerText = `Hi, ${user.name}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }

  loginBtn.addEventListener('click', () => auth0Client.loginWithRedirect());
  logoutBtn.addEventListener('click', () => auth0Client.logout({ returnTo: window.location.origin }));
};
