import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://studentcompanion.herokuapp.com/api/v1/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIyMDkyODA2LCJleHAiOjE2MjIxNzkyMDZ9.UvSJFmd_MWTqCtkN6lO0DV0M2TmOxu5AtiDIe9rZJdg",
  },
});

export default AxiosInstance;
