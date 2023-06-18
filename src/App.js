import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    // Fetch the value of cnt from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/viewCount');
        const countFromBackend = response.data.count;
        setCnt(countFromBackend);
      } catch (error) {
        console.error('Error fetching count from backend:', error);
      }
    };

     fetchData();

  }, []);

  return (
    <div className="App">
      <h1>View Counts</h1>
      <h2>{cnt}</h2>
    </div>
  );
}

export default App;