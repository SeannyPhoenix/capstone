import axios from 'axios';

axios.defaults.withCredentials = true;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Session {
  static async login(data) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/sessions`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async verify() {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/sessions`);
      return response;
    } catch (error) {
      return error.response.data;
    }
  }

  static async logout() {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}/sessions`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
