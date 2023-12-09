import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, GestureResponderEvent } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface DataItem {
  nome: string;
  titulo: string;
  imagem: string | null;
}

export default function App(): JSX.Element {
  const [nome, setNome] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [dadosCadastrados, setDadosCadastrados] = useState<DataItem[]>([]);

  const tirarFoto = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('É necessário permitir o acesso à câmera para selecionar uma imagem.');
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      const selectedAsset = pickerResult.assets[0];
      setImagem(selectedAsset.uri);
    }
  };

  const cadastro = (): void => {
    if (nome && titulo) {
      const newData: DataItem = { nome, titulo, imagem };
      setDadosCadastrados([...dadosCadastrados, newData]);
      setNome('');
      setTitulo('');
      setImagem(null); 
    }
  };

  const removerItem = (index: number): void => {
    const novosDados = [...dadosCadastrados];
    novosDados.splice(index, 1);
    setDadosCadastrados(novosDados);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.title}>FORUM ETEC</Text>

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
        <Text style={styles.label}>Título da publicação:</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={(text: string) => setTitulo(text)}
          placeholder="Digite o título"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={tirarFoto}>
        <Text style={styles.buttonText}>Escolher/Tirar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={cadastro}>
        <Text style={styles.buttonText}>Enviar Publicação</Text>
      </TouchableOpacity>

      <FlatList
        data={dadosCadastrados}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }): JSX.Element => (
          <View style={styles.itemContainer}>
            <View style={{ width: 300 }}>
              <Text style={styles.itemText}>Nome: {item.nome}</Text>
              <Text style={styles.itemText}>{item.titulo}</Text>
              {item.imagem && <Image source={{ uri: item.imagem }} style={styles.itemImage} />}
              <TouchableOpacity
                onPress={() => removerItem(index)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    color: 'black',
    fontSize: 30,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: 'black',
    fontSize: 18,
    width: 150,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  itemImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 80,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

