import { View } from 'react-native';
import { CustomButton } from '@components';
import { styles } from './styles';
import { useMenu, useCameraContext } from '@hooks';

const MenuOptions = ({ orientation }: { orientation: string }) => {
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
            transform: [
              {
                rotate:
                  orientation.toLowerCase() === 'landscape-left'
                    ? '90deg'
                    : orientation.toLowerCase() === 'landscape-right'
                      ? '-90deg'
                      : orientation.toLowerCase() === 'portrait-upsidedown' ||
                          orientation.toLowerCase() === 'face-fown'
                        ? '180deg'
                        : '0deg',
              },
            ],
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
