import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1/restaurants";

export default axios.create({
  baseURL: API_BASE_URL,
});
