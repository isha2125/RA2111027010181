import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WINDOW_SIZE = 10;
const API_URL = 'http://localhost:9876/numbers'; 

function AverageCalculator() {
  const [numberType, setNumberType] = useState('e'); 
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${numberType}`);
        setWindowPrevState(windowCurrState);
        setWindowCurrState(response.data.windowcurrstate);
        setNumbers(response.data.numbers);
        setAverage(response.data.avg);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, [numberType]); 

  const handleNumberTypeChange = (event) => {
    setNumberType(event.target.value);
  };

  return (
    <div>
      <select value={numberType} onChange={handleNumberTypeChange}>
        <option value="even">Even</option>
        <option value="primes">Prime</option>
        <option value="fibo">Fibonacci</option>
        <option value="rand">Random</option>
      </select>
      <br />
      <p>Previous Window State: {JSON.stringify(windowPrevState)}</p>
      <p>Current Window State: {JSON.stringify(windowCurrState)}</p>
      <p>Numbers Received: {JSON.stringify(numbers)}</p>
      <p>Average: {average}</p>
    </div>
  );
}

export default AverageCalculator;
