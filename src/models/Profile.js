import axios from 'axios';

axios.defaults.withCredentials = true;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Profile {
  static async register(data) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/profiles`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async show(id) {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/profiles/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
