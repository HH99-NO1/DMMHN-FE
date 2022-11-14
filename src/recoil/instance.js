import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3001",
  baseURL: "https://dgbnb.shop",
});
