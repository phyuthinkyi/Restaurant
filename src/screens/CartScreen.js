import React from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import colors from "../constants/colors";
import BottomTabComponent from "../components/BottomTabComponent";
import { useDispatch, useSelector} from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartAction from "../store/actions/cart";
import qtyAction from "../store/actions/qty";
const width = Dimensions.get('screen').width


const CartScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.Cart)
    const dispatch =  useDispatch()
  //  console.log("Cart Screen Products...", products)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} title="Cart" iconName="menu" />
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={products}
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
                                    <Image source={{uri: item.imgUrl}} resizeMode="cover" style={{
                                        width: "100%", height: "100%",
                                        borderRadius: 10
                                    }} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={{ fontSize: 20, color: colors.darkGray, fontWeight: 'bold' }}>{item.productName}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primaryColor }}>(Made in Myanmar)</Text>
                                    <Text style={{ marginTop: 15, fontSize: 16, color: colors.primaryColor }}>{item.price}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 10 }}>
                                        <Image source={require('../../assets/images/icons/minus.png')} style={{ width: 35, height: 35 }} />
                                        <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                                        <Image source={require('../../assets/images/icons/plus.png')} style={{ width: 35, height: 35 }} />
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.removeItem('cart')
                            dispatch(cartAction.addToCart([]))
                            AsyncStorage.removeItem('cartQty')
                            dispatch(qtyAction.setTotalQty(0))
                        }} style={{ marginVertical: 15, height: 50, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
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