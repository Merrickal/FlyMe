import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, onQuery, ...props }) => {


    return (
        <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ">
            <TextInput
                className="flex-1 mt-0.5 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
            />
            <TouchableOpacity
                onPress={onQuery}
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput