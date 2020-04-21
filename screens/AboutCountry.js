import React, {memo, useMemo} from 'react'
import {View, Text, useWindowDimensions, StyleSheet, ScrollView} from 'react-native'
import {LineChart, PieChart} from 'react-native-chart-kit'

const styles = StyleSheet.create({
    impText: {
        fontSize: 30,
        color: "#2d3436",
        fontWeight: "bold"
    },
    pieWrapper: {
        alignItems: "center",
    },
    confirmed: {
        fontSize: 15,
        color: "#e74c3c",
        marginBottom: 20
    }
})

function AboutCountry({route}) {
    const {width} = useWindowDimensions()
    const {name, recovered, deaths, confirmed, data: countryData} = useMemo(() => route.params, [route.params])
    const data = [
        {
            name: "Deaths",
            count: deaths,
            color: "#EA2027",
            legendFontColor: "#EA2027",
            legendFontSize: 10
        },
        {
            name: "Recovered",
            count: recovered,
            color: "#1abc9c",
            legendFontColor: "#1abc9c",
            legendFontSize: 10
        }
    ]
    const pieConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }
    return (
        <View style = {{width: 0.9*width, marginHorizontal: 0.05*width}}>
            <ScrollView showsVerticalScrollIndicator = {false} scrollEventThrottle = {2} contentContainerStyle = {{marginTop: 50}}>
                <Text style = {styles.impText}>
                    {name}
                </Text>
                <Text style = {styles.confirmed}>
                    Confirmed cases: {confirmed}
                </Text>
                <Text style = {styles.impText}>Recovered vs Confirmed</Text>
                <View style = {styles.pieWrapper}>
                    <PieChart 
                        width = {0.9*width}
                        height = {220}
                        data = {data}
                        accessor = "count"
                        chartConfig = {pieConfig}
                        backgroundColor = "transparent"
                        absolute
                    />
                </View>
                <Text style = {styles.impText}>Relevant graphs</Text>
                <ScrollView horizontal = {true} pagingEnabled = {true} scrollEventThrottle = {2} showsHorizontalScrollIndicator = {false} contentContainerStyle = {{alignItems: "center"}}>
                    <View style = {{width: 0.9*width, alignItems: "center", justifyContent: "center"}}>
                        <Text style = {{textAlign: "center", fontSize: 20}}>Confirmed cases over time</Text>
                        <LineChart
                            data={{
                            datasets: [
                                {
                                data: countryData.map(c => c.confirmed)
                                }
                            ]
                            }}
                            width={0.9*width} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig = {{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#f6e58d",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 10
                                },
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            }}
                            withDots = {false}
                            withInnerLines = {false}
                        />
                    </View>
                    <View style = {{width: 0.9*width, alignItems: "center", justifyContent: "center"}}>
                        <Text style = {{textAlign: "center", fontSize: 20}}>Number of deaths over time</Text>
                        <LineChart
                            data={{
                            datasets: [
                                {
                                data: countryData.map(c => c.deaths)
                                }
                            ]
                            }}
                            width={0.9*width} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig = {{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#eb4d4b",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 10,
                                    padding: 10
                                },
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                            withDots = {false}
                            withInnerLines = {false}
                        />
                    </View>
                    <View style = {{width: 0.9*width, alignItems: "center", justifyContent: "center"}}>
                        <Text style = {{textAlign: "center", fontSize: 20}}>
                            Recoveries over time
                        </Text>
                        <LineChart
                            data={{
                            datasets: [
                                {
                                data: countryData.map(c => c.recovered)
                                }
                            ]
                            }}
                            width={0.9*width} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig = {{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#6ab04c",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 10,
                                    padding: 10
                                },
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                            withDots = {false}
                            withInnerLines = {false}
                        />
                    </View>
                </ScrollView>
                {/* <ScrollView horizontal = {true} pagingEnabled = {true} scrollEventThrottle = {2}>
                    <View>
                        <Text>
                            Number of deaths over time
                        </Text>
                        <View>
                            <LineChart
                                data = {{
                                    datasets: [
                                        {
                                            data: countryData.map(c => c.deaths)
                                        }
                                    ]
                                }}
                                width = "100%"
                                height = {220}
                                chartConfig = {{
                                    backgroundColor: "#eb2f06",
                                    backgroundGradientFrom: "#e55039",
                                    backgroundGradientTo: "#fa983a",
                                    strokeWidth: 2,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>
                            Number of recoveries over time
                        </Text>
                        <View>
                            <LineChart
                                data = {{
                                    datasets: [
                                        {
                                            data: countryData.map(c => c.recovered)
                                        }
                                    ]
                                }}
                                width = "100%"
                                height = {220}
                                chartConfig = {{
                                    backgroundColor: "#78e08f",
                                    backgroundGradientFrom: "#60a3bc",
                                    backgroundGradientTo: "#b8e994",
                                    strokeWidth: 2,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>
                            Number of confirmed cases over time
                        </Text>
                        
                    </View>
                </ScrollView> */}
            </ScrollView>
        </View>
    )
}

export default memo(AboutCountry)