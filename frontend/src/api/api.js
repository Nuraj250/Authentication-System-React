import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle automatic token refresh
API.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 403) {
        try {
          const { data } = await axios.get("http://localhost:5000/api/token/refresh", { withCredentials: true });
          localStorage.setItem("accessToken", data.accessToken);
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error("Session expired. Please log in again.");
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default API;