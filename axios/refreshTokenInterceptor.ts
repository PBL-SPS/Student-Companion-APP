import AxiosInstance from ".";
import { addTokens } from "../redux/reducers/authSlice";
import { store } from "../redux/store";

export default () =>
  AxiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (
        error.response.status !== 200 &&
        originalRequest.url ===
          `${AxiosInstance.defaults.baseURL}auth/refresh-token`
      ) {
        store.dispatch({type : "USER_LOGOUT"})
        return Promise.reject(error);
      }

      const storeState = store.getState();
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = storeState.auth.refresh_token;
        console.log("refreshing token", refreshToken,storeState.auth.id);
        const res = await AxiosInstance.post("/auth/refresh-token", {
          prevToken: refreshToken,
          userId: storeState.auth.id,
        });
        if (res.status === 200) {
          store.dispatch(
            addTokens({
              access_token: res.data.newAccessToken,
              refresh_token: res.data.newRefreshToken,
            })
          );
          return AxiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
