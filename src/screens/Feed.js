import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';
import {connect} from 'react-redux';

class Feed extends Component {
  render() {
    console.log(`Feed: name: ${this.props.name} email: ${this.props.email}`);
    console.log(`Feed Props: ${this.props.posts.length}`);

    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Post key={item.id} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = state => ({
  posts: state.postReducer.posts,
  name: state.root.currentUser.name || 'Sem nome',
  email: state.root.currentUser.email,
});

export default connect(mapStateToProps)(Feed);
