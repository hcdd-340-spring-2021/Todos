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
import ToDo from './ToDo.js'

export default function App() {
  // Here's what we will do step by step
  // 1. Add the text value in the textInput to the list todos which is in our state
  // 2. Render the FlatList!
  // 3. Make Todo items deletable by clicking on them

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    todosCopy.push(text);
    setTodos(todosCopy);
    setText("");
  }

  // 3.1 Add a function to delete an item from todos given its
  // index
  const deleteTodo = index => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    todosCopy.splice(index, 1);
    setTodos(todosCopy);
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.flatlist}>
        {/*

          // 2. Here, you will render your FlatList. To help you do
          // that, we have created a component for you to render the
          // items. Additionally, here are the props you will pass to
          // FlatList:
          // - style: Make sure your list takes all the white space
          // - data: What is the list of items we are trying to render?
          // - renderItem: Use the included ToDo to render items
          // ToDo component is called like this <ToDo text={"Hello"}/>
          // - keyExtractor: Write a one-line function to take
          // (item, index) in and returns index.toString()

        */}
          <FlatList
            data={todos}
            renderItem={( { item, index } ) =>
              <ToDo
                id={index}
                text={item}
                onSelect={deleteTodo}
                />
             }
             keyExtractor={(item, index) => {
               return item + index.toString()
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
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
    flex: 1
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    height: 40,
    width: '20%',
    borderColor: 'gray',
    borderWidth: 1
  }
});
