import axios, { Axios } from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDMyYjY0ZGU3NTc1NDgzOTQ2ODgwNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjgzMjc0NiwiZXhwIjoxNzE3MDkxOTQ2fQ.VJ2lVfJTtE0cwdL5GiLvuSuJ9f3rEhQJeivAFYPdY9E";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
