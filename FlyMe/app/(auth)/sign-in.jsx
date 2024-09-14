import { View, Text, ScrollView, Image, FlatList, Alert, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, useFocusEffect } from "expo-router"

import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { signIn } from '../../lib/appwrite'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'



const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [form, setForm] = useState({
  //   email: '',
  //   password: "",
  // })

  function handleBackPress() {
    Alert.alert(
      'Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
        style: "exit"
      }
    ]
    );
    return true
  }

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    })
  )

  const [isSubmitting, setisSubmitting] = useState(false)

  function handleSubmit() {
    const userData = {
      email: email,
      password: password
    }
    setisSubmitting(true)
    axios
      .post('http://192.168.186.1:5001/login', userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Logged In Successfully");
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true))
          router.replace("/home");
        }
      }
      )
      .catch(e => {
        console.log(e)
      })
    setisSubmitting(false)
  }

  // const submit = async () => {
  //   if (!form.email || !form.password) {
  //     Alert.alert('Error', 'Please fill all the fields')
  //   }

  //   setisSubmitting(true);
  //   try {
  //     await signIn(form.email, form.password,)
  //     router.replace('/home')
  //   } catch (error) {
  //     Alert.alert('Error', error.message)
  //   } finally {
  //     setisSubmitting(false);
  //   }
  // }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView keyboardShouldPersistTaps={"always"}>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log In to your Account</Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={(e) => setPassword(e)}
            otherStyles="mt-7"
          />
          <CustomButton
            title='Sign In'
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link
              className='text-lg font-psemibold text-secondary'
              href={"/sign-up"}>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn