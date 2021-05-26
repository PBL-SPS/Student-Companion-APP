import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://studentcompanion.herokuapp.com/api/v1/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxOTQ5ODAzLCJleHAiOjE2MjIwMzYyMDN9.EubThxIcpFHwyNwHuajFEA6Oos2njdQAckByBL2JzxE",
  },
});

export default AxiosInstance;
