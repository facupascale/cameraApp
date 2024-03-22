import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    height: 150,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  recordingText: {
    fontWeight: '500',
    fontSize: 15,
    marginTop: 15,
    color: 'white',
    alignSelf: 'center',
  },
});

export { styles };
