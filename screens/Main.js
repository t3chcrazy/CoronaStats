import React, {useState, useEffect, useRef} from 'react'
import {View, Text, ActivityIndicator, StyleSheet, FlatList, Picker, TextInput, Switch, useWindowDimensions} from 'react-native'
import CountryStat from '../components/CountryStat'
import _ from 'lodash'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center"
    },
    loading: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    headerText: {
        fontSize: 30,
        color: "#00b894"
    },
    searchBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 2,
    },
    picker: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth
    },
    filter: {
        paddingBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    countryList: {
        flex: 5
    },
    processView: {
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
        width: "100%",
        height: "100%",
        display: "none"
    }
})

function Main({navigation}) {
    const prevFilter = useRef()
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState([])
    const [show, setShow] = useState([])
    const [pickValue, setPickValue] = useState("name")
    const [isAsc, setAsc] = useState(true)
    const [filter, setFilter] = useState("")
    const {width: windowWidth} = useWindowDimensions()
    
    useEffect(() => {
        fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            let dat = Object.entries(data)
            setResponse(dat)
            setShow(dat)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        prevFilter.current = filter
        let newshow = response.filter(r => r[0].toLowerCase().includes(filter.toLowerCase()))
        if (pickValue === "deaths") {
            newshow = _.sortBy(newshow, function(o) {
                return _.last(o[1]).deaths
            })
            if (!isAsc) {
                newshow = _.reverse(newshow)
            }
        }
        else {
            newshow = _.sortBy(newshow, function(o) {
                return o[0]
            })
            if (!isAsc) {
                newshow = _.reverse(newshow)
            }
        }
        setShow(newshow)
    }, [filter, isAsc, pickValue])

    const renderCountry = ({item}) => <CountryStat name = {item[0]} stats = {item[1]} />
    
    const optimizeLayout = (data, index) => (
        {length: 70, offset: 70*index, index}
    )

    return (
        <View style = {styles.root}>
            <View style = {{display: loading? "flex": "none", justifyContent: "center", alignItems: "center"}}>
                <Text>Fetching data...</Text>
                <ActivityIndicator size = "large" color = "#00b894" />
            </View>
            <View style = {{display: loading? "none": "flex", ...styles.container, width: 0.9*windowWidth, marginHorizontal: 0.05*windowWidth}}>
                <View style = {styles.header}>
                    <Text style = {styles.headerText}>Corona Stats</Text>
                </View>
                <View style = {styles.filter}>
                    <View style = {{flexDirection: "row", alignItems: "center"}}>
                        <TextInput placeholder = "Filter by country name" style = {styles.searchBar} value = {filter} onChangeText = {text => setFilter(text)}  />
                        <Picker
                            selectedValue = {pickValue}
                            style = {styles.picker}
                            onValueChange = {(val, i) => setPickValue(val)}
                            mode = "dropdown"
                        >
                            <Picker.Item label = "Name" value = "name" />
                            <Picker.Item label = "Deaths" value = "deaths" />
                        </Picker>
                    </View>
                    <View style = {{flexDirection: "row"}}>
                        <Text>
                            Ascending?
                        </Text>
                        <Switch 
                            trackColor = {{false: "#767577", true: "#00b894"}}
                            thumbColor = {isAsc? "#f4f3f4": "#00b894"}
                            ios_backgroundColor = "#3e3e3e"
                            onValueChange = {() => setAsc(prev => !prev)}
                            value = {isAsc}
                        />
                    </View>
                </View>
                <FlatList 
                    keyExtractor = {item => item[0]}
                    renderItem = {renderCountry}
                    data = {show}
                    extraData = {filter}
                    initialNumToRender = {20}
                    getItemLayout = {optimizeLayout}
                />
            </View>
        </View>
    )
}

export default Main