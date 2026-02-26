import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//interceptor is function in axios which helps manually attach token to the header
API.interceptors.request.use((req) => {
    //we take the token saved in storage and put it in the header so later user can request it from there to authorize or verify
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;