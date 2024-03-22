import { useState, useEffect } from 'react';
import { View, Text, Modal } from 'react-native';
import { useCameraContext } from '@hooks';
import { styles } from './styles';

const CustomModal = () => {
  const { error, setError } = useCameraContext();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (error !== null && error.length > 0) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setError('');
      }, 2500);
    }
  }, [error]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{error ?? 'Hubo un error, intente nuevamente'}</Text>
        </View>
      </View>
    </Modal>
  );
};

export { CustomModal };
