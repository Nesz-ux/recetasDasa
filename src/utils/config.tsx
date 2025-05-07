const USE_LOCAL_API = true; // ✅ cambia a true para usar local

export const API_BASE_URL = USE_LOCAL_API
  ? "http://192.168.1.94:5000"
  : "https://qrback.domcloud.dev";
