import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Button } from '../../components/Button';


const UserIdentification = () => {
  const { navigate } = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = useCallback(async () => {
    const data = await AsyncStorage.getItem("@plantManager:user");

    if(data) {
      setName(data);
      setIsFilled(!!data);
    }

  }, []);

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

  const handleConfirm = useCallback(async () => {
    if(!name) {
      return Alert.alert("Me diz como chamar você 😥");
    }

    try {
      await AsyncStorage.setItem("@plantManager:user", name);
      navigate('Confirmation', {
        title: "Prontinho",
        subtitle: "Agora vamos cuidar das suas plantinhas com muito carinho.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantSelect",
      });
    } catch (err) {
      Alert.alert("Não foi possível salvar o seu nome. 😥");
    }
  }, [name]);

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
                value={name}
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