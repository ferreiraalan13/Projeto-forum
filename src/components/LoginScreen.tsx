import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginProps {
  navigation: any; 
}

export default function LoginScreen({ navigation }: LoginProps): JSX.Element {
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    try {
      const usuarios = await AsyncStorage.getItem('usuarios');
      if (usuarios !== null) {
        const usuarioSalvo = JSON.parse(usuarios);
        if (usuarioSalvo.nome === usuario && usuarioSalvo.senha === senha) {
          navigation.navigate('Postagem');
          
          return;
        }
      }
  
      alert('Usuário ou senha incorretos');
      
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      
    }
  };

  const handleCadastro = (): void => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 56, fontWeight: 'bold' }}>ConnectEtec</Text>
      <Text style={styles.title}>Entre no sistema</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário:</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={(text: string) => setUsuario(text)}
          placeholder="Digite seu usuário"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={(text: string) => setSenha(text)}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export { LoginScreen };
