import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  permissionContainer: {
    paddingVertical: 15,
  },
  permissionText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  permissionButon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  permissionButtonText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
  },
});

export { styles };
