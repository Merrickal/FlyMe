import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Zarbiya = () => {
    const [imageUri, setImageUri] = useState("")

    async function retrieveImage() {
        const imageName = "a7bffe84-343a-442f-a47d-7dae12c20d95"
        try {
            const response = await axios.get(`http://192.168.186.1:5001/images/${imageName}`, {
                responseType: 'blob'
            })
            const imageUri = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(response.data)
            })
            setImageUri(imageUri)
        } catch (error) {
            console.error("Error retrieving image:", error)
        }
    }

    useEffect(() => {
        retrieveImage()
    }, [])

    useEffect(() => {
        console.log(imageUri);
    }, [imageUri])
    // useEffect(() => {
    //     console.log(imageUri);
    // }, [imageUri])

    return (
        <SafeAreaView className="h-full w-full  bg-black-100">
            <View className="w-full h-full justify-center items-center">
                <Text className="text-xl text-gray-100">This image came from the Database:</Text>
                <View>
                    {imageUri ? (
                        <Image
                            className="w-[250px] h-[250px] rounded-full border-2 border-white mt-10 justify-center items-center border-dashed overflow-hidden"
                            source={{ uri: imageUri }}
                            style={{ width: 200, height: 200 }}
                        />
                    ) : (
                        <Text>Loading image...</Text>
                    )}
                </View>

            </View>
        </SafeAreaView>

    )
}

export default Zarbiya