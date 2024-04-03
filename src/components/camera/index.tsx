import { useState } from 'react';
import { AppState, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CameraProps, Camera as VisionCamera } from 'react-native-vision-camera';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useCameraContext } from '@hooks';
import { MenuOptions } from '../menu';
import { ActionButton } from '../actionButton';
import { CustomModal } from '../modal';
import { ListPhotos } from '../list';
import { styles } from './styles';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const ReanimatedCamera = Reanimated.createAnimatedComponent(VisionCamera);

const Camera = () => {
  const { handleCameraError, camera, device, format, cameraSettings } = useCameraContext();
  const isActive = AppState.currentState === 'active';
  const zoom = useSharedValue(device?.neutralZoom);
  const zoomOffset = useSharedValue(0);
  const [zoomValue, setZoomValue] = useState<number>(zoom?.value as number);
  const formatValue = (value: number) => {
    setZoomValue(Number(value.toFixed(0)));
  };

  const cameraAnimatedProps = useAnimatedProps<CameraProps>(() => {
    return { zoom: zoom.value };
  }, [zoom]);

  const onPinchGesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = withTiming(zoom.value ?? 0);
    })
    .onUpdate((event) => {
      const z = zoomOffset.value * event.scale;
      const clampedZ = Math.max(Math.min(z, device?.maxZoom ?? 10), device?.minZoom ?? 1);
      const newZoom = Math.min(clampedZ, 25);
      zoom.value = newZoom;
      runOnJS(formatValue)(newZoom);
    });

  const handleOnPressZoom = (value: number) => {
    formatValue(value);
    withSpring((zoom.value = value));
  };

  const zoomLevels = [
    {
      id: '.5x',
      value: 1,
      onPress: () => handleOnPressZoom(1),
    },
    {
      id: '1x',
      value: 2,
      onPress: () => handleOnPressZoom(2),
    },
    {
      id: '5x',
      value: 6,
      onPress: () => handleOnPressZoom(6),
    },
  ];

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
              orientation="portrait"
              torch={device?.hasTorch && cameraSettings.flash === 'on' ? 'on' : 'off'}
              format={format}
              onError={handleCameraError}
              photoHdr={format?.supportsPhotoHdr ? cameraSettings.hdrActive : false}
              videoHdr={format?.supportsVideoHdr ? cameraSettings.hdrActive : false}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      )}
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: '30%',
          alignItems: 'center',
        }}
      >
        <FlatList
          contentContainerStyle={{
            width: '35%',
            height: 40,
            borderRadius: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#00000066',
          }}
          data={zoomLevels}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                padding: 5,
                width: 35,
                height: 35,
                borderRadius: 30,
                backgroundColor:
                  zoomValue >= item.value &&
                  (zoomValue < zoomLevels[index + 1]?.value || !zoomLevels[index + 1])
                    ? 'white'
                    : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600' }}>
                {zoomValue >= item.value && item.id === '5x' ? `${zoomValue - 1}x` : `${item.id}`}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <MenuOptions />
      <ActionButton />
      <ListPhotos />
    </>
  );
};

export { Camera };
