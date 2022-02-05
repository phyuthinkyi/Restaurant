import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import colors from '../constants/colors';

class HomeClassScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      pass: '',
    }
  }

  goToNextClass = () => {
    console.log('Username is..', this.state.username, ' and password is', this.state.pass)
    this.props.navigation.navigate('NextClass', {
      username: this.state.username,
      pass: this.state.pass
    })
  }

  render() {
    console.log('Next Class params..', this.props.route.params)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 18, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            <TextInput
              value={this.state.username}
              style={{ height: 50, borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 5, paddingLeft: 10, }}
              placeholder="username"
              onChangeText={text => this.setState({
                username: text
              })}
            />
            <TextInput
              value={this.state.pass}
              style={{ marginTop: 10, height: 50, borderWidth: 1, borderColor: colors.primaryColor, borderRadius: 5, paddingLeft: 10 }}
              placeholder="password"
              onChangeText={text => this.setState({
                pass: text
              })}
            />

            <TouchableOpacity onPress={() => this.goToNextClass()} style={{
              marginTop: 10, height: 50, borderRadius: 5, justifyContent: 'center',
              alignItems: 'center', backgroundColor: colors.primaryColor
            }}>
              <Text style={{ fontWeight: 'bold', color: colors.white }}>Login</Text>
            </TouchableOpacity>

            <Text>{this.props.route.params?.data}</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default HomeClassScreen

