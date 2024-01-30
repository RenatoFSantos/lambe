import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function ImagePickerHeader(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        {/* <View style={styles.ico}>
          <Icon.Button
            name="arrow-left"
            size={20}
            color="#fff"
            backgroundColor="#62d1bc"
            onPress={retorno}
          />
        </View> */}
        <View style={styles.title}>
          <Text style={styles.topBarTitleText}>{props.title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#62d1bc',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
  },
  ico: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
  },
  topBarTitleText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
