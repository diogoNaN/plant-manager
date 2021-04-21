import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { styles } from './styles';

import { Button } from '../../components/Button';


const Confirmation = () => {
  const { navigate } = useNavigation()

  const handleStart = useCallback(() => {
    navigate("PlantSelect");
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.emoji}>
          😄
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Agora vamos cuidar das suas {'\n'}
          plantinhas com muito carinho.
        </Text>

        <View style={styles.buttonArea}>

          <Button
            title="Começar"
            onPress={handleStart}
          />

        </View>

      </View>

    </SafeAreaView>
  )
}

export { Confirmation };