import { useEffect, useState } from 'react';
import axios from 'axios';
import '@fontsource/roboto';

// Material Components
import Button from '@mui/material/Button';


function App() {

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
    axios.post('/todo', { activity: toDoListActivity })
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
  const resetTodo = (event) => {
    axios.put(`/todo/reset`, { complete: false })
      .then((response) => {
        fetchList();
      }).catch((err) => {
        console.log('Error', err);
        alert('Something went wrong');
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
        <form id="form" onSubmit={addActivity}>
          <label id="activity">Activity:</label>
          <input onChange={(event) => setToDoListActivity(event.target.value)} />
          {/* <button type="submit" >Add New Activity</button> */}
          <Button color="success" variant="contained" type="submit">Add New Activity</Button>
          <button id="reset" onClick={(event) => resetTodo(id)}>Reset</button>
        </form>
        {toDoListArray.map(todo =>
        (<li key={todo.id}>
          {todo.activity}
        </li>
        ))}
        <br></br> 
        <br></br> 
        <table>
        <thead>
          <tr>
            <th>My Activities</th>
            <th id="complete-heading">Complete</th>
            <th id="delete-heading">Delete</th>
          </tr>
        </thead>
        <tbody>
          {toDoListArray.map(activity => (
          <tr key={activity.activity}>
            <td id={activity.complete ? "complete-activity" : "not-complete-activity"}>{activity.activity}</td>
            <td><button id={activity.complete ? "complete" : "not-complete"} onClick={() => 
              completeActivity(activity.id)}
>             {activity.complete ? "Completed" : "Complete"}
            </button></td>
            {/* <td><button id="delete" onClick={() => deleteActivity(activity.id)}>Delete</button></td> */}
            <Button id="delete" onClick={() => deleteActivity(activity.id)} color="secondary" variant="outlined">Delete</Button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    
  }


export default App;

