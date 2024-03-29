import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    bottom: Platform.OS === 'android' ? 10 : 50,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
})

export { styles }
