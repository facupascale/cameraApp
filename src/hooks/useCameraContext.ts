import { useContext } from 'react';
import { CameraContext } from '@store';

const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContextContext must be used within a CameraContextProvider');
  }
  return context;
};

export { useCameraContext };
