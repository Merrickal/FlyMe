import { View, Text, ScrollView, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, useNavigation } from "expo-router"

import { Images, images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { createUser } from '../../lib/appwrite'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Config from 'react-native-config'


const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [form, setForm] = useState({
  //   username: '',
  //   email: '',
  //   password: "",
  // })

  const [isSubmitting, setisSubmitting] = useState(false)
  // const navigation = useNavigation();

  function handleSubmit() {
    const userData = {
      name: name,
      email,
      password,
    };

    setisSubmitting(true);
    axios
      .post('http://192.168.186.1:5001/login', userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Registered Successfully")
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true))
          router.replace('/home')

        }
        console.log("🚀 ~ handleSubmit ~ home:", home)
      })
      .catch(e => {
        console.log(e)
        Alert.alert("Error", "Registration failed. Please try again.")
      })
    setisSubmitting(false);
  }
  // const submit = async () => {
  //   if (!form.email || !form.password || !form.username) {
  //     Alert.alert('Error', 'Please fill all the fields')
  //   }

  //   setisSubmitting(true);
  //   try {
  //     const result = await createUser(form.email, form.password, form.username)
  //     router.replace('/home')
  //   } catch (error) {
  //     Alert.alert('Error', error.message)
  //   } finally {
  //     setisSubmitting(false);
  //   }
  // }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign In to Aora</Text>

          <FormField
            title="Username"
            value={name}
            handleChangeText={(e) => setName(e)}
            otherStyles="mt-10"
          />
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
            title='Sign Up'
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link
              className='text-lg font-psemibold text-secondary'
              href={"/sign-in"}>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp