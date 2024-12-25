import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%', // Adatta l'immagine alla larghezza dello schermo
    height: '100%', // Adatta l'immagine all'altezza dello schermo
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6D597A',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#B56576',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF5E1',
    fontSize: 16,
    color: '#6D597A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginVertical: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  loading: {
    marginTop: 20,
    fontSize: 16,
    color: '#355070',
    fontStyle: 'italic',
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6D597A',
    textAlign: 'center',
  },
});
