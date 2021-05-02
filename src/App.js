import './App.css';
import React, {useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './component/Todo';
import db from './services/firebase';
import firebase from 'firebase';

function App() {

  const [todos, settodos] = useState([]);
  const [input, setinput] = useState('');

  useEffect(() =>{
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      settodos(snapshot.docs.map(doc => ({id: doc.id,time:Date(snapshot.docs[0].data().timestamp), todo:doc.data().todo})));
    })
  },[]);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    settodos([...todos, input]);
    setinput('');
  }
  return (
    <div className="App">
      <h1>Welcome to ToDo WebApp</h1>

      <form>
        <FormControl>
          <InputLabel>ToDo :</InputLabel>
          <Input value={input} onChange={event => setinput(event.target.value)} />
        </FormControl>

        <Button disabled={!input } type="submit" onClick={addTodo} variant="contained" color="primary">ADD ToDo</Button>
      </form>
      <ul className="list_style">
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
