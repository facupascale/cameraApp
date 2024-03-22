import { View } from 'react-native';
import { CustomButton } from '@components';
import { styles } from './styles';
import { useMenu, useCameraContext } from '@hooks';

const MenuOptions = () => {
  const { options } = useMenu();
  const { cameraSettings } = useCameraContext();

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <CustomButton
          id={option.id}
          onPress={option.onPress}
          style={{
            ...styles.button,
            backgroundColor:
              option.id === 'hdr' && cameraSettings.hdrActive ? 'white' : 'transparent',
          }}
        >
          {option.children}
        </CustomButton>
      ))}
    </View>
  );
};

export { MenuOptions };
