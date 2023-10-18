import {
  watchPositionAsync,
  requestForegroundPermissionsAsync,
  Accuracy,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherComponent from './components/WeatherComponent';
import LocationComponent from './components/LocationComponent';

export default function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [name, setName] = useState('');
  const [temp, setTemp] = useState(0);
  const [feel, setFeel] = useState(0);
  const [icon, setIcon] = useState('');
  const [desc, setDesc] = useState('');
  const [condition, setCondition] = useState('');

  const fetchWeather = async (lat, lon) => {
    await fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=d759c58aba179b2e53f5c268e21b6c96&units=metric'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.main.temp);
        console.log(json.name);
        console.log(json.weather[0].main);
        console.log(json.weather[0].icon);
        setName(json.name);
        setTemp(json.main.temp);
        setFeel(json.main.feels_like);
        setCondition(json.weather[0].main);
        setDesc(json.weather[0].description);
        setIcon(json.weather[0].icon);
      })
      .catch((error) => {});
  };
  //perm
  const gettingLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    //get location
    watchPositionAsync(
      {
        accuracy: Accuracy.BestForNavigation,
        distanceInterval: 10,
        timeInterval: 1000,
      },
      (location) => {
        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
        fetchWeather(location.coords.latitude, location.coords.longitude);
      }
    );
  };

  useEffect(() => {
    gettingLocation();
  }, []);

  return (
    <View style={styles.container}>
      <WeatherComponent
        temp={temp}
        condition={condition}
        icon={icon}
        feel={feel}
        desc={desc}
      ></WeatherComponent>
      <LocationComponent lat={lat} lon={lon} name={name}></LocationComponent>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
