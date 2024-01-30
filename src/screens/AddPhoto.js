import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionCamera} from '../shared/utils';
import {ImagePickerModal} from '../components/image-picker-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addPost} from '../redux/post/slice';
import {getRandomArbitrary} from '../shared/utils';

const includeExtra = true;
const initialBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';
const noUser = 'Você precisa estar logado para adicionar imagem!';

class AddPhoto extends Component {
  state = {
    image: {
      uri: 'https://reactnative.dev/img/tiny_logo.png',
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    },
    comment: '',
    response: null,
    visible: false,
  };

  flagVisible;

  onImageLibraryPress = () => {
    const options = {
      title: 'Selecione seu Avatar',
      customButtons: [{name: 'avatar', title: 'Selecione seu Avatar'}],
      maxWidth: 400,
      maxHeight: 250,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, res => {
      if (!res.didCancel) {
        this.setState({
          image: {
            uri: res.assets[0].uri,
            base64: `data:image/png;base64,${res.assets[0].base64}`,
          },
        });
      }
    });
  };

  onPickImage = async () => {
    if (!this.props.name) {
      Alert.alert('Falha!', noUser);
      return;
    }
    res = await PermissionCamera();
    if (res === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        maxWidth: 400,
        maxHeight: 250,
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra,
      };
      ImagePicker.launchCamera(options, res => {
        if (!res.didCancel) {
          this.setState({
            image: {
              uri: res.assets[0].uri,
              base64: `data:image/png;base64,${res.assets[0].base64}`,
            },
          });
        }
      });
    } else {
      alert('Permissão de Câmera negada');
    }
  };

  save = async () => {
    // if (!this.props.name) {
    //   Alert.alert('Falha!', noUser);
    //   return;
    // }
    this.props.onAddPost({
      id: getRandomArbitrary(1, 100),
      nickname: this.props.name,
      email: this.props.email,
      image: {uri: this.state.image?.uri, base64: this.state.image?.base64},
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment,
        },
      ],
    });
    this.setState({image: {base64: initialBase64}, comment: ''});
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image
              // source={require('../assets/imgs/gate.jpg')}
              // source={{
              //   uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              // }}
              source={{uri: this.state.image?.base64}}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={styles.buttom}
            onPress={() => this.setState({visible: true})}>
            <Text style={styles.buttonText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Algum comentário para a foto"
            style={styles.input}
            value={this.state.comment}
            // editable={this.props.name != null}
            onChangeText={comment => this.setState({comment: comment})}
          />
          <TouchableOpacity style={styles.buttom} onPress={this.save}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <ImagePickerModal
            isVisible={this.state.visible}
            onImageLibraryPress={this.onImageLibraryPress}
            onCameraPress={this.onPickImage}
            onExit={() => this.setState({visible: false})}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    justifyContent: 'center',
    height: Dimensions.get('window').width / 2,
    backgroundColor: 'red',
    margin: 5,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#042940',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#042940',
  },
  input: {
    marginTop: 20,
    width: '90%',
  },
});

const mapStateToProps = state => ({
  name: state.root.currentUser.name,
  email: state.root.currentUser.email,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({onAddPost: addPost}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);
