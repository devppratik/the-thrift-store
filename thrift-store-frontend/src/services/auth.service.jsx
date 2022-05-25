import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://api.kanzulhaya.com";

class AuthService {
  // Login The User
  login(username, password) {
    return axios
      .post(API_URL + "/rest-auth/login/", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.key) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        localStorage.removeItem("user_details");
        return response.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  // Logout the User
  logout() {
    return axios.post(API_URL + "/rest-auth/logout/").then((_) => {
      localStorage.removeItem("user");
      localStorage.removeItem("user_details");
    });
  }

  // Reset Passowrd
  reset(email) {
    return axios
      .post(API_URL + "/rest-auth/password/reset/", {
        email,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  change(data) {
    return axios
      .post(API_URL + "/rest-auth/password/change/", data, {
        headers: authHeader({ image: false }),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  // Get Current User
  getCurrentUser() {
    const localToken = localStorage.getItem("user_details");
    let user = false;
    if (localToken) user = JSON.parse(localToken);
    if (user) return `${user.user.first_name} ${user.user.last_name}`;
    else return false;
  }

  getCurrentUserDetails() {
    const localToken = localStorage.getItem("user_details");
    let userDetails = false;
    if (localToken) userDetails = JSON.parse(localToken);
    if (userDetails) return userDetails;
    else return false;
  }

  // Get SuperUser Details
  getIsSuperUser() {
    const localToken = localStorage.getItem("user_details");
    let user = false;
    if (localToken) user = JSON.parse(localToken);
    if (user) return user.user.is_superuser;
    else return false;
  }
}

export default new AuthService();
