import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { usePermission } from './src/hooks';
import { Camera } from './src/components';
import { RequestPermission } from './src/components';
import { CameraContextProvider } from './src/store';

function App(): React.JSX.Element {
  const { requestPermission, cameraPermission, microphonePermission, libraryPermission } =
    usePermission();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'black'} />
      {!cameraPermission || !microphonePermission || !libraryPermission ? (
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
