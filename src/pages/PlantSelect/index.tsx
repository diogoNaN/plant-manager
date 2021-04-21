import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { styles } from './styles';

import { api } from '../../services/api';

import { Load } from '../../components/Load'; 
import { Header } from '../../components/Header';
import { EnvironmentButton } from '../../components/EnvironmentButton';
import { PlantCardPrimary } from '../../components/PlantCardPrimary';
import colors from '../../styles/colors';

interface EnvironmentData  {
  key: string;
  title: string;
};

interface PlantData  {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  }
};

const PlantSelect = () => {
  const [loading, setLoading] = useState(true);
  const [environments, setEnvironments] = useState([] as EnvironmentData[]);
  const [plants, setPlants] = useState([] as PlantData[]);
  const [filteredPlants, setFilteredPlants] = useState([] as PlantData[]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);


  useEffect(() => {

    getEnvironment();
    getPlants();

  }, []);

  useEffect(() => {
    if(environmentSelected === "all") {
      return setFilteredPlants(plants);
    }

    const justFiltered = plants.filter(
      (plant) => plant.environments.includes(environmentSelected)
    );

    setFilteredPlants(justFiltered);
  }, [environmentSelected, plants])

  const getEnvironment = useCallback( async () => {
    const { data } = await api.get('plants_environments', {
      params: {
        _sort: 'title',
        _order: 'asc',
      }
    });

    setEnvironments([
      {
        key: 'all',
        title: 'Todos',
      },
      ...data,
    ]);
  }, [api]);

  const getPlants = useCallback( async () => {
    if(loadedAll) {
      return setLoadingMore(false);
    };

    console.log(page)

    const { data } = await api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 10,
      }
    });

    if(data.length === 0) {
      setLoading(false);
      setLoadingMore(false);
      return setLoadedAll(true);
    }

    if(page > 1) {
      setPlants([ ...plants, ...data ]);
    } else {
      setPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }, [api, page, plants, loadedAll]);

  const handleLoadMore = useCallback((distance: number) => {
    if(distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(page + 1);

    getPlants();
  }, [page]);

  const handleSelectEnvironment = useCallback((environment: string) => {
    setEnvironmentSelected(environment);
  }, []);

  if(loading) return <Load />
  
  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <View style={styles.header}>

          <Header />

          <Text style={styles.title}>
            Em qual ambiente
          </Text>

          <Text style={styles.subtitle}>
            você quer colocar sua planta?
          </Text>

        </View>

        <View style={{ width: "100%" }}>

          <FlatList
            data={environments}
            renderItem={({ item }) => (
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleSelectEnvironment(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />

        </View>


        <View style={styles.plants}>
          <View style={styles.indicator}>
            {loadingMore && <ActivityIndicator color={colors.green} size={32}/> }
          </View>

          <FlatList
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary data={item} />
            )}
            keyExtractor={(item, index) => item.id }
            showsVerticalScrollIndicator={false}
            numColumns={ 2 }
            onEndReachedThreshold={ 0.1 }
            onEndReached={({ distanceFromEnd }) => handleLoadMore(distanceFromEnd)}
          />

        </View>
        
      </View>

    </View>
  )
}

export { PlantSelect };