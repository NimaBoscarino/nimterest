import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import PinMasonry from './components/PinMasonry'
import sampleData from './components/PinMasonry/sample_data.json'

function App() {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setPins(sampleData)
        setLoading(false)
      }, 2000) // two seconds to simulate network request
    }

    setLoading(true)
    fetchData()
  }, [])

  return (
    <div className={"container"}>
      <SearchBar />
      {
        loading ? <h1>Loading...</h1> : <PinMasonry pins={pins} />
      }
    </div>
  );
}

export default App;
