// Proxied by Vite in dev and by vercel.json rewrites in prod
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export default API_BASE_URL;
