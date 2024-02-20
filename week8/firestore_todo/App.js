import { Alert, Button, Text, TextInput, View } from 'react-native';
import styles from './styles/style'
import { QuerySnapshot, addDoc, collection, deleteDoc,
doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, TODOS_REF } from './firebase/Config'
import { useEffect, useState } from 'react';

export default function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  /*
  useEffect() hook as follows. It makes query of the collection from the
database using query() and collection() functions. By default query returns
documents from the todos collection in ascending order by the document id. In
this example order is set as ascending order by todoItem. First query will be
made from the collection and orderBy() function is used for setting the order.
Function onSnapshot() handles the results of the query. The result is called
snapshot. Inside the iteration of the snapshot, spread operator is used for
setting the data to the state variable that is an array of objects. This way there
is no need to set individual values (todoItem, done) separately.
  */

  useEffect(() => {
    const q = query(collection(db, TODOS_REF), orderBy('todoitem'))
    onSnapshot(q, (QuerySnapshot) => {
      setTodos(QuerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
  }, [])

  /*
  addNewTodo() adds new todo item to the database if todo field is not
empty. Function addDoc() is used for adding document to the todos collection.
Item has two keys (done and todoItem) and together with values those are
key-value pairs that will be added to Firebase database after successful
operation. If operation is successful, state variable for new todo is set as empty
string
  */
  const addNewTodo = async () => {
    try {
      if (newTodo.trim() !== '') {
        await addDoc(collection(db, TODOS_REF), {
          done: false,
          todoItem: newTodo
        })
        setNewTodo('')
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }
/**
Keys of all todo items are
assigned to an array using keys() function of the Object class (parent of all
classes)
 */
  let todosKeys = Object.keys(todos)

  /**
   * removeTodo() removes single todo from the collection. Id of the todo
is passed as an argument to the function and deleteDoc() function is used for
removing todo from the todos collection
   */

  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc (db, TODOS_REF, id))
    }
    catch (error) {
      console.log(error.message);
    }
  }

  /**
   * removeTodos() removes all todo items from the database. Cloud
Firestore does not allow deleting all documents of the collection by once. That is
why each todo will be deleted separately. Reference of todo (id) is passed as an
argument to removeTodo() function.
   */

  const removeTodos = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, TODOS_REF))
      querySnapshot.forEach((todo) => {
        removeTodo(todo.id)
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }
/** 
 * createTwoButtonAlert() shows an Alert dialog including two options.
Either to accept removal of all items or cancel removal
*/

  const createTwoButtonAlert = () => Alert.alert(
    'Todolist', 'Remove all items?', [{
      text: 'Cancel',
      onPress: () => console.log('Removal cancelled'),
      style: 'cancel'
    },
  {
    text: 'OK', onPress: () => removeTodos()
  }],
  {cancelable: false}
  )
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list ({todosKeys.length}) </Text>
      <View style={styles.newItem}>
        <TextInput
          placeholder='Add new todo'
          value={newTodo}
          style={styles.textInput}
          onChangeText={setNewTodo}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button 
        title='Add new Todo item'
        onPress={() => addNewTodo()}/>
      </View>
    </View>
  );
}


