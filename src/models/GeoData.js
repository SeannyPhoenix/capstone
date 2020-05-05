import axios from 'axios';

const IPDATA_URI = 'https://api.ipdata.co';
const IPDATA_KEY = '9f6049699d4d3e536dcd09a5d11b6590216ef920a7ff377a15c74205';
const NOMINATIM_URI = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_PARAMS = {
  format: 'json',
  limit: 100,
  polygon_svg: 1,
};

export default class GeoData {
  static async getClientIpData() {
    try {
      const response = await axios(`${IPDATA_URI}/?api-key=${IPDATA_KEY}`, {
        withCredentials: false,
      });
      return response;
    } catch (error) {
      return error.response.data;
    }
  }

  static async searchForLocation(query) {
    try {
      const params = Object.entries(NOMINATIM_PARAMS)
        .map((entry) => entry.join('='))
        .join('&');
      const response = await axios.get(`${NOMINATIM_URI}/${query}?${params}`);
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
}
