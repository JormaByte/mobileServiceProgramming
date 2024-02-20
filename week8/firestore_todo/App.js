import { Text, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}


