import React from "react";
import { Text } from "react-native";

interface propTypes {
  children: string;
  visible: boolean | undefined;
  style?: any;
}

const ErrorMessage = ({
  children,
  style,
  visible,
  ...otherProps
}: propTypes) => {
  if (!visible) {
    return null;
  }
  return (
    <Text style={{ color: "red", fontSize: 10 }} {...otherProps}>
      {children}
    </Text>
  );
};

export default ErrorMessage;
