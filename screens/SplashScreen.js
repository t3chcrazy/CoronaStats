import React, {useState, useEffect, useRef} from 'react'
import {View, Text, ScrollView, StyleSheet, useWindowDimensions} from 'react-native'
import { API_KEY, HOST } from 'react-native-dotenv'
import Card from '../components/Card'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#27ae60",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
})

const CARD_DATA = [
    {
        id: "1",
        title: "Wash your hands",
        icon: "hand-left-outline"
    },
    {
        id: "2",
        title: "Practice social distancing",
        icon: "person-circle-outline"
    },
    {
        id: "3",
        title: "Stay safe",
        icon: "happy-outline"
    }
]

function SplashScreen({navigation}) {
    const {width, height} = useWindowDimensions()
    const [page, setPage] = useState(0)
    const scrollref = useRef()
    useEffect(() => {
        setInterval(() => {
            console.log("I am called multiple times with page value", page)
            if (page === CARD_DATA.length) {
                setPage(0)
            }
            else {
                setPage(page+1)
            }
        }, 4000)
        // fetch("https://covid-193.p.rapidapi.com/countries", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": HOST,
        //         "x-rapidapi-key": API_KEY
        //     }
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
    }, [])
    useEffect(() => {
        console.log("Page value", page)
        scrollref.current.scrollTo({x: page*(width/2), animated: true})
    }, [page])
    return (
        <View style = {styles.root}>
            <Text style = {{fontSize: 40, color: "blue"}}>
                Coronavirus Stats
            </Text>
            <View style = {{width: width/2, height: height/2}}>
                <ScrollView pagingEnabled ref = {scrollref} horizontal = {true} scrollEventThrottle = {20}>
                    {CARD_DATA.map(c => <Card key = {c.id} width = {width/2} height = {height/2} text = {c.title} icon = {c.icon} />)}
                </ScrollView>
            </View>
        </View>
    )
}

export default SplashScreen