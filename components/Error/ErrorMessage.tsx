import { Text } from "@ui-kitten/components";
import React from "react";

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
    <Text status="danger" category="label" {...otherProps}>
      {children}
    </Text>
  );
};

export default ErrorMessage;
