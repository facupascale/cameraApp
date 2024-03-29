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
    const settingActions = {
      hdr: () => setCameraSettings({ ...cameraSettings, hdrActive: !cameraSettings.hdrActive }),
      camera: () => setCameraSettings({ ...cameraSettings, cameraSelected: cameraSettings.cameraSelected === 'front' ? 'back' : 'front' }),
      quality: () => setCameraSettings({ ...cameraSettings, resolution: cameraSettings.resolution === 'max' ? { width: 1280, height: 720 } : 'max' }),
      flash: () => setCameraSettings({ ...cameraSettings, flash: cameraSettings.flash === 'on' ? 'off' : 'on' }),
      shutterSound: () => setCameraSettings({ ...cameraSettings, enableShutterSound: !cameraSettings.enableShutterSound }),
      fps: () => setCameraSettings({ ...cameraSettings, fps: cameraSettings.fps === 30 ? 60 : 30 }),
      video: () => setCameraSettings({ ...cameraSettings, video: !cameraSettings.video }),
    };

    const action = settingActions[setting];
    if (action) {
      action();
    }
  };

  // === Functions for handle photo, video and library ===

  const handleSavefile = async (filePath: string | undefined, type: 'video' | 'photo') => {
    try {
      if (filePath !== undefined) {
        await saveAsset(filePath, {
          type: type
        });
        setSavedFile(!savedFile);
      }
    } catch (error: any) {
      if (error.message) {
        setError(error.message)
      } else {
        setError('Hubo un error, intente nuevamente')
      }
    }
  }

  const handleTakePhoto = async () => {
    try {
      const file = await camera.current?.takePhoto({
        flash: cameraSettings.flash,
        enableShutterSound: cameraSettings.enableShutterSound,
      });
      await handleSavefile(file?.path, 'photo');
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        setError(e.message);
      } else {
        setError('Hubo un error, intente nuevamente');
      }
    }
  };

  const startRecording = async () => {
    camera.current?.startRecording({
      fileType: 'mp4',
      flash: cameraSettings.flash,
      onRecordingError: (error) => {
        setError(error.message);
      },
      onRecordingFinished: async (video) => {
        await handleSavefile(video.path, 'video');
      },
    })
  }

  const stopRecording = async () => {
    await camera.current?.stopRecording();
  }

  const handleTakeVideo = async ({ action }: VideoAction) => {
    if (action === 'start') {
      await startRecording();
    } else {
      await stopRecording();
    }
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
