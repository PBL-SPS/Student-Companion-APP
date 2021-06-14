import useAppSelector from "./useAppSelector";
import useColorScheme from "./useColorScheme";

type useThemeModeFunc = () => "light" | "dark";

const useThemeMode: useThemeModeFunc = () => {
  const colorScheme = useColorScheme();
  const storedThemeState = useAppSelector((state) => state.settings.appearance);
  return storedThemeState === "DARK"
    ? "dark"
    : storedThemeState === "SYSTEM_PREF"
    ? colorScheme === "light"
      ? "light"
      : "dark"
    : "light";
};

export default useThemeMode;
