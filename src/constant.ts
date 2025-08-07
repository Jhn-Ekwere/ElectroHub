const origin = window.location.origin;

const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
const VITE_LIVE_URL = import.meta.env.VITE_LIVE_URL;



export const API_URL =
    // origin !== "http://localhost:5173"
    // || origin === "192.168.0.101:5173"
    // ?
    // VITE_LOCAL_URL :
    VITE_LIVE_URL;
