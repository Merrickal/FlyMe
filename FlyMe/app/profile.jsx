import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'
import { icons } from '../constants'



const Profile = () => {

  const [userData, setUserData] = useState('')

  async function getData() {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    axios
      .post('http://192.168.186.1:5001/userData', { token: token })
      .then(res => {
        // console.log(res.data);
        setUserData(res.data.data)
      })
      .catch(e => console.log(e))
  }
  function signOut() {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    router.replace('/sign-in');
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView className="h-full bg-primary">
      {/* <View className="w-full flex-row justify-end">
        <TouchableOpacity
          className="p-2"
          onPress={() => { router.push('/editProfile') }}
        >
          <Image
            source={icons.pen}
            className="w-8 h-8"
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2"
          onPress={signOut}
        >
          <Image
            source={icons.logout}
            className="w-8 h-8"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View> */}
      <ScrollView >
        <View className="items-center justify-center w-full h-full my-6">
          <Image
            source={{ uri: "https://m.media-amazon.com/images/M/MV5BNjJhZjUzODMtZjg4ZS00OTQ3LWFhYjctYzYxZDM5OGNmZWFlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_.jpg" }}
            className="w-[250px] h-[250px] rounded-full overflow-hidden"
            resizeMode='contain'
          />
          <Text className="text-xl text-center text-white text-semibold mt-5 font-psemibold">Username:</Text>
          <Text className="text-xl text-center text-white text-semibold mt-2 font-psemibold">{userData.name}</Text>
          <Text className="text-xl text-center text-white text-semibold mt-5 font-psemibold">Email:</Text>
          <Text className="text-xl text-center text-white text-semibold mt-2 font-psemibold">{userData.email}</Text>
          <View className="w-full flex-row justify-evenly">
            <CustomButton
              title="Sign Out"
              containerStyles={"w-[180px] mt-3"}
              handlePress={signOut}
              icon={icons.logout}
            />
            <CustomButton
              title="Edit Profile"
              handlePress={() => { router.push('/editProfile') }}
              containerStyles={"w-[200px] mt-3"}
              icon={icons.profile}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
