import { AppState, View, Text } from 'react-native';
import { Camera as VisionCamera } from 'react-native-vision-camera';
import Reanimated, { Extrapolation, interpolate, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCameraContext } from '@hooks';
import { MenuOptions } from '../menu';
import { ActionButton } from '../actionButton';
import { CustomModal } from '../modal';
import { ListPhotos } from '../list';
import { styles } from './styles';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
})

const ReanimatedCamera = Reanimated.createAnimatedComponent(VisionCamera)

const Camera = () => {
  const { handleCameraError, camera, device, format, cameraSettings } = useCameraContext();
  const isActive = AppState.currentState === 'active';
  const zoom = useSharedValue(device?.neutralZoom)

  const zoomOffset = useSharedValue(0)
  const gesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value
    })
    .onUpdate((event) => {
      const z = zoomOffset.value * event.scale
      if (device !== undefined) {
        zoom.value = interpolate(
          z,
          [1, 10],
          [device.minZoom, device.maxZoom],
          Extrapolation.CLAMP,
        )
      }
    })

  const animatedProps = useAnimatedProps(() => ({
    zoom: zoom.value
  }))

  return (
    <>
      <CustomModal />
      {device == null ? (
        <View style={styles.container}>
          <Text style={styles.text}>Camera was not found, restart the application</Text>
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={gesture}>
            <ReanimatedCamera
              animatedProps={animatedProps}
              ref={camera}
              style={{ flex: 1 }}
              isActive={isActive}
              device={device}
              photo={true}
              video={true}
              audio={true}
              videoStabilizationMode={'auto'}
              format={format}
              onError={handleCameraError}
              photoHdr={format?.supportsPhotoHdr ? cameraSettings.hdrActive : false}
              videoHdr={format?.supportsVideoHdr ? cameraSettings.hdrActive : false}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      )}
      <MenuOptions />
      <ActionButton />
      <ListPhotos />
    </>
  );
};

export { Camera };
