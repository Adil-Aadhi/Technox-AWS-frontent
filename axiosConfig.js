import axios from "axios";


const api = axios.create({
  baseURL: "https://technox-e-com.duckdns.org/",
  withCredentials: true,   // ⬅️ VERY IMPORTANT (allows HttpOnly cookies)
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const publicEndpoints = [
    "api/products/",
    "api/products/home/",
    "api/products/featured/",
    "api/products/latest/",
    "api/products/details/",
    "/api/forgot-password/send-otp/",
    "/api/forgot-password/verify-otp/",
    "/api/forgot-password/reset/"
  ];

  // Clean leading slash
  const cleanedUrl = config.url.replace(/^\//, "");

  // PUBLIC ROUTES => do NOT send token
  if (publicEndpoints.some(url => cleanedUrl.startsWith(url))) {
    return config;
  }

  // PRIVATE ROUTES => SEND TOKEN
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR (AUTO REFRESH WITH COOKIE)
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🚀 CALL COOKIE-BASED REFRESH ENDPOINT
        const res = await axios.post(
          "http://localhost:8000/api/token/refresh-cookie/",
          {},
          { withCredentials: true }
        );

        const newAccess = res.data.access;
        console.log(newAccess)
        // Save new access token
        localStorage.setItem("access", newAccess);

        // Update request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest); // retry request
      } catch (err) {
        // Refresh also FAILED → logout user
        localStorage.removeItem("access");
        localStorage.removeItem("user");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
