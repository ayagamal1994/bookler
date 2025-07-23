import axios from "axios";

export const ApiUrl = axios.create({
    baseURL: "https://booking-app-db.vercel.app",
})