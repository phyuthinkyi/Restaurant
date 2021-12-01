import React from "react";
import { SafeAreaView, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import HeraderComponent from "../components/HeaderComponent";
import BottomTabComponent from "../components/BottomTabComponent";
import colors from "../constants/colors";

const width = Dimensions.get('screen').width
const arrList  = ['arr1', 'arr2', 'arr3'];
const prodList = [
    {
        prodName: 'Pumpkin Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Myanmar',
        price: '1500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Vegetable Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Thailand',
        price: '2500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Pumpkin Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Myanmar',
        price: '1500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Vegetable Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Thailand',
        price: '2500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Pumpkin Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Myanmar',
        price: '1500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Vegetable Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Thailand',
        price: '2500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Pumpkin Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Myanmar',
        price: '1500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    },
    {
        prodName: 'Vegetable Soup',
        image: require('../../assets/images/profile.jpeg'),
        madeIn: 'Thailand',
        price: '2500 MMK',
        arr: ['arr1', 'arr2', 'arr3']
    }
]

const HomeScreen = ({ navigation, route }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeraderComponent navigation={navigation} title="Home" iconName="menu" />
            <View style={{flex: 1, padding: 18 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primaryColor }}>Popular Items</Text>
                <FlatList
                    data={prodList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {
                                SArr: prodList,
                                product: item
                            })} key={index} style={{
                                flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
                                padding: 16, marginTop: 15
                            }}>
                                <View style={{
                                    width: width / 4 + 10, height: width / 4 + 10, borderRadius: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={item.image} resizeMode="cover" style={{ width: "100%", height: "100%", 
                                    borderRadius: 10 }} />
                                </View>
                                <View style={{flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, color: colors.darkGray, fontWeight: 'bold' }}>{item.prodName}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primaryColor }}>(Made in {item.madeIn})</Text>
                                    <Text style={{ marginTop: 15, fontSize: 16, color: colors.primaryColor }}>{item.price}</Text>
                                </View>
                                <View style={{
                                    borderTopLeftRadius: 10, borderBottomRightRadius: 10, paddingVertical: 8,
                                    paddingHorizontal: 25, position: 'absolute', bottom: 0, right: 0, 
                                    backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{ color: colors.white, fontSize: 14, fontWeight: 'bold' }}>Buy</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />

            </View>
            <BottomTabComponent navigation={navigation} screenName="Home" />
        </SafeAreaView>
    )
}


export default HomeScreen;