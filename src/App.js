import React, { useEffect, useState, useReducer } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import PinMasonry from './components/PinMasonry'
import sampleData from './components/PinMasonry/sample_data.json'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PINS':
      return {...state, pins: action.payload, loading: false};
    case 'SET_FILTERED':
      return {...state, filteredPins: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_SEARCH':
      return {...state, search: action.payload};
    default:
      throw new Error();
  }
}

function App() {
  const [{ pins, filteredPins, loading, search}, dispatch] = useReducer(reducer, {
    pins: [],
    filteredPins: [],
    loading: false,
    search: ""
  })

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        dispatch({ type: 'SET_PINS', payload: sampleData })
      }, 2000) // two seconds to simulate network request
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({
      type: 'SET_FILTERED',
      payload: pins.filter(pin => pin.title.includes(search) || pin.author.includes(search))
    })
  }, [pins, search])

  return (
    <div className={"container"}>
      <SearchBar onChange={(newSearch) => dispatch({ type: 'SET_SEARCH', payload: newSearch })} />
      {
        loading ? <h1>Loading...</h1> : <PinMasonry pins={filteredPins} />
      }
    </div>
  );
}

export default App;
