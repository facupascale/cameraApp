import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const CustomButton = ({
  onPress,
  onLongPress,
  onPressOut,
  style,
  disabled,
  id,
  children,
}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      id={id}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

export { CustomButton };
