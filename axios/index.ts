import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://studentcompanion.herokuapp.com/api/v1/",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxODM1NTM4LCJleHAiOjE2MjE5MjE5Mzh9.QGTar1yHc_XECkeHx-mFmQ5J0QDO4CVEvv1lbLhiScg",
  },
});

export default AxiosInstance;
