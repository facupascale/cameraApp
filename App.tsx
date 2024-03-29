import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { usePermission } from './src/hooks';
import { Camera } from './src/components';
import { RequestPermission } from './src/components';
import { CameraContextProvider } from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const { requestPermission, cameraPermission, microphonePermission, libraryPermission } =
    usePermission();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 70 : 0 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'black'} />
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
          <Camera />
        </CameraContextProvider>
      )}
    </SafeAreaView>
  );
}

export default App;
