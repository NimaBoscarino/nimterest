import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import PinMasonry from './components/PinMasonry'
import sampleData from './components/PinMasonry/sample_data.json'

function App() {
  const [pins, setPins] = useState([])
  const [filteredPins, setFilteredPins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

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

  useEffect(() => {
    setFilteredPins(
      pins.filter(pin => pin.title.includes(search) || pin.author.includes(search))
    )
  }, [pins, search])

  return (
    <div className={"container"}>
      <SearchBar onChange={setSearch} />
      {
        loading ? <h1>Loading...</h1> : <PinMasonry pins={filteredPins} />
      }
    </div>
  );
}

export default App;
