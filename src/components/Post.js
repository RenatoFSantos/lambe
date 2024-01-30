import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import {connect} from 'react-redux';

class Post extends Component {
  render() {
    const addComment = this.props.name ? (
      <AddComment postId={this.props.id} />
    ) : null;
    console.log('Item =', this.props.email);
    return (
      <View style={styles.container}>
        <Image
          source={
            this.props.image?.base64
              ? {
                  uri: this.props.image.base64,
                }
              : this.props.image?.uri === null
              ? require('../assets/imgs/boat.jpg')
              : this.props.image?.uri
          }
          style={styles.image}
        />
        <Author email={this.props.email} nickname={this.props.nickname} />
        <Comments comments={this.props.comments} />
        {addComment}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width * 3) / 4,
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => ({
  name: state.root.currentUser.name || 'Sem nome',
});

export default connect(mapStateToProps)(Post);
