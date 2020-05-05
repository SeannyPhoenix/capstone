import axios from 'axios';

axios.defaults.withCredentials = true;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Table {
  static async create(data) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/tables`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async show(id) {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/tables/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async indexUserTables(user) {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/tables/user`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async update(id, data) {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/tables/${id}`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
