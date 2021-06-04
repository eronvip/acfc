import React from 'react';
import HeaderComponent from '../../components/Header';
import { View } from 'react-native';
import  * as s from './style';

export default function HomeScreen({navigation}) {
  return (
    <View style={s.styles.bodyContainer}>
      <HeaderComponent nav={navigation} />
    </View>
  );
}