import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View ,Image, RefreshControl, BackHandler, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Trending from '../../components/Trending';
import { icons, images } from '../../constants';
import useAppWrite from '../../lib/useAppwrite';
import { getAllHotels } from '../../lib/appwrite';
import DisplayCard from '../../components/DisplayCard';
import { Redirect, router } from 'expo-router';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Avatar from '../../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Home = () => {

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hotelsList, setHotelsList] = useState([])
  const [hotelSearchField, setHotelSearchField] = useState("")

  
    // const { data: movies, refetch } = useAppWrite(getAllHotels)

  function listAllHotels() {
        axios
            .post('http://192.168.186.1:5001/listAllHotels')
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

  function handleBackPress() {
    Alert.alert(
      'Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
        style: "exit"
      }
    ]
    );
    return true
  }

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }  
    })
    )
  useEffect(
    listAllHotels
  ,[])


  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full flex-row justify-between">
      <Avatar/>
        <TouchableOpacity
          className="p-2"
          onPress={() => { router.push('/add-hotel') }}
        >
          <Image
            source={icons.plus}
            className="w-8 h-8"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      <View className="w-full h-full pb-11">
        {/* <ActivityIndicator
          className="w-full h-full "
          size=''
          color='#161622'
          animating={isLoading}
        /> */}
              
        <View className="my-6 px-4 space-x-6 flex justify-center items-center">
          <View className="pb-7 pt-1">
            <Text className="text-3xl font-psemibold text-gray-100">Find Your Best Pick</Text>
          </View>
          <SearchInput
            placeholder="Search for a hotel..."
            value={hotelSearchField}
            handleChangeText={(e) => setHotelSearchField(e)}
            onQuery={() => {
              if (hotelSearchField=="") {
                return Alert.alert("Missing Query",
                  "Please input something to search results across the database")
              } else {
                
                router.push(`/hotel-search-result/?query=${hotelSearchField}`)
              }
            }}
          />
        </View>
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
    </SafeAreaView>
  )

};

export default Home;







// const [isLoading, setLoading] = useState(true);
// const [refreshing, setRefreshing] = useState(false)
// const [data, setData] = useState([]);
 
// const onRefresh = async () => {
//   setRefreshing(true);

//   setRefreshing(false)
// }

// const getAllHotels = async () => {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/Merrickal/RunTests/main/response.json');
//     const responseJson = await response.json();
//     setData(responseJson.movies.results);
//   } catch (error) {
//     console.error(error);
//   }
//   finally {
//     setLoading(false);
//     console.log(data);
//   }
// };
// useEffect(() => {
//   getAllHotels();
// }, [])




//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [endPoint, setEndPoint] = useState("")

//   const getHotels = async () => {
    // try {
    //   const response = await fetch('https://facebook.github.io/react-native/movies.json', {
    //     // method: 'GET',
    //     // headers: {
    //     // "x-rapidapi-host": "booking-com.p.rapidapi.com",
    //     // "x-rapidapi-key": "637e33a01dmsh0fbd1ac991820e0p115f75jsnd1d3a9ddb8d8",
    //     // }
    //   });
//       const responseJson = await response.json();
//       setData(responseJson.movies);
//       console.log(responseJson)
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getHotels();
//   }, []);

//   return (
//     <SafeAreaView className="h-full bg-primary">
//       <ScrollView>
//         <View className="w-full">
//           {isLoading ? (
//             <ActivityIndicator
//               className="w-full h-full"
//               size='large'
//               color='#161622'
//             />
//           ) : (

//             <View>
//               <Text className="text-xl text-center text-white text-semibold mt-10 font-psemibold">Start Over Here and Search for a Hotel</Text>
//               <Text className="text-lg text-center text-white text-semibold font-psemibold">Search For A Hotel</Text>
//               <FormField type='text' value={endPoint} onChange={(e) => { setEndPoint(e.target.value) }} />
//               <CustomButton title="Submit" className='bg-secondary rounded-xl min-h-[62px] justify-center items-center' containerStyles={"mt-3"} />
//             </View>

//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );


// export default class Home extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       dataSource: null,
//     }
//   }
//   componentDidMount() {
//     return fetch('https://facebook.github.io/react-native/movies.json')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState = {
//           isLoading: false,
//           dataSource: responseJson.movies,
//         }
//       })
//       .catch((error) => {
//         console.log(error)
//       });
//   }
//   render() {
//     if (this.state.isLoading) {
//       return (
//         < View >
//           <ActivityIndicator />
//         </View >
//       )
//     } else {
//       console.log("dsfsdfsd")
//       return (
//         <View>
//           <Text>API Loaded correctly</Text>
//         </View>
//       )
//     }
//   }
// }





// const Home = () => {

//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }

// export default Home