import {createSlice} from '@reduxjs/toolkit';
import {getRandomArbitrary} from '../../shared/utils';
import axios from 'axios';

const initialState = {
  posts: [
    {
      id: getRandomArbitrary(1, 100),
      nickname: 'Rafael Pereira Filho',
      email: 'rafaelprrflh@gmail.com',
      image: {
        uri: require('../../assets/imgs/fence.jpg'),
        base64: null,
      },
      comments: [
        {
          nickname: 'John Ray Sheldon',
          comment: 'Stunning',
        },
        {
          nickname: 'Ana Julia Arruda',
          comment: 'Foto linda! Onde foi tirada?',
        },
      ],
    },
    {
      id: getRandomArbitrary(1, 100),
      nickname: 'Francisco Leando Lima',
      email: 'fllima@gmail.com',
      image: {
        uri: require('../../assets/imgs/bw.jpg'),
        base64: null,
      },
      comments: [],
    },
    {
      id: getRandomArbitrary(1, 100),
      nickname: 'Leonardo Moura Leitão',
      email: 'leo@gmail.com',
      image: {
        uri: require('../../assets/imgs/boat.jpg'),
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
      },
      comments: [
        {
          nickname: 'Ana Julia Arruda',
          comment: 'Foto linda! Onde foi tirada?',
        },
      ],
    },
  ],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      // no firebase é obrigatório as urls terminarem com .json
      dispatch => {
        axios
          .post('/posts.json', {...action.payload})
          .catch(err => console.log(err))
          .then(res => console.log(res.data));
      };
      // state = [{...state, posts: state.posts.push({...action.payload})}];
    },
    addComment: (state, action) => {
      state = [
        {
          ...state,
          posts: state.posts.map(post => {
            if (post.id === action.payload.postId) {
              if (post.comments) {
                post.comments = post.comments.concat(action.payload.comment);
              } else {
                post.comments = [action.payload.comment];
              }
            }
          }),
        },
      ];
      // state.comments = {post.comments};
    },
  },
});

export const {addPost, addComment} = postSlice.actions;

export default postSlice.reducer;
