import { AppState, View, Text } from 'react-native';
import { Camera as VisionCamera } from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import { useCameraContext, useZoom } from '@hooks';
import { MenuOptions } from '../menu';
import { ActionButton } from '../actionButton';
import { CustomModal } from '../modal';
import { ListPhotos } from '../list';
import { ZoomOptions } from '../zoomOptions';
import { styles } from './styles';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const ReanimatedCamera = Reanimated.createAnimatedComponent(VisionCamera);

const Camera = ({ orientation }: { orientation: string }) => {
  const { handleCameraError, camera, device, format, cameraSettings } = useCameraContext();
  const { zoomValue, onPinchGesture, handleOnPressZoom, cameraAnimatedProps } = useZoom();
  const isActive = AppState.currentState === 'active';

  return (
    <>
      <CustomModal />
      {device == null ? (
        <View style={styles.container}>
          <Text style={styles.text}>Camera was not found, restart the application</Text>
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={onPinchGesture}>
            <ReanimatedCamera
              animatedProps={cameraAnimatedProps}
              ref={camera}
              style={{ flex: 1 }}
              isActive={isActive}
              device={device}
              photo={true}
              video={true}
              audio={true}
              videoStabilizationMode={'auto'}
              torch={device?.hasTorch && cameraSettings.flash === 'on' ? 'on' : 'off'}
              format={format}
              orientation={'portrait'}
              onError={handleCameraError}
              photoHdr={format?.supportsPhotoHdr ? cameraSettings.hdrActive : false}
              videoHdr={format?.supportsVideoHdr ? cameraSettings.hdrActive : false}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      )}
      <ZoomOptions
        orientation={orientation}
        zoomValue={zoomValue}
        handleOnPressZoom={handleOnPressZoom}
      />
      <MenuOptions orientation={orientation} />
      <ActionButton />
      <ListPhotos />
    </>
  );
};

export { Camera };
