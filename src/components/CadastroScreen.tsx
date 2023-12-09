import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CadastroProps {
  navigation: any; 
}

export default function CadastroScreen({ navigation }: CadastroProps): JSX.Element {
  const [nome, setNome] = useState<string>('');
  const [curso, setCurso] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const handleCadastro = async (): Promise<void> => {
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }
  
    try {
      
      const usuario = { nome, curso, senha };
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuario));
      alert('Usuario cadastrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(text: string) => setNome(text)}
          placeholder="Digite seu nome"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Curso:</Text>
        <TextInput
          style={styles.input}
          value={curso}
          onChangeText={(text: string) => setCurso(text)}
          placeholder="Digite seu curso"
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={(text: string) => setConfirmarSenha(text)}
          placeholder="Confirme sua senha"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
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
  cadastroButton: {
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

export { CadastroScreen };
