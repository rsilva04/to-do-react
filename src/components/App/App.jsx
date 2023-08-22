import {useEffect, useState} from 'react';
import axios from 'axios';


function App () {

  const [toDoListActivity, setToDoListActivity] = useState('');
  const [toDoListArray, setToDoListArray] = useState([]);


  const fetchList = () => {
    axios.get('/todo')
    .then((response) => {
      console.log(response);
      console.log(response.data);
      setToDoListArray(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const addActivity = (event) => {
    axios.post('/todo', {activity : toDoListActivity})
    .then((response) => {
      console.log(response);
      console.log(response.data);
      fetchList(response.data);
      setToDoListActivity('');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const completeActivity = (id) => {
    axios.put(`/todo/complete/${id}`)
    .then((response) => {
      console.log(response)
      fetchList();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const deleteActivity = (id) => {
    axios.delete(`/todo/${id}`)
    .then((response) => {
      console.log(response)
      fetchList();
    })
    .catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
    <h1>TO DO APP</h1>

    <h2>Add Activity</h2>
    <form id = "form" onSubmit={addActivity}>
        <label id="activity">Activity:</label>
        <input value={toDoListActivity} type="text" id="input" onChange={(event) => setToDoListActivity(event.target.value)} />
        <button type="submit" >Add New Activity</button>
      </form>

      {toDoListArray.map(todo =>
      (<li key={todo.id}>
        {todo.activity}
        </li>
       ))}
</div>
  )
      }
  
export default App;

