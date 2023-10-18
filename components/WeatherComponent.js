import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export default function WeatherComponent(props) {
  const temp = props ? props.temp : 0;
  const condition = props ? props.condition : '';
  const icon = props ? props.icon : '';
  const feel = props ? props.feel : '';
  const desc = props ? props.desc : '';
  return (
    <View style={styles.weathercontainer}>
      <View style={styles.locationcontainer}></View>
      <View style={styles.hehe}>
        <Text style={styles.text}>Temperature: {temp} </Text>
        <Text style={styles.text}>Condition: {condition} </Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        />
        <Text style={styles.text}>Feels like: {feel} </Text>
        <Text style={styles.text}>Description: {desc} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weathercontainer: {
    backgroundColor: '#a9a9a9',
    width: '100%',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hehe: {
    marginBottom: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
});
