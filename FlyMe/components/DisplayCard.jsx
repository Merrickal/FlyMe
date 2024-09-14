import { View, Text } from 'react-native'
import React from 'react'

const DisplayCard = ({ display: { title, image } }) => {
    return (
        <View>
            <Text className="text-sm font-psemibold text-gray-100">{title}</Text>
        </View>
    )
}

export default DisplayCard