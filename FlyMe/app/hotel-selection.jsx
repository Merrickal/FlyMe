import { View, Text, ScrollView, Image, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import { icons } from '../constants';
import { Linking } from 'react-native'
import axios from 'axios';


const HotelSelection = () => {

    const { id, name, image, description, contactEmail, site, location, phoneNumber, reviews } = useLocalSearchParams()
    const hotelId = { id };
    const args = {
        number: phoneNumber,
        prompt: false,
        skipCanOpen: true,
    }


    const makePhoneCall = (phoneNumber) => {
        let phoneUrl;
        if (Platform.OS === 'android') {
            phoneUrl = `tel:${phoneNumber}`;
        } else {
            phoneUrl = `telprompt:${phoneNumber}`;
        }

        Linking.canOpenURL(phoneUrl)
            .then(supported => {
                if (!supported) {
                    return Linking.openURL(phoneUrl);
                }
            })
            .catch(err => console.log(err));
    };

    const sendEmail = (to, subject, body) => {
        let url = `mailto:${to}`;

        // Create email link query
        const query = encodeURIComponent(`subject=${subject}&body=${body}`);

        if (query.length) {
            url += `?${query}`;
        }

        // Check if we can use this link
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Email is not available');
                } else {
                    // Open email app
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openWebPage = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert(`Don't know how to open this URL: ${url}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openMap = (query) => {
        const encodedQuery = encodeURIComponent(query);
        const url = Platform.select({
            ios: `maps://maps.apple.com/?q=${encodedQuery}`,
            android: `geo:0,0?q=${encodedQuery}`,
            default: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`
        });

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    const browserUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
                    return Linking.openURL(browserUrl);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <SafeAreaView className=" h-full bg-primary">
            <ScrollView className=" h-full">
                <View className="w-full pt-2 px-2 flex-row justify-between">
                    <TouchableOpacity onPress={() => { router.push(`/edit-hotel?id=${id}&name=${name}&image=${image != null ? image : emptyImage}&description=${description}&contactEmail=${contactEmail}&site=${site}&location=${location}&phoneNumber=${phoneNumber}&reviews=${reviews}`) }}>
                        <Image
                            source={icons.menu}
                            className="w-6 h-6"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="pr-2"
                        onPress={() => {
                            Alert.alert(
                                'Delete Hotel', 'Are you sure you want to delete this item?', [
                                {
                                    text: 'Cancel',
                                    onPress: () => null,
                                    style: "cancel",
                                },
                                {
                                    text: "Delete",
                                    onPress: () => {
                                        axios
                                            .post('http://192.168.186.1:5001/deleteHotel', hotelId)
                                            .then(res => {
                                                console.log(res.data);
                                                if (res.data.status == "ok") {
                                                    Alert.alert("Hotel Deleted Successfully")
                                                    router.replace('/home')
                                                }
                                            })
                                            .catch(e => console.log(e))
                                    },
                                    style: "destructive"
                                }
                            ]
                            );
                        }}>
                        <Image
                            source={icons.trash}
                            className="w-8 h-8"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View className="p-4 mb-14 h-full w-full flex-col justify-start items-start">
                    {/* <Text className="text-3xl font-psemibold text-gray-100">{id}</Text> */}
                    <View className="w-full h-80 relative justify-center items-center">
                        <Image
                            source={image}
                            className="w-full h-full"
                            resizeMode='contain'
                        />

                    </View>
                    <View className="w-full my-4">
                        <View className="w-full justify-between flex-row">
                            <Text className="text-2xl font-psemibold text-gray-100">{name}</Text>
                            <Text className="bg-gray-100 pt-1 pl-1 text-xl rounded-xl text-primary font-psemibold w-9 h-9">{reviews}</Text>
                        </View>
                        <Text className="text-sm  text-gray-100">{location}</Text>
                        <View className="border-0.5 border-gray-100 my-2"></View>
                    </View>
                    <View>
                        <Text className="text-3xl font-psemibold text-gray-100">Summary</Text>
                        <Text className="text-xl  text-gray-100">{description}</Text>
                    </View>
                    <View className="w-full space-y-2 py-3">
                        <TouchableOpacity
                            onPress={() => makePhoneCall(phoneNumber)}
                        >
                            <View className="w-full flex-row">
                                <Image
                                    className="w-6 h-6"
                                    source={icons.phone}
                                    resizeMethod='contain'
                                />
                                <Text className="text-sm text-gray-100 pl-2 ">{phoneNumber}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sendEmail(contactEmail)}
                        >
                            <View className="w-full flex-row">
                                <Image
                                    className="w-6 h-6"
                                    source={icons.mail}
                                    resizeMethod='contain'
                                />
                                <Text className="text-sm text-gray-100 pl-2 ">{contactEmail}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => openWebPage(site)}
                        >
                            <View className="w-full flex-row">
                                <Image
                                    className="w-6 h-6"
                                    source={icons.web}
                                    resizeMethod='contain'
                                />
                                <Text className="text-sm text-gray-100 pl-2 ">{site}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => openMap(location)}
                        >
                            <View className="w-full flex-row">
                                <Image
                                    className="w-6 h-6"
                                    source={icons.location}
                                    resizeMethod='contain'
                                />
                                <Text className="text-sm text-gray-100 pl-2 ">{location}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HotelSelection


