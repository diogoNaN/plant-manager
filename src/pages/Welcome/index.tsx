import React, { useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { styles } from './styles';

import wateringImg from '../../assets/watering.png';


const Welcome = () => {
  const { navigate } = useNavigation();

  const handleNext = useCallback(() => {
    navigate('UserIdentification');
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas {'\n'}
          de forma fácil
        </Text>

        <Image
          source={wateringImg}
          style={styles.image}
        />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas.
          Cuidaremos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleNext}
        >
          <Feather
            name="chevron-right"
            size={24}
            color="white"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export { Welcome };