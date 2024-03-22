import { useCallback, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';

const usePermission = () => {
  // Library permissions
  const [libraryPermission, setLibraryPermission] = useState<boolean>(false);

  // Camera and Microphone permissions
  const { hasPermission: cameraPermission, requestPermission: cameraRequest } =
    useCameraPermission();
  const { hasPermission: microphonePermission, requestPermission: microphoneRequest } =
    useMicrophonePermission();

  // Android Library permissions
  const hasAndroidPermission = async () => {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return setLibraryPermission(true);
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    const requestPermission = await getRequestPermissionPromise();
    if (requestPermission) {
      return setLibraryPermission(true);
    }
  };

  const requestPermission = useCallback(async () => {
    // arreglar esta funcion
    !cameraPermission && (await cameraRequest());
    !microphonePermission && (await microphoneRequest());
    Platform.OS === 'android' && !libraryPermission && (await hasAndroidPermission());
  }, []);

  return { cameraPermission, microphonePermission, libraryPermission, requestPermission };
};

export { usePermission };
