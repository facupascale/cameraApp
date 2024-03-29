import { useCameraContext } from '@hooks';
import { View, Image } from 'react-native';
import { styles } from './styles';

const ListPhotos = () => {
  const { photos } = useCameraContext();
  return (
    <View
      style={styles.container}
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
  )
}

export { ListPhotos }
