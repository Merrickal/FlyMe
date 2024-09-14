
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-web';
import axios from 'axios';
import { Link } from 'expo-router';




// return <>
//   {selectedImage && <Image source={{ uri: selectedImage }} style={uploadPhotoStyles.image} />}
//   <TouchableOpacity style={uploadPhotoStyles.container} onPress={pickImageAsync} >
//     <Text>+</Text>
//   </TouchableOpacity>
// </>

// const uploadPhotoStyles = StyleSheet.create({
//   container: {
//     height: 56,
//     width: 56,
//     borderRadius: 28,
//     backgroundColor: 'lightblue',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     elevation: 2,
//     marginBottom: 16
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginBottom: 16,
//     borderRadius: 50
//   }
// })

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [achraf, setAchraf] = useState('')
  const pickImageAsync = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(selectedImage);
  };
  const createFormData = (uri) => {
    if (!uri) {
      console.error('URI is undefined');
      return null;
    }

    const fileName = uri.split('/').pop();
    if (!fileName) {
      console.error('Unable to extract file name from URI');
      return null;
    }

    const fileType = fileName.split('.').pop();
    if (!fileType) {
      console.error('Unable to extract file type from file name');
      return null;
    }

    const formData = new FormData();
    formData.append('image', {
      name: fileName,
      uri,
      type: `image/${fileType}`,
    });
    return formData;
  };
  const postImage = async (uri) => {
    try {
      if (!uri) {
        console.error('No image selected');
        return;
      }
      const data = createFormData(uri);
      if (!data) {
        console.error('Failed to create form data');
        return;
      }
      console.log('Uploading image:', uri); // Log the URI being uploaded
      const res = await axios.post('http://192.168.186.1:5001/images', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', res.data);
      return res.data.imageName;
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
    }
  };


  useEffect(() => {
    // console.log(selectedImage)
    setAchraf(selectedImage)

    // console.log(achraf);

  }, [selectedImage])
  return (
    <SafeAreaView className="h-full w-full  bg-black-100">
      <View className="w-full h-full justify-center items-center">
        {/* <UploadImage className="border-4 border-pink-400" /> */}
        <TouchableOpacity
          onPress={pickImageAsync}
          className="w-[250px] h-[250px] rounded-full border border-white mt-10 justify-center items-center border-dashed overflow-hidden">
          {selectedImage ? <Image source={{ uri: selectedImage }} className="w-full h-full" /> :
            <View className="justify-center items-center">
              <Text className="text-xl text-gray-100">Upload photo</Text>
              <Text className="text-xl text-gray-100">+</Text>
            </View>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (achraf) {
              postImage(achraf);
            } else {
              console.log('No image selected');
            }
          }}
        >
          <Text className="text-xl text-gray-100">Upload Image</Text>
        </TouchableOpacity>
        <View className="justify-center pt-5 flex-row gap-2">
          <Link
            className='text-lg font-psemibold text-secondary'
            href={"/zarbiya"}>Preview</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

