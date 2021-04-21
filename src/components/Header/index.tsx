import React from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { styles } from './styles';

import userImg from '../../assets/user.png'

const Header = () => {

  return (
    <View style={styles.header}>

      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>Usuário</Text>
      </View>

      <Image source={userImg} style={styles.avatar}/>

    </View>
  )
}

export { Header };