import { View, Text } from 'react-native';
import { CustomButton } from '../button';
import { styles } from './styles';

type RequestPermissionProps = {
  requestPermission: () => void;
  cameraPermission: boolean;
  microphonePermission: boolean;
  libraryPermission: boolean;
};

const RequestPermission = ({
  requestPermission,
  cameraPermission,
  microphonePermission,
  libraryPermission,
}: RequestPermissionProps) => {
  const permissions = [
    { id: 'Camera', permission: cameraPermission },
    { id: 'Microphone', permission: microphonePermission },
    { id: 'Library', permission: libraryPermission },
  ];

  return (
    <View style={styles.container}>
      {permissions.map(({ id, permission }) => (
        <View key={id} style={styles.permissionContainer}>
          <Text style={styles.permissionText}>{id} permission:</Text>
          <CustomButton
            onPress={() => requestPermission()}
            disabled={permission}
            style={!permission && styles.permissionButon}
          >
            <Text style={styles.permissionButtonText}>
              {permission ? 'Granted' : 'Request Permission'}
            </Text>
          </CustomButton>
        </View>
      ))}
    </View>
  );
};

export { RequestPermission };
