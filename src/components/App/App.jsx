import {useEffect, useState} from 'react';
import axios from 'axios';


function App () {

  const [toDoListActivity, setToDoListActivity] = useState('');
  const [toDoListComplete, setToDoListComplete] = useState('false');
  const [toDoListArray, setToDoListArray] = useState([]);


  const fetchList = () => {
    axios.get('/todo')
    .then((response) => {
      console.log(response);
      console.log(response.data);
      setToDoListActivity(response.data);
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
    <form onSubmit={addActivity}>
        <label>Activity</label>
        <input onChange={(event) => setToDoListActivity(event.target.value)} />
        <button type="submit" >Add New Activity</button>
      </form>
  </div>
  );
}
  
export default App

