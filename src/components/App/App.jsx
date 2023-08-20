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
      setCreatureList(response.data);
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
  }




  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h1>TO DO APP</h1>
    </div>
  );

}

export default App
