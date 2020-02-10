# Week 5

Topics: putting the ui together, useEffect, useReducer, customHooks

steps will be:

1. Hook up the UI
2. useEffect for loading the pins
3. Use the search bar for filtering
- this requires lifting the state to the app component
4. refactoring the state management
5. Custom Hooks

## Hooking up the UI

Now that we've built many of the components that we'll need, we can start putting the app together.

First of all, we can start running our webpack server with:

```sh
npm start
```

Navigate to `http://localhost:3000` in your browser, and you'll see the default starting app for Create-React-App.

We'll be doing some work in the `App.js` folder to import the components that we set up. Just like we did with the Todo List project, we can clear the starting code:

```js
import React from 'react';
import './App.css';

function App() {
  return (
    <div>
    </div>
  );
}

export default App;
```

We can import the SearchBar component to use in App.js.

```js
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div>
      <SearchBar />
    </div>
  );
}
```

If we're not happy with how the SearchBar fits in the app, we can apply some styles to make it look better! Feel free to style it how you like! I'll be adding a bit of padding to the main Div.

When we import the PinMasonry component we run into an issue. PinMasonry requires a "pins" prop, so we need to load up some pins first and pass them in. For the moment we'll do that just like we did with the component in our Stories, but we'll find a better solution soon.

```js
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
```

## useEffect to load data

If we were fetching our pins from a server, it might take some time for the data to load. In that case, we'd want to show a spinner in the meantime. We're not fetching data from a backend _yet_, but we'll set our front-end up to anticipate that "async" behaviour.

With a React component we can register "effects" that should happen when a component renders.

```js
import React, { useEffect } from 'react'
//...
function App() {
  useEffect(() => {
      console.log('hello world!')
  }, [])

  return (
    <div className={"container"}>
      <SearchBar />
      <PinMasonry pins={sampleData} />
    </div>
  );
}
```

The example above registers a callback that should run _once_, when the component renders for the first time. We'll call the array that is passed to `useEffect` the "dependency array". For now that array will remain empty, but we'll change soon.

```js
//...
const [pins, setPins] = useState([])

useEffect(() => {
    setPins(sampleData)
}, [])

return (
<div className={"container"}>
    <SearchBar />
    <PinMasonry pins={pins} />
</div>
);
//...
```

With the code above, we initialize the `pins` as an empty array, and the have a useEffect which populates the pins. This patterns allows us to do things like have "Loading" indicators.

```js
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
```

In the future we'll replace the "setTimeout" with a network request to load the pins from a server.

### Filtering with the Search Bar

The purpose of having that search bar is to filter our pins! We want to be able to control the PinMasonry with the SearchBar. For this, we'll have to revisit the "data down, actions up" pattern that we explored in the Todo project. The "current search" needs to be stored at the top level of the app, i.e. the App component. We'll make a stateful variable to hold that, and pass the "setSearch" function down to the SearchBar component.

```js
//...
const [search, setSearch] = useState("")
//...
<SearchBar onChange={setSearch} />
```

We'll need to modify the SearchBar component to accept a "onChange" prop.

```js
export default ({ onChange }) => {
```

And then we'll register a useEffect to call the onChange function anytime the "search" value changes. To do this we can add "search" to the dependency array for this useEffect.

```js
useEffect(() => {
    onChange(search)
}, [search])
```

Now we'll have access to the search value in the App component, which we can use to filter the Pins! For this, we'll have a _second_ stateful value to hold the "filtered" pins. (Does it look like the state in our App component is getting a little messy?)

```js
//...
const [filteredPins, setFilteredPins] = useState([])
//...
useEffect(() => {
    setFilteredPins(
        pins.filter(pin => pin.title.toLowerCase().includes(search) || pin.author.toLowerCase().includes(search))
    )
}, [pins, search])
//...
loading ? <h1>Loading...</h1> : <PinMasonry pins={filteredPins} />
```

As seen above, we add a new stateful array, and set a useEffect which can set the "filtered" pins any time that the pins array or search value change.

Type into the search bar and watch the pins get filtered!

## Refactoring

As we've seen, the state in the App component can get pretty messy. Whenever we end up with multiple stateful variables in a component, it's a good idea to consider implementing the _reducer_ pattern. (Fun reading: https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)

The reducer pattern will allow us to bundle all our stateful values for our component into one object, which we can then dispatch "actions" to modify. Following this pattern will give us declarative ways of managing state.

```js
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
```

While the reducer pattern can take a bit of getting used to, it offers some benefits. As our state grows, the reducer patterns forces us to keep the state nicely organized within one object. It also forces us to define specific ways in which the state can be modified, which can be tested! Notice, the reducer function is a pure function (also, keep an eye on immutable data patterns).

In short:

- useReducer receives a "reducer" function, and an initial state
- when we want to make changes to the state, we can use "dispatch" to fire off "actions". Actions generally have a type, and an optional payload
- the reducer is a function that catches any action that is fired, and then produces a NEW state depending on the action that was caught

## Debouncing and Custom Hooks

Currently, the pins get filtered immediately as soon as a user starts typing in the search bar. This can be problematic when we start making network requests, since we don't want to send a request to the server for a new list of pins _EVERY_ time a user presses a key while they're typing. Instead, we want to wait for a little while after a user stops typing before we trigger the "onChange" callback. This is called "debouncing".

We could modify the useEffect inside `SearchBar` as follows:

```js
useEffect(() => {
    const timeout = setTimeout(() => {
        onChange(search)
    }, 500)

    return () => clearTimeout(timeout) // "cleanup function"
}, [search])
```

useEffect has an optional "return" value that we can use to return what's called a "cleanup" function. In our case, we're setting a 500ms timeout any time the search value changes, and if the effect happens to run again it will clear the previously set timeout before setting a new one.

The last thing we'll take a look at is custom hooks. We've actually been using hooks quite a bit so far:

- useState
- useEffect
- useReducer

These are all examples of "hooks", which are functions which add extra functionality to your components in React. If we have some special logic that we create for a component which we'd like to reuse for another component, the easiest way to do that is to wrap it up in a function! That's all that a custom hook is! The only real rules are that your function should follow the naming convention "useXYZ" and that it should be called at the top of the component.

Note: see here for a goofy example of a useMousePosition hook (https://codesandbox.io/s/eloquent-allen-dxfns?fontsize=14)

We've made a bit of custom logic for the SearchBar that we may want to use in another component, or even another React project! We can extract that debouncing logic to a hook as follows:

```js
const useDebounce = (cb, value, delay) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            cb(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value])
}

export default ({ onChange }) => {
    const [search, setSearch] = useState("")

    useDebounce(() => {
        onChange(search)
    }, search, 500)
//...
```

And we can even put the useDebounce function into another file so that we can import it to be reused somewhere else!

AS A CHALLENGE: See if you can create a useLocalState custom hook, which syncs stateful values with local storage. useLocalState should save to local storage, and it should load values from local storage when the component renders for the first time.