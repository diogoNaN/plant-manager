import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { styles } from './styles';
import { deletePlant, getPlants, PlantProps } from '../../libs/storage';

import waterDrop from '../../assets/waterdrop.png';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PlantCardSecondary } from '../../components/PlantCardSecondary';


const MyPlants = () => {
  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWatered, setNextWatered] = useState<string>();
  

  useEffect(() => {
    getStorageData();
  }, []);

  const getStorageData = useCallback(async () => {
    const plantsStorage = await getPlants();

    if(plantsStorage.length < 1) {
      setNextWatered(`Adicione uma nova plantinha para nós monitorarmos 😁`);
      setLoading(false);
      return;
    }

    const nextTime = formatDistance(
      new Date(plantsStorage[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: ptBR }
    );

    setNextWatered(
      `Não esqueça de regar a ${plantsStorage[0].name} em ${nextTime}`
    );

    setMyPlants(plantsStorage);
    setLoading(false);
  }, []);

  const handleRemove = useCallback((plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: 'cancel'
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await deletePlant(plant.id);

            const updatedPlants = myPlants.filter(
              (item) => item.id !== plant.id
            )

            setMyPlants(updatedPlants);
          } catch (error) {
            Alert.alert("Não foi possível remover.")
          }
        }
      }
    ])
  }, [myPlants])

  if(loading) return <Load />
  
  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <Header />

        <View style={styles.spotlight}>
          <Image
            source={waterDrop}
            style={styles.spotlightImage}
          />

          <Text style={styles.spotlightText}>
            {nextWatered}
          </Text>
        </View>

        <View style={styles.plants}>

          <Text style={styles.plantTitle}>
            Próximas regadas
          </Text>

          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => handleRemove(item)}
              />)}
            showsVerticalScrollIndicator={false}
          />

        </View>
  
      </View>

    </View>
  )
}

export { MyPlants };