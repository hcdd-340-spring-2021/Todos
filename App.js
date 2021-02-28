import React, { useState } from 'react';
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

export default function App() {

  // Make Todo items deletable by clicking on the button

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const [loaded, error] = useFonts({ 
    Montserrat: require('./Montserrat.ttf')
  });

  // trying to render is futile if the font is not loaded
  if (!loaded){
    return null;
  }



  const addTodo = () => {
    setTodos([...todos, text]);
    setText("");
  }

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
          onChangeText={text => setText(text)} /*What method should be called here? */
          value={text} /*What should be in place of the empty string? */
        />
        <Button
          style={styles.button}
          title="Add"
          onPress={addTodo} /*What should be called here? */
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
