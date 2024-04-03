import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { usePermission } from './src/hooks';
import { Camera } from './src/components';
import { RequestPermission } from './src/components';
import { CameraContextProvider } from './src/store';

function App(): React.JSX.Element {
  const { requestPermission, cameraPermission, microphonePermission, libraryPermission } =
    usePermission();
  const [orientation, setOrientation] = useState<string>('portrait');

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 70 : 0 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'black'} />
      <OrientationLocker
        orientation={PORTRAIT}
        onDeviceChange={(orientation) => setOrientation(orientation)}
      />
      {!cameraPermission ||
      !microphonePermission ||
      (Platform.OS === 'android' && !libraryPermission) ? (
        <RequestPermission
          requestPermission={requestPermission}
          cameraPermission={cameraPermission}
          microphonePermission={microphonePermission}
          libraryPermission={libraryPermission}
        />
      ) : (
        <CameraContextProvider>
          <Camera orientation={orientation} />
        </CameraContextProvider>
      )}
    </SafeAreaView>
  );
}

export default App;
