import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants'
import CustomButton from '../components/CustomButton.jsx';
import { useGlobalContext } from '../context/GlobalProvider';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
    console.log(data + " index.jsx");
    if (data) {
      router.replace('/home')
    }
  }
  useEffect(() => {
    getData();
  }, [])


  // const { isLoading, isLoggedIn } = useGlobalContext();

  // if (!isLoading && isLoggedIn) {
  //   return (
  //     <Redirect href='/home'></Redirect>
  //   )
  // }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with
              {' '}<Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[80px] h-[15px} absolute -bottom-5 -right-2"
              resizeMode='contain'
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>
          <CustomButton
            title="Sign In"
            handlePress={() => { router.push('/sign-in') }}
            containerStyles="w-full mt-7"
          />
          {/* <CustomButton
            title="Home"
            handlePress={() => { router.push('/home') }}
            containerStyles="w-full mt-7"
          /> */}
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
}

