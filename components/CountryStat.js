import React, { memo } from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        marginVertical: 4,
        padding: 10,
        elevation: 2
    },
    name: {
        flex: 4,
        overflow: "scroll"
    },
    stats: {
        flex: 2,
        alignItems: "center"
    }
})

const CountryStat = memo(({route, navigation, name, deaths, recovered, date}) => {
    return (
        <View style = {styles.root}>
            <View style = {styles.name}>
                <Text style = {{fontSize: 25}}>
                    {name}
                </Text>
            </View>
            <View style = {styles.stats}>
                <Text style = {{color: "red"}}>{deaths} dead</Text>
                <Text style = {{color: "green"}}>{recovered} recovered</Text>
            </View>
        </View>
    )
})

export default CountryStat