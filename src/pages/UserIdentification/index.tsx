import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { styles } from './styles';

import { Button } from '../../components/Button';


const UserIdentification = () => {
  const { navigate } = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!name);
  }, [name]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setIsFilled(!!value);
    setName(value);
  }, []);

  const handleConfirm = useCallback(() => {
    navigate('Confirmation');
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
        >

          <View style={styles.content}>

            <View style={styles.form}>

              <Text style={styles.emoji}>
                {isFilled ? "😄" : "😀"}
              </Text>

              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
              </Text>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) &&
                  styles.inputFocused
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.buttonArea}>

                <Button
                  title="Confirmar"
                  onPress={handleConfirm}
                />

              </View>

            </View>

          </View>

        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export { UserIdentification };