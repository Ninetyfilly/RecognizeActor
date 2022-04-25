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

const Screen = () => {
  const [view, setView] = React.useState(false);

  const Camera = async () => {
    const result = await launchCamera('mediaType');
    console.log(result);
  };

  const Library = async () => {
    const result = await launchImageLibrary('mediaType');
    console.log(result);
  };

  return (
    <View style={styles.viewGeneral}>
      <Text style={styles.textHey}>Hey, Dev 👋</Text>
      <Text style={styles.textWork}>keep up the good work!</Text>
      <Text style={styles.textQuestion}>¿Quién es el famoso?</Text>
      <TouchableOpacity
        onPress={() => {
          setView(true);
        }}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        onShow={() => console.log('show')}
        transparent={true}
        visible={view}>
        <View style={styles.modalGeneral}>
          <View style={styles.modalSelect}>
            <Text style={styles.textSelect}>selecciona una foto</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity
                onPress={() => {
                  Library();
                }}
                styles={styles.textSelection}>
                <Button icon="image-outline" color="black">
                  Galeria de fotos
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Camera();
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
    </View>
  );
};

const styles = StyleSheet.create({
  viewGeneral: {
    flex: 1,
    padding: 10,
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
    backgroundColor: 'rgba(30, 41, 59,0.5)',
    justifyContent: 'flex-end',
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
    marginBottom: 15,
    marginTop: 10,
  },
  textSelection: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 25,
  },
});

export default Screen;
