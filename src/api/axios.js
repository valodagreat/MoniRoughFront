import axios from "axios";

const instance = axios.create({
    baseURL: "https://monitest.onrender.com/api",
});

export default instance;