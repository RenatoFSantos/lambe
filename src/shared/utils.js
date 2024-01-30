import {PermissionsAndroid} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

function PermissionCamera() {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'App Permissão de Câmera',
    message: 'O App precisa de acesso à câmera.',
    buttonNeutral: 'Pergunte-me depois',
    buttonNegative: 'Cancelar',
    buttonPositive: 'OK',
  });
}

function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

export {PermissionCamera, getRandomArbitrary};
