import axios from 'axios';

axios.defaults.withCredentials = true;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3731/api/v1';

export default class Seat {
  static async add(tableId) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/tables/${tableId}/seats`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async update(id, data) {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/seats/${id}`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async remove(tableId, seatId) {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}/tables/${tableId}/seats/${seatId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
