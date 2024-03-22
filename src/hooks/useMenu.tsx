import { Text } from 'react-native';
import { Icons } from '@constants';
import { useCameraContext } from './useCameraContext';

const useMenu = () => {
  const { handleCameraSettings, format, cameraSettings } = useCameraContext();
  const hdrSupport = cameraSettings.video ? format?.supportsVideoHdr : format?.supportsPhotoHdr;
  const fpsSupport = cameraSettings.video;

  let options = [
    {
      id: 'shutterSound',
      children: (
        <>
          {cameraSettings.enableShutterSound ? (
            <Icons.SoundOn width={22} height={22} color={'white'} />
          ) : (
            <Icons.SoundOff width={22} height={22} color={'white'} />
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'shutterSound' }),
    },
    {
      id: 'quality',
      children: (
        <>
          {cameraSettings.resolution === 'max' ? (
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>Max</Text>
          ) : (
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>HD</Text>
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'quality' }),
    },
    {
      id: 'fps',
      children: (
        <>
          {cameraSettings.fps === 60 ? (
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>30</Text>
          ) : (
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>60</Text>
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'fps' }),
    },
    {
      id: 'hdr',
      children: (
        <Icons.HDR width={22} height={22} color={cameraSettings.hdrActive ? 'black' : 'white'} />
      ),
      onPress: () => handleCameraSettings({ setting: 'hdr' }),
    },
    {
      id: 'flash',
      children: (
        <>
          {cameraSettings.flash === 'on' ? (
            <Icons.FlashOn width={22} height={22} color={'white'} />
          ) : (
            <Icons.FlashOff width={22} height={22} color={'white'} />
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'flash' }),
    },
    {
      id: 'camera',
      children: (
        <>
          {cameraSettings.cameraSelected === 'front' ? (
            <Icons.RotateCameraLeft width={22} height={22} color={'white'} />
          ) : (
            <Icons.RotateCameraRight width={22} height={22} color={'white'} />
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'camera' }),
    },
    {
      id: 'video',
      children: (
        <>
          {cameraSettings.video ? (
            <Icons.VideoCamera width={22} height={22} color={'white'} />
          ) : (
            <Icons.Camera width={22} height={22} color={'white'} />
          )}
        </>
      ),
      onPress: () => handleCameraSettings({ setting: 'video' }),
    },
  ];
  if (!hdrSupport) {
    options = options.filter((option) => option.id !== 'hdr');
  }

  if (!fpsSupport) {
    options = options.filter((option) => option.id !== 'fps');
  }

  return { options };
};

export { useMenu };
