export default function authHeader() {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));

  if (userAuth && userAuth.accessToken) {
    return { Authorization: 'Bearer ' + userAuth.accessToken };
  } else {
    return {};
  }
}
