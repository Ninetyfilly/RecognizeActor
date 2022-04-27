import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import image from '../assets/CapturaDePantalla.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import axios from 'axios';

const MenuScreen = ({navigation}) => {
  const [viewGeneral, setViewGeneral] = React.useState(false);
  const [viewPicture, setViewPicture] = React.useState(false);
  const [state, setState] = React.useState('Subiendo...');
  const [imageModal, setImageModal] = React.useState('');
  const [response, setResponse] = React.useState('Buscando...');
  const [resultado, setResultado] = React.useState(null);

  let ButtonPersonal = (
    <TouchableOpacity
      onPress={() => {
        setViewPicture(false);
        setState('Subiendo...');
        setResponse('Buscando...');
      }}>
      <View style={styles.buttonClose}>
        <Text style={styles.textButton}>Cerrar</Text>
      </View>
    </TouchableOpacity>
  );
  let textSearch = <Text style={styles.textSearch}>{response}</Text>;
  let textFind = <Text style={styles.textFind}>{response}</Text>;
  let textNotFind = <Text style={styles.textNotFind}>{response}</Text>;
  let textError = <Text style={styles.textError}>{response}</Text>;

  const choicePicture = async choice => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
      },
    };
    try {
      if (choice === 'camera') {
        const result = await launchCamera(options);
        const images = result.assets.map(item => item.uri);
        setImageModal(images[0]);
        setResultado(result.assets);
      } else {
        const result = await launchImageLibrary(options);
        const images = result.assets.map(item => item.uri);
        console.log(result);
        setImageModal(images[0]);
        setResultado(result);
      }
      setViewGeneral(false);
      setViewPicture(true);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const searchPicture = async () => {
      const formData = new FormData();
      if (resultado !== null) {
        if (
          resultado.assets[0].type === 'image/png' ||
          resultado.assets[0].type === 'image/jpeg'
        ) {
          formData.append('file', {
            uri: resultado.assets[0].uri,
            type: resultado.assets[0].type,
            name: resultado.assets[0].fileName,
          });
          const options = {
            headers: {
              Nomada: 'ZDk3ZjYxZWMtNmJjZi00ZGI5LWI1ODctNDYwNWY1NzRhMGMz',
              'content-type': 'multipart/form-data',
            },
          };
          try {
            const {data} = await axios.post(
              'https://whois.nomada.cloud/upload',
              formData,
              options,
            );
            if (data.actorName !== '') {
              findMovies(data.actorName);
            } else if (data.error === 'No sé quien es, intenta con otra foto') {
              setState('¿Es un famoso?');
              setResponse('No se encontró');
            } else {
              setState('Hubo un error');
              setResponse('Error de red o de servidor');
            }
          } catch (error) {
            setState('Hubo un error');
            setResponse('Error de red o de servidor');
          }
        }
      }
    };
    const findMovies = name => {
      setState('Listo');
      setResponse(name);
      navigation.navigate('Actor', {uri: resultado.assets[0].uri, name});
      setViewPicture(false);
      setResponse('Buscando...');
      setState('Subiendo...');
    };
    searchPicture();
  }, [navigation, resultado]);

  return (
    <View style={styles.viewGeneral}>
      {/* Vista general */}
      <Text style={styles.textHey}>Hey, Dev 👋</Text>
      <Text style={styles.textWork}>keep up the good work!</Text>
      <Text style={styles.textQuestion}>¿Quién es el famoso?</Text>
      <TouchableOpacity
        onPress={() => {
          setViewGeneral(true);
        }}>
        <Image source={image} />
      </TouchableOpacity>
      {/* Modal de seleecion de foto */}
      <Modal
        animationType="slide"
        // onShow={() => console.log('show')}
        transparent={true}
        visible={viewGeneral}>
        <View style={styles.modalGeneral}>
          <View style={styles.modalSelect}>
            <Text style={styles.textSelect}>selecciona una foto</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity
                onPress={() => {
                  choicePicture(undefined);
                }}
                styles={styles.textSelection}>
                <Button icon="image-outline" color="black">
                  Galeria de fotos
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  choicePicture('camera');
                }}
                styles={styles.textSelection}>
                <Button icon="camera-outline" color="black">
                  Cámara
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal de espera */}
      <Modal
        animationType="slide"
        onShow={() => console.log('show')}
        transparent={true}
        visible={viewPicture}>
        <View style={styles.modalGeneral}>
          <View style={styles.modalSelect}>
            <Text style={styles.textSelect}>{state}</Text>
            <Image source={{uri: imageModal}} style={styles.image} />
            <View style={styles.viewSearch}>
              {state === '¿Es un famoso?' ||
              state === 'Hubo un error' ||
              state === 'Listo' ? (
                <View />
              ) : (
                textSearch
              )}
              {state === 'Listo' ? textFind : <View />}
              {state === '¿Es un famoso?' ? textNotFind : <View />}
              {state === 'Hubo un error' ? textError : <View />}
            </View>
            {/* El boton solo aparecera una vez se hayan cargaod los elementos */}
            {state === '¿Es un famoso?' ? ButtonPersonal : <View />}
            {state === 'Hubo un error' ? ButtonPersonal : <View />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 175,
    height: 211,
    alignSelf: 'center',
    borderRadius: 36,
    marginBottom: 20,
  },
  textButton: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#3843D0',
    borderRadius: 16,
    padding: 35,
    paddingVertical: 20,
    paddingHorizontal: '40%',
    alignSelf: 'center',
    marginTop: 15,
  },
  textSearch: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#3843D0',
    borderRadius: 16,
    padding: 20,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  textFind: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#4ADE80',
    borderRadius: 16,
    padding: 25,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  textNotFind: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#FDE047',
    borderRadius: 16,
    padding: 25,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  textError: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#F75555',
    borderRadius: 16,
    padding: 25,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  viewSearch: {},
  viewGeneral: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  textHey: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  textWork: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#475569',
    marginBottom: 25,
  },
  textQuestion: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  modalGeneral: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  buttonClose: {
    padding: 10,
    alignContent: 'center',
  },
  modalSelect: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOptions: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
  },
  textSelect: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 25,
    color: '#000000',
  },
  textSelection: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 25,
  },
});

export default MenuScreen;
