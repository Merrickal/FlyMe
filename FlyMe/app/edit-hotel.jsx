import { View, Text, ScrollView, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import CustomButton from '../components/CustomButton'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { icons } from '../constants'
import FormField from '../components/FormField';
import axios from 'axios';




const editHotel = () => {

  const { id, name, image, description, contactEmail, site, location, phoneNumber, reviews } = useLocalSearchParams()

  const [hotelName, setHotelName] = useState(name)
  const [hotelDescription, setHotelDescription] = useState(description)
  const [hotelLocation, setHotelLocation] = useState(location)
  const [hotelPhoneNumber, setHotelPhoneNumber] = useState(phoneNumber)
  const [hotelSite, setHotelSite] = useState(site)
  const [hotelContactEmail, setHotelContactEmail] = useState(contactEmail)
  const [hotelReviews, setHotelReviews] = useState(reviews)

  const [isSubmitting, setisSubmitting] = useState(false)
  // console.log(id);
  function handleSubmit() {
    const hotelDetails = {
      id: id,
      name: hotelName,
      description: hotelDescription,
      location: hotelLocation,
      phoneNumber: hotelPhoneNumber,
      site: hotelSite,
      contactEmail: hotelContactEmail,
      reviews: hotelReviews,
    }
    setisSubmitting(true)
    axios
      .post('http://192.168.186.1:5001/editHotel', hotelDetails)
      .then(res => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Hotel Updated Successfully")
          router.replace('/home')
        }
      })
      .catch(e => console.log(e))
    setisSubmitting(false);
  }





  function handleBackPress() {
    Alert.alert(
      'Exit', 'You have some unsaved Data. \nAre you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => (router.replace("/home")),
        style: "exit"
      }
    ]
    );
    return true
  }

  useFocusEffect(
    React.useCallback(() => {

      // if (hotelName != "" && hotelDescription != "" && hotelLocation != "" && hotelPhoneNumber != "" && hotelContactEmail != "" && hotelReviews != "") {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }

    })
  )


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Avatar />
        <View className="w-full px-2 my-3">
          <FormField
            title={"Hotel Name"}
            value={hotelName}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelName(e)}
          />
          <FormField
            title={"Hotel Description"}
            value={hotelDescription}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelDescription(e)}
            multiline={true}
          />
          <FormField
            title={"Hotel Location"}
            value={hotelLocation}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelLocation(e)}
          />
          <FormField
            title={"Hotel Phone Number"}
            value={hotelPhoneNumber}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelPhoneNumber(e)}
          />
          <FormField
            title={"Hotel Website"}
            value={hotelSite}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelSite(e)}
          />
          <FormField
            title={"Hotel Contact Email"}
            value={hotelContactEmail}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelContactEmail(e)}
          />
          <FormField
            title={"Hotel Reviews"}
            value={hotelReviews}
            placeholder={""}
            placeholderTextColor="#7b7b8b"
            handleChangeText={(e) => setHotelReviews(e)}
          />
          <CustomButton
            title="Confirm Your Choices?"
            handlePress={handleSubmit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            icon={icons.pen}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default editHotel


