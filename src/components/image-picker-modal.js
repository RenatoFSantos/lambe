import React from 'react';
import {
  SafeAreaView,
  View,
  Modal,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import {images} from '../assets/imgs';
import Icon from 'react-native-vector-icons/FontAwesome';

export function ImagePickerModal({
  isVisible,
  onImageLibraryPress,
  onCameraPress,
  onExit,
}) {
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.outerView}>
        <SafeAreaView style={styles.buttons}>
          <Pressable style={styles.button} onPress={onImageLibraryPress}>
            <Image style={styles.buttonIcon} source={images.image} />
            <Text style={styles.buttonText}>Library</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onExit}>
            <Icon
              style={styles.buttonIcon}
              name="chevron-down"
              size={20}
              color="green"
            />
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onCameraPress}>
            <Image style={styles.buttonIcon} source={images.camera} />
            <Text style={styles.buttonText}>Camera</Text>
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
