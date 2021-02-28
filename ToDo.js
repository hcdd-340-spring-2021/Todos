import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default function ToDo(props) {
  return (
    <GestureRecognizer onSwipeRight={props.deleteToDo} style={styles.container}>
      <Text>{props.text}</Text>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 5,
  }
});
