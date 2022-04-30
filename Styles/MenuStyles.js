import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconPicture: {
    transform: [{scale: 1.5}],
    marginLeft: 52,
    marginBottom: 10,
  },
  icon: {
    transform: [{scale: 1.5}],
    marginLeft: 35,
  },
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
    marginBottom: 25,
  },
  textSelect: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 25,
    color: '#64748B',
    fontSize: 20,
  },
});

export default styles;