import { View, Text, ScrollView, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import CustomButton from '../components/CustomButton'
import { router, useFocusEffect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { icons } from '../constants'
import FormField from '../components/FormField';
import axios from 'axios';




const editProfile = () => {


    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [userData, setUserData] = useState('')

    async function getData() {
        const token = await AsyncStorage.getItem('token');
        // console.log(token);
        axios
            .post('http://192.168.186.1:5001/userData', { token: token })
            .then(res => {
                setUserData(res.data.data)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        setId(userData._id);
        setName(userData.name);
        setEmail(userData.email);
    }, [userData])

    // async function getData() {
    //     const token = await AsyncStorage.getItem('token');
    //     console.log(token);
    //     axios
    //         .post('http://192.168.186.1:5001/userData', { token: token })
    //         .then(res => {
    //             setUserData(res.data.data)
    //             console.log(userData);
    //             setId(userData.id)
    //             console.log(userData);
    //             setName(userData.name)
    //             setEmail(userData.email)
    //         })
    //         .catch(e => console.log(e))
    // }


    const [isSubmitting, setisSubmitting] = useState(false)

    // function handleSubmit() {
    //     const userData = {
    //         name: name,
    //         email,
    //         password,
    //     };

    //     setisSubmitting(true);
    //     axios
    //         .post('http://192.168.186.1:5001/register', userData)
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.status == "ok") {
    //                 Alert.alert("Registered Successfully")
    //                 router.replace('/home')
    //             }
    //         })
    //         .catch(e => console.log(e))
    //     setisSubmitting(false);
    // }

    // console.log(id);
    function handleSubmit() {
        const profileDetails = {
            id: id,
            name: name,
            email: email,
            password: password,
        }
        setisSubmitting(true)
        axios
            .post('http://192.168.186.1:5001/editProfile', profileDetails)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "ok") {
                    AsyncStorage.setItem("token", res.data.data);
                    Alert.alert("Profile Updated Successfully")
                    router.replace('/home')
                }
                else if (res.data.status == "error") {
                    Alert.alert(res.data.data)
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
                        title={"Name"}
                        value={name}
                        placeholderTextColor="#7b7b8b"
                        handleChangeText={(e) => setName(e)}
                    />
                    <FormField
                        title={"Email"}
                        value={email}
                        placeholder={""}
                        placeholderTextColor="#7b7b8b"
                        handleChangeText={(e) => setEmail(e)}
                        multiline={true}
                    />
                    <FormField
                        title={"Password"}
                        value={password}
                        placeholder={""}
                        placeholderTextColor="#7b7b8b"
                        handleChangeText={(e) => setPassword(e)}
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


export default editProfile


