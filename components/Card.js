import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-ionicons'

function Card({width, height, text, icon}) {
    return (
        <View style = {{width: width, height: height, backgroundColor: "red", justifyContent: "center"}}>
            <View style = {{flex: 1, backgroundColor: "yellow", justifyContent: "center", alignItems: "center"}}>
                <Icon style = {{color: "white"}} name = {icon} />
            </View>
            <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style = {{color: "white", fontSize: 20}}>{text}</Text>
            </View>
        </View>
    )
}

export default Card