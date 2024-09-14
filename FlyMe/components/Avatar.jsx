import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const Avatar = () => {
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


    return (
        <View className="h-10">
            <TouchableOpacity className="flex-row"
                onPress={() => router.push('/profile')}
            >
                <Image
                    source={{ uri: "https://m.media-amazon.com/images/M/MV5BNjJhZjUzODMtZjg4ZS00OTQ3LWFhYjctYzYxZDM5OGNmZWFlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_.jpg" }}
                    className="w-10 h-10 mx-2 rounded-3xl"
                    resizeMode='cover'
                />
                <Text className="my-2 mx-1 font-psemibold text-gray-100 text-xl">{userData.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Avatar