import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, icon }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center flex-row ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
            icon={icon}

        >
            {icon != null && (
                <Image
                    source={icon}
                    className="w-6 h-6 mx-3"
                    resizeMode='contain'
                />
            )}
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity >
    )
}

export default CustomButton