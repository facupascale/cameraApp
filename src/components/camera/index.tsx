import { AppState, View, Text, Image } from 'react-native';
import { Camera as VisionCamera } from 'react-native-vision-camera';
import { useCameraContext } from '@hooks';
import { MenuOptions } from '../menu';
import { ActionButton } from '../actionButton';
import { CustomModal } from '../modal';
import { styles } from './styles';

const Camera = () => {
  const { handleCameraError, camera, device, format, cameraSettings, photos } = useCameraContext();
  const isActive = AppState.currentState === 'active';

  console.log('photos', photos);

  return (
    <>
      <CustomModal />
      {device == null ? (
        <View style={styles.container}>
          <Text style={styles.text}>Camera was not found, restart the application</Text>
        </View>
      ) : (
        <>
          <VisionCamera
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
          <MenuOptions />
          <ActionButton />
          <View
            style={{
              position: 'absolute',
              left: 20,
              bottom: 10,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {photos.edges.map((item, index) => (
              <Image
                key={index}
                width={30}
                height={60}
                source={{ uri: item.node.image.uri }}
                resizeMode="cover"
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

export { Camera };
