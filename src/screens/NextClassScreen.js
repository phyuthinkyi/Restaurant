import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

class NextClassScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      homeData: 'Data From Next Class'
    }
  }

  render() {
    console.log('Params...', this.props.route.params)

    return(
      <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Username is {this.props.route.params.username}</Text>
            <Text>Password is {this.props.route.params.pass}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeClass', {
              data: this.state.homeData
            })} style={{marginTop: 10, paddingHorizontal: 15, paddingVertical: 8, justifyContent: 'center', alignItems: 'center',  backgroundColor: colors.primaryColor, borderRadius: 5}}>
              <Text style={{color: colors.white, fontSize: 14}}>Back</Text>
          </TouchableOpacity>
          </View>
      </SafeAreaView>
    )
  }
}

export default NextClassScreen;