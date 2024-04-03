import { useState } from 'react';
import { CameraProps } from 'react-native-vision-camera';
import {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { useCameraContext } from '@hooks';

const useZoom = () => {
  const { device } = useCameraContext();
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

  return {
    zoomValue,
    cameraAnimatedProps,
    onPinchGesture,
    handleOnPressZoom,
  };
};

export { useZoom };
