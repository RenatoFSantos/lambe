import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import icon from '../assets/imgs/icon.png';
import {Gravatar} from 'react-native-gravatar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login, logout} from '../redux/user/slice';

class Header extends Component {
  render() {
    const gravatar = (
      <Gravatar
        options={{email: this.props.email, secure: true}}
        style={styles.avatar}
      />
    );
    // const gravatar = this.props.userApp.currentUser?.email ? (
    //   <Gravatar
    //     options={{email: this.props.userApp.currentUser?.email, secure: true}}
    //     style={styles.avatar}
    //   />
    // ) : null;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={icon} style={styles.image} />
          <Text style={styles.title}>Lambe Lambe</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.user}>{this.props.name || 'Anonymous'}</Text>
          {gravatar}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontSize: 10,
    color: '#888',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#000',
    fontFamily: 'shelter',
    fontSize: 30,
    height: 30,
  },
});

const mapStateToProps = state => ({
  name: state.root.currentUser.name,
  email: state.root.currentUser.email,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({login, logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
