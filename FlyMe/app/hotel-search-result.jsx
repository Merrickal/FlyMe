import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View, Image, RefreshControl, BackHandler, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import SearchInput from '../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../constants';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Avatar from '../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const hotelSearchResult = () => {

    const { query } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hotelsList, setHotelsList] = useState([])

    function queryHotelsByName() {
        axios
            .post('http://192.168.186.1:5001/queryHotelsByName', { query: query.toString() })
            .then((res) => {
                // console.log(res.data.data);
                setHotelsList(res.data.data)
            })
            .catch(e => console.log(e))
    }
    const emptyImage = images.empty;
    const onRefresh = () => {
        setRefreshing(true);
        listAllHotels();
        setRefreshing(false)
    }


    useEffect(
        queryHotelsByName
        , [])

    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <View className="w-full  pt-7">
                <View className="w-full flex-row justify-between">
                    <Avatar />
                </View>
                <View className="w-full h-full pb-11">
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        data={hotelsList}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View className="flex-col items-center mx-7 my-1 p-1 border-2 rounded-xl bg-black-100 ">
                                <TouchableOpacity
                                    className="w-full h-60 justify-center items-center "
                                    activeOpacity={0.7}
                                    onPress={() => { router.push(`/hotel-selection?id=${item._id}&name=${item.name}&image=${item.image != null ? item.image : emptyImage}&description=${item.description}&contactEmail=${item.contactEmail}&site=${item.site}&location=${item.location}&phoneNumber=${item.phoneNumber}&reviews=${item.reviews}`) }}
                                >
                                    {item.primaryImage != null ? (
                                        <Image
                                            source={{ uri: item.image }}
                                            className="w-full h-full"
                                            resizeMode='contain'
                                        />
                                    ) : (
                                        <Image
                                            source={images.empty}
                                            className="w-full h-full "
                                            resizeMode='contain'
                                        />
                                    )}
                                </TouchableOpacity>
                                <View className="border-0.5 border-gray-100 my-2 w-full"></View>
                                <View className="w-full justify-between flex-row">
                                    <View className="justify-start pl-2">
                                        <Text className="text-xl font-psemibold text-gray-100">{item.name}</Text>
                                        <Text className="text-sm font-psemibold text-gray-100">{item.reviews}</Text>
                                        <Text className="text-sm text-gray-100">{item.location}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { router.push(`/edit-hotel?id=${item._id}&name=${item.name}&image=${item.primaryImage != null ? item.primaryImage.url : emptyImage}&description=${item.description}&contactEmail=${item.contactEmail}&site=${item.site}&location=${item.location}&phoneNumber=${item.phoneNumber}&reviews=${item.reviews}`) }}>
                                        <Image
                                            source={icons.menu}
                                            className="w-6 h-6"
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        // ListHeaderComponent={() => (


                        // )}
                        ListEmptyComponent={
                            <View className="justify-center items-center px-4">
                                <Image
                                    source={images.empty}
                                    className="w-[270px] h-[215px]"
                                    resizeMode='contain'
                                />
                                <Text className="text-xl font-psemibold text-gray-100">No Hotels Have been Found</Text>
                                <Text className="text-xl font-psemibold text-gray-100">Try Adding One</Text>
                            </View>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default hotelSearchResult