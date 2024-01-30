import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import {images} from '../assets/imgs';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login, logout} from '../redux/user/slice';

class Profile extends Component {
  logout = () => {
    // this.props.logout();
    this.props.navigation.navigate('Home');
  };

  render() {
    const user = {
      name: this.props.userApp.name || 'Temporário',
      email: this.props.userApp.email,
    };
    const options = {
      email: this.props.userApp.email,
      secure: true,
    };
    return (
      <View style={styles.container}>
        <View>
          <Gravatar style={styles.avatar} options={options} />
          <TouchableOpacity style={styles.plus}>
            <Image style={styles.addButtonIcon} source={images.addButton} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nickname}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity style={styles.buttom} onPress={this.logout}>
          <Text style={styles.buttomText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 100,
  },
  plus: {
    height: 34,
    width: 34,
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  addButtonIcon: {
    height: 34,
    width: 34,
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 20,
    fontSize: 25,
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttomText: {
    fontSize: 20,
    color: '#fff',
  },
});

const mapStateToProps = state => ({userApp: state.root.currentUser});
const mapDispatchToProps = dispatch =>
  bindActionCreators({login, logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
