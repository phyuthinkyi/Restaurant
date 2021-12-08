import React from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from "../constants/colors";
import BottomTabComponent from "../components/BottomTabComponent";
import { ScrollView } from "react-native-gesture-handler";
const width = Dimensions.get('screen').width
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

const CartScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} title="Cart" iconName="menu" />
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={prodList}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={{
                                flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
                                padding: 16, marginTop: 15
                            }}>
                                <View style={{
                                    width: width / 4 + 10, height: width / 4 + 10, borderRadius: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={item.image} resizeMode="cover" style={{
                                        width: "100%", height: "100%",
                                        borderRadius: 10
                                    }} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={{ fontSize: 20, color: colors.darkGray, fontWeight: 'bold' }}>{item.prodName}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primaryColor }}>(Made in {item.madeIn})</Text>
                                    <Text style={{ marginTop: 15, fontSize: 16, color: colors.primaryColor }}>{item.price}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 10 }}>
                                        <Image source={require('../../assets/images/icons/minus.png')} style={{ width: 35, height: 35 }} />
                                        <Text style={{ marginHorizontal: 8 }}>1</Text>
                                        <Image source={require('../../assets/images/icons/plus.png')} style={{ width: 35, height: 35 }} />
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity style={{ marginVertical: 15, height: 50, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>Shopping</Text>
                        </TouchableOpacity>
                    }
                />


            </View>
            <BottomTabComponent navigation={navigation} screenName="Cart" />
        </SafeAreaView>
    )
}


export default CartScreen;