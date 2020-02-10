import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import PinMasonry from './components/PinMasonry'
import sampleData from './components/PinMasonry/sample_data.json'

function App() {
  return (
    <div className={"container"}>
      <SearchBar />
      <PinMasonry pins={sampleData} />
    </div>
  );
}

export default App;
