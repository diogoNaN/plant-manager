import React, { useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { styles } from './styles';

import { Button } from '../../components/Button';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'hug' | 'smile';
  nextScreen: string;
};

const emojis = {
  hug: '🤗',
  smile: '😄'
}


const Confirmation = () => {
  const { navigate } = useNavigation();
  const route = useRoute();

  const {
    title,
    subtitle,
    icon,
    buttonTitle,
    nextScreen,
  } = route.params as Params;

  const handleStart = useCallback(() => {
    navigate(nextScreen);
  }, [nextScreen]);
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.buttonArea}>

          <Button
            title={buttonTitle}
            onPress={handleStart}
          />

        </View>

      </View>

    </SafeAreaView>
  )
}

export { Confirmation };