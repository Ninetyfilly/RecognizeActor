import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import imageNotFound from '../assets/imageNotFound.png';
import styles from '../Styles/ActorStyles';

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
          style={styles.imageBackground}>
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
