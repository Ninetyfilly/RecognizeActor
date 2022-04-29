import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import imageNotFound from '../assets/imageNotFound.png';

const ActorScreen = ({route, navigation}) => {
  const [sex, setSex] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [movies, setMovies] = React.useState('');
  const [ready, setReady] = React.useState(false);
  const [popularityStar, setPopularityStar] = React.useState('');
  const [imageActor, setImageActor] = React.useState('');

  const {uri, name} = route.params;

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query=${name}&page=1`,
        );
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [navigation, name]);

  React.useEffect(() => {
    const searchData = () => {
      if (result !== null) {
        const movieData = result.results.map(item => {
          return item.known_for;
        });
        const findData = movieData.map((item, index) => {
          return {
            title: item[0].original_title,
            movieImage: item[0].poster_path,
            description: item[0].overview,
            popularity: item[0].vote_average,
            id: index,
          };
        });
        setImageActor(result.results[0].profile_path);
        setPopularityStar(result.results[0].popularity);
        setMovies(findData);
        setReady(true);
        if (result.results[0].gender === 1) {
          setSex('Mujer');
        } else {
          setSex('Hombre');
        }
      }
    };
    searchData();
  }, [result]);

  const Item = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.leftData}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.rightData}>
          {item.movieImage !== undefined
            ? movieImageLabel(item.movieImage)
            : imageMovieNotFound}
          <View style={styles.popularityItems}>
            <Text style={styles.title}>{item.popularity}</Text>
            <Button icon="star" color="gold" style={styles.star} />
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => <Item item={item} />;

  const flatlist = (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );

  const uriImageActor =
    imageActor !== null ? `https://image.tmdb.org/t/p/w500${imageActor}` : uri;

  const movieImageLabel = image => {
    return (
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${image}`}}
        style={styles.image}
      />
    );
  };

  const imageMovieNotFound = (
    <Image source={imageNotFound} style={styles.image} />
  );
  return (
    <View style={styles.containerTop}>
      <View style={styles.topBox}>
        <ImageBackground
          source={{uri: uriImageActor}}
          resizeMode="cover"
          style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setSex('');
            }}>
            <View style={styles.circleRow}>
              <Button icon="arrow-left" color="black" style={styles.row} />
            </View>
          </TouchableOpacity>
          <View style={styles.generalTexts}>
            <View style={styles.direction}>
              <Text style={styles.textName}>{name}</Text>
              <Text style={styles.textSex}>{sex}</Text>
            </View>
            <View style={styles.directionRight}>
              <Text style={styles.textPopularity}>Popularidad:</Text>
              <View style={styles.viewPopularity}>
                <Text style={styles.textStar}>{popularityStar}</Text>
                <Button
                  icon="star"
                  color="gold"
                  style={styles.starPopularity}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.generalList}>
        <Text style={styles.textPeliculas}>Peliculas:</Text>
        <SafeAreaView style={styles.containerBot}>
          {ready ? flatlist : <View />}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ActorScreen;

const styles = StyleSheet.create({
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
    backgroundColor:
      'linear-gradient(180deg, rgba(0, 0, 0, 0) 50.52%, #000000 100%)',
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
