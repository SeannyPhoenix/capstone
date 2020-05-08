import axios from 'axios';

axios.defaults.withCredentials = true;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Table {
  static async index() {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/games`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async show(id) {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/games/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
