import {
  Camera,
  CameraDevice,
  CameraDeviceFormat,
  CameraRuntimeError,
} from 'react-native-vision-camera';
import { PhotoIdentifiersPage } from '@react-native-camera-roll/camera-roll';
import { Dispatch, SetStateAction } from 'react';

export type CameraSettings = {
  hdrActive: boolean;
  cameraSelected: 'front' | 'back';
  flash: 'on' | 'off';
  enableShutterSound: boolean;
  fps: 30 | 60;
  resolution: 'max' | { width: number; height: number };
  video: boolean;
};

export type CameraSettingProp = {
  setting: 'hdr' | 'camera' | 'quality' | 'flash' | 'shutterSound' | 'fps' | 'video';
};

export type VideoAction = {
  action: 'start' | 'resume' | 'pause' | 'stop';
};

export type CameraContextType = {
  handleCameraSettings: (props: CameraSettingProp) => void;
  handleTakePhoto: () => void;
  handleTakeVideo: (props: VideoAction) => void;
  handleCameraError: (error: CameraRuntimeError) => void;
  cameraSettings: CameraSettings;
  savedFile: boolean;
  error: string | null;
  camera: React.RefObject<Camera>;
  device: CameraDevice | undefined;
  format: CameraDeviceFormat | undefined;
  photos: PhotoIdentifiersPage;
  setError: Dispatch<SetStateAction<string>>;
};
