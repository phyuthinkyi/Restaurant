import React from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native'

const HeaderComponent = ({ navigation, title, iconName, parentScreenName }) => {
 // console.log("Icon Name", iconName, 'and Navigation Route..', navigation, 'and pre screen', preScreen)
  return (
    <View style={styles.headerContainer}>
      {
        iconName == "menu" ?
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.headerIcon}
              source={require('../../assets/images/icons/menu.png')} />
          </TouchableOpacity> :
          <TouchableOpacity onPress={() => {
            navigation.navigate(parentScreenName)
          }}>
            <Image style={styles.headerIcon}
              source={require('../../assets/images/icons/back.png')} />
          </TouchableOpacity>
      }
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS == 'ios' ? 0 : 24, height: 50, backgroundColor: 'white',
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18
  },
  headerIcon: { width: 25, height: 25, tintColor: '#C95227' },
  headerTitle: { fontSize: 16, color: '#C95227', marginLeft: 10 }
})

export default HeaderComponent