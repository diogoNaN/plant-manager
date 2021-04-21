import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import { styles } from './styles';

import loadAnimation from '../../assets/load.json';

const Load = () => {

  return (
    <View style={styles.load}>

      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />

    </View>
  )
}

export { Load };