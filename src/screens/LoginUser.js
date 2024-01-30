import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../redux/user/slice';

function LoginUser(props) {
  const [name, setName] = useState('Temporário');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {currentUser} = useSelector((state: RootState) => state.root);
  dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({email, password}));
    props.navigation.navigate('User');
  };

  const userRegister = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoFocus={true}
        keyboardType="email-address"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={userLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={userRegister}>
        <Text style={styles.buttonText}>Criar nova conta...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#eee',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
});

export default LoginUser;
