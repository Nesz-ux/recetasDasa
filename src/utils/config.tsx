const USE_LOCAL_API = false; // ✅ cambia a true para usar local

export const API_BASE_URL = USE_LOCAL_API
  ? "http://192.168.1.249:5000"
  : "https://qrback.domcloud.dev";
