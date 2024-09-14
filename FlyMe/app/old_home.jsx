import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View ,Image, RefreshControl, BackHandler, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import SearchInput from '../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Trending from '../components/Trending';
import { icons, images } from '../constants';
import useAppWrite from '../lib/useAppwrite';
import { getAllHotels } from '../lib/appwrite';
import DisplayCard from '../components/DisplayCard';
import { Redirect, router } from 'expo-router';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Avatar from '../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Home = () => {

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  
  const { data: movies ,refetch} = useAppWrite(getAllHotels)

  const emptyImage = images.empty;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }
  //console.log(movies)

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

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <Avatar/>
      <View className="w-full">
        {/* <ActivityIndicator
          className="w-full h-full "
          size=''
          color='#161622'
          animating={isLoading}
        /> */}
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
              <View className="pb-7 pt-1">
                <Text className="text-3xl font-psemibold text-gray-100">Find Your Best Pick</Text>
              </View>
              <SearchInput
                placeholder="Search for a hotel.."
              />
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