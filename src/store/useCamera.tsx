import { useEffect, useState, useRef, useCallback, createContext } from 'react';
import { useCameraRoll } from '@react-native-camera-roll/camera-roll';
import {
  useCameraDevice,
  Camera,
  useCameraFormat,
  CameraRuntimeError,
  CameraCaptureError,
} from 'react-native-vision-camera';
import { CameraSettings, CameraSettingProp, VideoAction, CameraContextType } from '@types';

const CameraContext = createContext<CameraContextType | null>(null);

const CameraContextProvider = ({ children }: { children: React.ReactNode }) => {
  // === For Error ===
  const [error, setError] = useState<string>('');
  // === For Camera ===
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    hdrActive: false,
    cameraSelected: 'back',
    flash: 'off',
    enableShutterSound: true,
    fps: 60,
    resolution: 'max',
    video: false,
  });
  const device = useCameraDevice(cameraSettings.cameraSelected);
  const camera = useRef<Camera>(null);
  const format = useCameraFormat(device, [
    { fps: cameraSettings.fps },
    { videoResolution: cameraSettings.resolution },
    { photoResolution: cameraSettings.resolution },
    { videoHdr: cameraSettings.hdrActive },
    { photoHdr: cameraSettings.hdrActive },
  ]);

  // === For Library ===
  const [photos, getPhotos, saveAsset] = useCameraRoll();
  const [savedFile, setSavedFile] = useState<boolean>(false);

  // === Functions for handle camera settings ===
  const handleCameraSettings = ({ setting }: CameraSettingProp) => {
    if (setting === 'hdr') {
      return setCameraSettings({ ...cameraSettings, hdrActive: !cameraSettings.hdrActive });
    }
    if (setting === 'camera') {
      return setCameraSettings({
        ...cameraSettings,
        cameraSelected: cameraSettings.cameraSelected === 'front' ? 'back' : 'front',
      });
    }
    if (setting === 'quality') {
      return setCameraSettings({
        ...cameraSettings,
        resolution: cameraSettings.resolution === 'max' ? { width: 1280, height: 720 } : 'max',
      });
    }
    if (setting === 'flash') {
      return setCameraSettings({
        ...cameraSettings,
        flash: cameraSettings.flash === 'on' ? 'off' : 'on',
      });
    }
    if (setting === 'shutterSound') {
      return setCameraSettings({
        ...cameraSettings,
        enableShutterSound: !cameraSettings.enableShutterSound,
      });
    }
    if (setting === 'fps') {
      return setCameraSettings({
        ...cameraSettings,
        fps: cameraSettings.fps === 30 ? 60 : 30,
      });
    }
    if (setting === 'video') {
      return setCameraSettings({
        ...cameraSettings,
        video: !cameraSettings.video,
      });
    }
  };

  // === Functions for handle photo, video and library ===
  const handleTakePhoto = async () => {
    try {
      const file = await camera.current?.takePhoto({
        flash: cameraSettings.flash,
        enableShutterSound: cameraSettings.enableShutterSound,
      });
      await saveAsset(`file://${file?.path}`, {
        type: 'photo',
      });
      setSavedFile(!savedFile);
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        setError(e.message);
      } else {
        setError('Hubo un error, intente nuevamente');
      }
    }
  };

  const handleTakeVideo = async ({ action }: VideoAction) => {
    action === 'start' &&
      (await camera.current?.startRecording({
        fileType: 'mp4',
        flash: cameraSettings.flash,
        onRecordingError: (error) => {
          setError(error.message);
        },
        onRecordingFinished: async (video) => {
          await saveAsset(`file://${video?.path}`, {
            type: 'video',
          })
            .then(() => setSavedFile(!savedFile))
            .catch(() => setError('Hubo un error, intente nuevamente'));
        },
      }));
    action === 'stop' && (await camera.current?.stopRecording());
  };

  const handleCameraError = useCallback((error: CameraRuntimeError) => {
    setError(error.message);
  }, []);

  useEffect(() => {
    getPhotos({
      first: 10,
      assetType: 'All',
    });
  }, [savedFile]);

  return (
    <CameraContext.Provider
      value={{
        handleTakePhoto,
        handleTakeVideo,
        handleCameraSettings,
        handleCameraError,
        photos,
        camera,
        device,
        format,
        savedFile,
        error,
        cameraSettings,
        setError,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export { CameraContextProvider, CameraContext };
