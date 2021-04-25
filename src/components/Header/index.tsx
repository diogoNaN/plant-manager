import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import userImg from '../../assets/user.png'

const Header = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    getUser();
  }, [userName]);

  const getUser = useCallback(async () => {
    const data = await AsyncStorage.getItem('@plantManager:user');

    if(data) {
      const [name, surname] = data?.split(" ");

      setUserName(name);
    }

  }, [])

  return (
    <View style={styles.header}>

      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>{userName || "Usuário"}</Text>
      </View>

      <Image source={userImg} style={styles.avatar}/>

    </View>
  )
}

export { Header };