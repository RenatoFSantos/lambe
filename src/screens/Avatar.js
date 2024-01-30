import React, {useState, useCallback} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import {ImagePickerHeader} from '../components/image-picker-header';
import {ImagePickerModal} from '../components/image-picker-modal';
import {ImagePickerAvatar} from '../components/image-picker-avatar';

export default function Avatar() {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Permissão de Câmera',
        message: 'O App precisa de acesso à câmera.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      };
      ImagePicker.launchCamera(options, setPickerResponse);
    } else {
      alert('Permissão de Câmera negada');
    }
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      title: 'Selecione seu Avatar',
      customButtons: [{name: 'avatar', title: 'Selecione seu Avatar'}],
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  // const onCameraPress = useCallback(() => {
  //   const options = {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //     quality: 0.8,
  //     includeBase64: false,
  //   };
  //   ImagePicker.launchCamera(options, setPickerResponse);
  // }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <View style={styles.screen}>
      <ImagePickerHeader title="Profile" />
      <ImagePickerAvatar
        uri={uri}
        onPress={() => setVisible(true)}
        name="Nome"
      />
      <ImagePickerModal
        isVisible={visible}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={requestCameraPermission}
        onExit={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2fC',
  },
});
