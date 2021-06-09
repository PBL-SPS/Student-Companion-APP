import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./reducers/authSlice";
import circularReducer from "./reducers/circularSlice";
import contactReducer from "./reducers/contactsSlice";
import timetableReducer from "./reducers/timetableSlice";
import whatsNewReducer from "./reducers/whatsNewSlice";
import attendanceReducer from "./reducers/attendanceSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["contacts", "timetable", "auth", "circulars"],
};

const rootReducer = combineReducers({
  contacts: contactReducer,
  circulars: circularReducer,
  timetable: timetableReducer,
  auth: authReducer,
  whatsnew: whatsNewReducer,
  attendance: attendanceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
