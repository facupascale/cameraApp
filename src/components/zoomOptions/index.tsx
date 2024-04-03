import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { styles } from './styles';

interface ZoomOptionsProps {
  orientation: string;
  zoomValue: number;
  handleOnPressZoom: (value: number) => void;
}

const ZoomOptions = ({ orientation, zoomValue, handleOnPressZoom }: ZoomOptionsProps) => {
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
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={zoomLevels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={{
              ...styles.button,
              backgroundColor:
                zoomValue >= item.value &&
                (zoomValue < zoomLevels[index + 1]?.value || !zoomLevels[index + 1])
                  ? 'white'
                  : 'transparent',
              transform: [
                {
                  rotate:
                    orientation.toLowerCase() === 'landscape-left'
                      ? '90deg'
                      : orientation.toLowerCase() === 'landscape-right'
                        ? '-90deg'
                        : orientation.toLowerCase() === 'portrait-upsidedown' ||
                            orientation.toLowerCase() === 'face-fown'
                          ? '180deg'
                          : '0deg',
                },
              ],
            }}
          >
            <Text style={styles.text}>
              {zoomValue >= item.value && item.id === '5x' ? `${zoomValue - 1}x` : `${item.id}`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export { ZoomOptions };
