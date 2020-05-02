import axios from 'axios';

axios.defaults.withCredentials = true;

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Auth {
  static async register(data) {
    try {
      const result = await axios.post(`${REACT_APP_API_URL}/auth/register`, data);
      return result.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async login(data) {
    try {
      const result = await axios.post(`${REACT_APP_API_URL}/auth/login`, data);
      return result.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async verify() {
    try {
      const result = await axios.get(`${REACT_APP_API_URL}/auth/verify`);
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async logout() {
    try {
      await axios.delete(`${REACT_APP_API_URL}/auth/logout`);
    } catch (err) {
      console.log(err);
    }
  }
}
