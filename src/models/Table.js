import axios from 'axios';

axios.defaults.withCredentials = true;
const { REACT_APP_API_URL } = process.env;

export default class Table {
  static async create(data) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/tables`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async index() {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/tables`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async indexInRadius(longitude, latitude, radius) {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/tables/near/${longitude}/${latitude}/${radius}`,
      );
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

  static async delete(id) {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}/tables/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
