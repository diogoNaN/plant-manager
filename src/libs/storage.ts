import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from 'expo-notifications';


interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  },
  dateTimeNotification: Date;
  hour: string;
};

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notification_id: string;
  }
};

const savePlant = async (plant: PlantProps) : Promise<void> => {

  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;

    if(repeat_every === "week") {
      const interval = Math.trunc(7/times);
      nextTime.setDate(now.getDate() + interval);
    }else {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heeey 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        }
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      }
    })

    const data = await AsyncStorage.getItem('@plantManager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notification_id: notificationId,
      }
    }

    await AsyncStorage.setItem('@plantManager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    );

  } catch (error) {
    throw new Error(error);
  }

};

const getPlants = async () : Promise<PlantProps[]> => {

  try {
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object
      .keys(plants)
      .map((key) => {
        return {
          ...plants[key].data,
          hour: format(new Date(plants[key].data.dateTimeNotification), "HH:mm")
        }
      })
      .sort((a,b) => Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 - 
        Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
      ))

    return plantsSorted;

  } catch (error) {
    throw new Error(error);
  }

};

const deletePlant = async (id: string) : Promise<void> => {
  const data = await AsyncStorage.getItem('@plantManager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(
    plants[id].notification_id
  );
  delete plants[id];

  await AsyncStorage.setItem(
    '@plantManager:plants',
    JSON.stringify(plants)
  );
}

export {
  PlantProps,
  StoragePlantProps,
  getPlants,
  savePlant,
  deletePlant,
}