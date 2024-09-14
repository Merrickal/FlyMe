import { View, Text, ScrollView, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import CustomButton from '../components/CustomButton'
import { router, useFocusEffect } from 'expo-router'
import { icons } from '../constants'
import FormField from '../components/FormField';
import axios from 'axios';

const AddHotel = () => {

    const [hotelName, setHotelName] = useState("")
    const [hotelDescription, setHotelDescription] = useState("")
    const [hotelLocation, setHotelLocation] = useState("")
    const [hotelPhoneNumber, setHotelPhoneNumber] = useState("")
    const [hotelSite, setHotelSite] = useState("")
    const [hotelContactEmail, setHotelContactEmail] = useState("")
    const [hotelReviews, setHotelReviews] = useState("")

    const [isSubmitting, setisSubmitting] = useState(false)

    function handleSubmit() {
        const hotelDetails = {
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
            .post('http://192.168.186.1:5001/addHotel', hotelDetails)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "ok") {
                    Alert.alert("Hotel Added Successfully")
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

export default AddHotel