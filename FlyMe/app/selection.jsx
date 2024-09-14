import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { icons } from '../constants';


const Selection = () => {
    // async function do_it() {
    //     var responseComplete = ""
    //     const array = [
    //         "tt0000105",
    //         "tt0000123",
    //         "tt0000148",
    //         "tt0000088",
    //         "tt0000269",
    //     ]

    //     const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/tt0000086`, {
    //         method: 'GET',
    //         headers: {
    //             "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    //             "x-rapidapi-key": "637e33a01dmsh0fbd1ac991820e0p115f75jsnd1d3a9ddb8d8",
    //         }
    //     });
    //     const responseJson = await response.json();
    //     console.log(responseJson);


    // }
    // useEffect(() => {
    //     do_it()
    // }, [])

    const { id, title, image, releaseyear } = useLocalSearchParams()
    // console.log(image);
    return (
        <SafeAreaView className=" h-full bg-primary">
            <ScrollView className=" h-full">
                <View className="p-4 mb-14 space-y-7 h-full w-full flex-col justify-center items-center">
                    {/* <Text className="text-3xl font-psemibold text-gray-100">{id}</Text> */}
                    <View className="w-full h-80 relative justify-center items-center">
                        <Image
                            source={{ uri: image }}
                            className="w-full h-full"
                            resizeMode='contain'
                        />

                    </View>
                    <Text className="text-3xl font-psemibold text-gray-100">{title}</Text>
                    <Text className="text-xl font-psemibold text-gray-100">Released On: {releaseyear}</Text>
                    <Text className="text-2xl font-psemibold text-gray-100">Don't wanna Lose This title?</Text>
                    <CustomButton
                        title="Bookmark It for later"
                        // handlePress={() => { router.push('/profile') }}
                        containerStyles="w-full mt-7"
                        icon={icons.bookmark}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Selection


// async function do_it(params) {
//     const response = await fetch('https://moviesdatabase.p.rapidapi.com/titles?page=2', {
//         method: 'GET',
//         headers: {
//             "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
//             "x-rapidapi-key": "637e33a01dmsh0fbd1ac991820e0p115f75jsnd1d3a9ddb8d8",
//         }
//     }
//     )
//     console.log(response);
// }

// "tt0000066",
//     "tt0000049",
//     "tt0000103",
//     "tt0000133",
//     "tt0000125",
//     "tt0000184",
//     "tt0000109",
//     "tt0000086",
//     "tt0000105",
//     "tt0000123",
//     "tt0000148",
//     "tt0000088",
//     "tt0000269",
//     "tt0000152",
//     "tt0000132",
//     "tt0000095",
//     "tt0000161",
//     "tt0000100",
//     "tt0000075",
//     "tt0000051",
//     "tt0000003",
//     "tt0000030",
//     "tt0000181",
//     "tt0000186",
//     "tt0000208",
//     "tt0000052",
//     "tt0000253",
//     "tt0000177",
//     "tt0000072",
//     "tt0000024",
//     "tt0000023",
//     "tt0000084",
//     "tt0000083",
//     "tt0000013",
//     "tt0000074",
//     "tt0000098",
//     "tt0000070",