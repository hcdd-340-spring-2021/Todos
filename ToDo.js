import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

// 3.2 Make your todos clickable such that they call the
// delete function in parent when pressed

export default function ToDo(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onSelect(props.id)}
      style={styles.container}>
      <Text>{props.text}</Text>

      {/* What should happen when onPress is called? */}
      <Button style={styles.button} title="X" />
    </TouchableOpacity>
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
    justifyContent: 'center',
  }
});
