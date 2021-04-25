import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';

import { PlantProps } from './src/libs/storage';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    // (async () => {
    //   const notifications = await Notifications.getAllScheduledNotificationsAsync();

    //   console.log(notifications)
    // })()

    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log("Chegou notificação", data.name)
      }
    );

    return () => {
      subscription.remove();
    }
    
  }, [])

  if(!isFontsLoaded) return <AppLoading />

  return (
    <Routes />
  );
}
