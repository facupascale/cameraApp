import { useState } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../button';
import { useCameraContext } from '@hooks';
import { styles } from './styles';

const ActionButton = () => {
  const { cameraSettings, handleTakePhoto, handleTakeVideo } = useCameraContext();
  const [longPress, setLongPress] = useState(false);

  const handleLongPress = () => {
    if (!longPress) {
      handleTakeVideo({ action: 'start' });
      setLongPress(true);
    } else {
      handleTakeVideo({ action: 'stop' });
      setLongPress(false);
    }
  };
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => (cameraSettings.video ? handleLongPress() : handleTakePhoto())}
        style={styles.button}
      >
        <View style={{ ...styles.buttonContent, backgroundColor: longPress ? 'red' : 'white' }} />
      </CustomButton>
    </View>
  );
};
export { ActionButton };
