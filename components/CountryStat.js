import React, { memo, useMemo } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        marginVertical: 4,
        padding: 10,
        elevation: 2,
        height: 70
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

const CountryStat = memo(({name, stats}) => {
    const navigation = useNavigation()
    const {deaths, recovered, confirmed} = useMemo(() => stats[stats.length-1], [stats])
    const handlePress = () => {
        requestAnimationFrame(() => {
            navigation.navigate("About", {data: stats, name: name, deaths: deaths, recovered: recovered, confirmed: confirmed})
        })
    }
    return (
        <TouchableOpacity onPress = {handlePress}>
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
        </TouchableOpacity>
    )
})

export default CountryStat