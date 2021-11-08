import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

class AuthService {
  signup(username, email, password) {
    console.log("username : ", username);

    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  signin(username, password) {
    console.log("username : ", username);

    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("userAuth", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("userAuth");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userAuth'));;
  }
}

export default new AuthService();
