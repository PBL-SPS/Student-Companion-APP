import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://studentcompanion.herokuapp.com/api/v1/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyMDQ4Nzc4LCJleHAiOjE2MjIxMzUxNzh9.GQ0BsAlkz2j3VkibnkbVikb6XgmpW2u8ynTq0dDGtic",
  },
});

export default AxiosInstance;
