import React from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import image from '../assets/CapturaDePantalla.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import axios from 'axios';
import styles from '../Styles/MenuStyles';

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
    const loadDataGalery = async () => {
      const formData = new FormData();
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
            setState('Listo');
            setResponse(data.actorName);
            setTimeout(() => {
              findMovies(data.actorName);
            }, 2000);
          } else if (data.error === 'No sé quien es, intenta con otra foto') {
            setState('¿Es un famoso?');
            setResponse('No se encontró');
          }
        } catch (error) {
          console.log(error);
          setState('Hubo un error');
          setResponse('Error de red o de servidor');
        }
      }
    };

    const loadDataPicture = async () => {
      const formData = new FormData();
      if (
        resultado[0].type === 'image/png' ||
        resultado[0].type === 'image/jpeg'
      ) {
        formData.append('file', {
          uri: resultado[0].uri,
          type: resultado[0].type,
          name: resultado[0].fileName,
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
            setState('Listo');
            setResponse(data.actorName);
            setTimeout(() => {
              findMovies(data.actorName);
            }, 2000);
          } else if (data.error === 'No sé quien es, intenta con otra foto') {
            setState('¿Es un famoso?');
            setResponse('No se encontró');
          }
        } catch (error) {
          console.log('error Camara: ', error);
          setState('Hubo un error');
          setResponse('Error de red o de servidor');
        }
      }
    };

    const findMovies = name => {
      if (resultado.assets !== undefined) {
        navigation.navigate('Actor', {uri: resultado.assets[0].uri, name});
      } else {
        navigation.navigate('Actor', {uri: resultado[0].uri, name});
      }
      setViewPicture(false);
      setResponse('Buscando...');
      setState('Subiendo...');
    };

    const searchPicture = async () => {
      if (resultado !== null) {
        if (resultado.assets !== undefined) {
          loadDataGalery();
        } else {
          loadDataPicture();
        }
      }
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
      <Modal animationType="slide" transparent={true} visible={viewGeneral}>
        <View style={styles.modalGeneral}>
          <View style={styles.modalSelect}>
            <Text style={styles.textSelect}>selecciona una foto</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity
                onPress={() => {
                  choicePicture(undefined);
                }}
                // styles={styles.textSelection}
              >
                <Button
                  icon="image-outline"
                  color="black"
                  style={styles.iconPicture}>
                  Galeria de fotos
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  choicePicture('camera');
                }}>
                <Button icon="camera-outline" color="black" style={styles.icon}>
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

export default MenuScreen;
