import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  popularityItems: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  star: {
    transform: [{scale: 1.5}],
  },
  circleRow: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 55,
    height: 51,
    borderRadius: 45,
    marginLeft: 16,
    marginTop: 20,
  },
  starPopularity: {
    transform: [{scale: 1.5}],
  },
  containerTop: {
    flex: 1,
  },
  image: {
    width: 77,
    height: 150,
    borderRadius: 16,
  },
  leftData: {
    flexDirection: 'column',
    width: 230,
  },
  rightData: {
    flexDirection: 'column',
    paddingLeft: 35,
  },
  item: {
    backgroundColor: '#F1F5F9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    maxHeight: 250,
  },
  title: {
    fontSize: 24,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    color: '#000000',
  },
  direction: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  directionRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  viewPopularity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
  },
  containerBot: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    marginLeft: 15,
    marginTop: 5,
    transform: [{scale: 2.5}],
  },
  topBox: {
    flex: 1,
  },
  generalList: {
    flex: 1.2,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  textName: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 40,
  },
  generalTexts: {
    flex: 1,
    flexDirection: 'row',
  },
  textSex: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 19,
    backgroundColor: '#FACC15',
    borderRadius: 16,
    padding: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  textPopularity: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textStar: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textPeliculas: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: 17,
  },
});

export default styles;
