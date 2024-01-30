import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login, logout} from '../redux/user/slice';
import {addComment} from '../redux/post/slice';

class AddComment extends Component {
  state = {
    comment: '',
    editMode: false,
  };

  handleAddComment = () => {
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name || 'Sem nome',
        comment: this.state.comment,
      },
    });

    this.setState({comment: '', editMode: false});
  };

  render() {
    let commentArea = null;
    if (this.state.editMode) {
      commentArea = (
        <View style={styles.container}>
          <TextInput
            placeholder="Seu comentário..."
            style={styles.input}
            autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({comment: comment})}
            onSubmitEditing={this.handleAddComment}
          />
          <TouchableWithoutFeedback
            onPress={() => this.setState({editMode: false})}>
            <Icon name="times" size={15} color="#555" />
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      commentArea = (
        <TouchableWithoutFeedback
          onPress={() => this.setState({editMode: true})}>
          <View style={styles.container}>
            <Icon style={styles.icon} name="comment-o" size={25} color="#555" />
            <Text style={styles.caption}>Adicione um comentário...</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return <View>{commentArea}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#CCC',
  },
  input: {
    width: '90%',
  },
  icon: {
    marginLeft: 10,
  },
});

const mapStateToProps = state => ({name: state.root.currentUser.name});

const mapDispatchToProps = dispatch =>
  bindActionCreators({onAddComment: addComment}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
