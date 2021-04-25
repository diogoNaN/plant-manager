import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  Alert,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';


import { styles } from './styles';
import { PlantProps, savePlant } from '../../libs/storage';

import waterDrop from '../../assets/waterdrop.png';

import { Button } from '../../components/Button';


interface RouteParams {
  plant: PlantProps;
}


const PlantSave = () => {
  const route = useRoute();
  const { navigate } = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { plant } = route.params as RouteParams;

  const handleChangeTime = useCallback((event: Event, dateTime: Date | undefined ) => {
    if(Platform.OS === 'android') {
      setShowDatePicker(!showDatePicker);
    }

    const now = new Date();

    if(dateTime && isBefore(dateTime, now)) {
      setSelectedDateTime(now);
      return Alert.alert("Escolha uma data no futuro! ⏰");
    }

    if(dateTime) {
      setSelectedDateTime(dateTime);
    }

  }, [showDatePicker]);

  const handleSavePlant = useCallback(async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      })

      navigate('Confirmation', {
        title: "Muito Obrigado :D",
        subtitle: "Fique tranquilo que sempre iremos lembrar você de cuidar da sua plantinha.",
        buttonTitle: "Tudo certo",
        icon: "hug",
        nextScreen: "MyPlants",
      });
      
    } catch (error) {
      Alert.alert("Não foi possível salvar. 😥");
    }
  }, [selectedDateTime]);
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.container}>

        <View style={styles.content}>

          <View style={styles.plantInfo}>

            <SvgFromUri
              uri={plant.photo}
              height={150}
              width={150}
            />

            <Text style={styles.plantName}>
              {plant.name}
            </Text>

            <Text style={styles.plantAbout}>
              {plant.about}
            </Text>

          </View>
          
          <>

            <View style={styles.controller}>

              <View style={styles.tipContainer}>

                <Image
                  source={waterDrop}
                  style={styles.tipImage}
                />

                <Text style={styles.tipText}>
                  {plant.water_tips}
                </Text>

              </View>

              <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado:
              </Text>

              {showDatePicker &&
                <DateTimePicker
                  value={selectedDateTime}
                  is24Hour
                  mode="time"
                  display="spinner"
                  onChange={handleChangeTime}
                />
              }

              <TouchableOpacity
                style={styles.selectedHour}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.selectedHourText}>
                  {format(selectedDateTime, "HH:mm")}
                </Text>
              </TouchableOpacity>

              <Button
                title="Cadastrar planta"
                onPress={handleSavePlant}
              />

            </View>

          </>

        </View>

      </View>

    </ScrollView>
  )
}

export { PlantSave };