import React, {Component} from 'react';
import Header from './src/components/Header';
import {View} from 'react-native';
import Post from './src/components/Post';

export default class Home extends Component {
  render() {
    const comments = [
      {
        nickname: 'Joana Elena Silva',
        comment: 'Excelente foto!!!',
      },
      {
        nickname: 'Rafael Gustavo Pereira',
        comment: 'Muito ruim! Faço melhor...',
      },
    ];
    return (
      <View>
        <Header />
        <Post
          image={require('./src/assets/imgs/fence.jpg')}
          comments={comments}
        />
      </View>
    );
  }
}
