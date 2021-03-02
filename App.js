import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList
} from 'react-native';

import { useFonts } from 'expo-font';
import ToDo from './ToDo.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");


  const setTodosFromStorage = (todos_string) => {
    setTodos(JSON.parse(todos_string));
  }

  const storeTodos = async (newValue) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newValue))
    } catch (e) {
      console.error(e)
    }
  }

  const readTodos = async () => {
    try {
      const storage_todos = await AsyncStorage.getItem('todos');
      if (storage_todos !== null) {
        setTodosFromStorage(storage_todos);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /* What should the callback function and dependency values here?
  useEffect(() => {
  })
  */

  // store todos
  const addTodo = () => {
    const newTodos = [...todos, text];
    setTodos(newTodos);
    setText("");
  }

  // update todos
  const deleteToDo = (index) => {
    // In this case, the callback function doesn't need access to child component data
    // Rather, an action in the child component will trigger a state update in the parent component
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const renderToDo = ({ index, item }) => {
    // ToDo component was imported from ToDo.js, shown in the import functions
    // 1 - pass in deleteToDo function as a prop to the ToDo component
    return <ToDo text={item} deleteToDo={() => deleteToDo(index)} />;
  };

  const [loaded] = useFonts({
    Montserrat: require('./Montserrat.ttf')
  });

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.flatlist}>

        <FlatList
          data={todos}
          renderItem={renderToDo}
          keyExtractor={(item, index) => {
            return item + index.toString()
          }}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textinput}
          onChangeText={text => setText(text)}
          value={text}
        />
        <Button
          style={styles.button}
          title="Add"
          onPress={addTodo}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%'
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat',
  },
  button: {
    height: 40,
    width: '20%',
    borderColor: 'gray',
    borderWidth: 1
  }
});
