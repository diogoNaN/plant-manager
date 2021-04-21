import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View
} from 'react-native';

import { styles } from './styles';

import { Button } from '../../components/Button';


const Confirmation = () => {

  const handleStart = useCallback(() => {

  }, []);
  
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

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

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export { Confirmation };