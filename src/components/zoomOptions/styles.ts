import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: '30%',
    alignItems: 'center',
  },
  contentContainer: {
    width: '35%',
    height: 40,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00000066',
  },
  button: {
    padding: 5,
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export { styles };
