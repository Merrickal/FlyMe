import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View, RefreshControl } from 'react-native';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import useAppWrite from '../lib/useAppwrite';
import { getAllHotels } from '../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import { images } from '../constants';
import { router } from 'expo-router';
import filter from 'lodash.filter';

const Create = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [endPoint, setEndPoint] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    const [refreshing, setRefreshing] = useState(false)
    const { data: movies, refetch } = useAppWrite(getAllHotels)

    const emptyImage = images.empty;

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false)
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formatedQuery = query.toLowerCase();
        const filteredData = filter(data, (movie) => {
            return contains(movie.originalTitleText.text, formatedQuery);
        });
        setData(filteredData)
    }
    const contains = (movieName, query) => {
        if (movieName.includes(query)) {
            return true
        }
        return false

    }

    // const getHotels = async () => {
    //   try {
    //     // const response = await fetch('https://moviesdatabase.p.rapidapi.com/titles', {
    //     //   method: 'GET',
    //       // headers: {
    //       //   "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    //       //   "x-rapidapi-key": "637e33a01dmsh0fbd1ac991820e0p115f75jsnd1d3a9ddb8d8",
    //       // }
    //     });
    //     const responseJson = await response.json();
    //     setData(responseJson.movies);
    //     console.log(responseJson)
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    useEffect(() => {
        // getHotels();
        setData(movies)
    }, []);

    return (
        <SafeAreaView className="h-full bg-primary">
            <View className="w-full">
                {isLoading ? (
                    <ActivityIndicator
                        className="w-full h-[95vh] flex items-center justify-center"
                        size='large'
                        color='#3498db'
                    />
                ) : (

                    <View className="w-full">
                        <FlatList
                            data={movies}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (

                                // <DisplayCard display={item} />
                                <View className="flex-col items-center px-4 mb-14">
                                    <TouchableOpacity
                                        className="w-full h-60 relative justify-center items-center"
                                        activeOpacity={0.7}
                                        onPress={() => { router.push(`/selection?id=${item.id}&title=${item.originalTitleText.text}&image=${item.primaryImage != null ? item.primaryImage.url : emptyImage}&releaseyear=${item.releaseYear.year}`) }}
                                    >

                                        {item.primaryImage != null ? (
                                            <Image
                                                source={{ uri: item.primaryImage.url }}
                                                className="w-full h-full"
                                                resizeMode='contain'
                                            />
                                        ) : (
                                            <Image
                                                source={images.empty}
                                                className="w-full h-full mb-14"
                                                resizeMode='contain'
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <Text className="text-sm font-psemibold text-gray-100">{item.originalTitleText.text}</Text>
                                </View>
                            )}
                            ListHeaderComponent={() => (
                                <View className="my-6 px-4 space-x-6 flex justify-center items-center">
                                    <Text className="text-xl text-center text-white text-semibold mt-10 font-psemibold">Start Over Here and Search for a Hotel</Text>
                                    <Text className="text-lg text-center text-white text-semibold font-psemibold">Search For A Hotel</Text>
                                    <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
                                        <TextInput
                                            placeholder='Search...'
                                            clearButtonMode='always'
                                            className="text-white font-psemibold text-base py-4"
                                            placeholderTextColor="#7b7b8b"
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            value={searchQuery}
                                            onChangeText={(query) => { handleSearch(query) }}
                                        />
                                    </View>
                                </View>

                            )}
                            ListEmptyComponent={
                                <View className="justify-center items-center px-4">
                                    <Image
                                        source={images.empty}
                                        className="w-[270px] h-[215px]"
                                        resizeMode='contain'
                                    />
                                    <Text className="text-xl font-psemibold text-gray-100">No Movies Have been Found :'(</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />}
                        />
                        <CustomButton title="Submit" className='bg-secondary rounded-xl min-h-[62px] justify-center items-center' containerStyles={"mt-3"} />
                    </View>
                    // <View>
                    //   <Text className="text-xl text-center text-white text-semibold mt-10 font-psemibold">Start Over Here and Search for a Hotel</Text>
                    //   <Text className="text-lg text-center text-white text-semibold font-psemibold">Search For A Hotel</Text>
                    //   <FormField value={endPoint} placeholder="Search..." handleChangeText={(text) => setEndPoint(text)} />
                    //   <CustomButton title="Submit" className='bg-secondary rounded-xl min-h-[62px] justify-center items-center' containerStyles={"mt-3"} />
                    //   <Text className="text-xl text-center text-white text-semibold mt-10 font-psemibold" >{endPoint}</Text>
                    // </View>

                )}
            </View>
        </SafeAreaView>
    );
};


export default Create