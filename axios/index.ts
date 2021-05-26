import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://studentcompanion.herokuapp.com/api/v1/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIxOTI1MjYyLCJleHAiOjE2MjIwMTE2NjJ9.a0bQrtikmKMbE2b3qzariudwZh99mFM8F8elyTUk1BY",
  },
});

export default AxiosInstance;
