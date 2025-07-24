import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import type { TouchableOpacityProps } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 rounded-md items-center bg-blue-600"
      activeOpacity={0.7}
      {...props}
    >
      <Text className="text-white font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
