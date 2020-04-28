import React, {useState, useEffect} from 'react'
import Search from './components/Search'
import Axios from 'axios'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    searchValue: '',
    result: [],
    selected: {},
    totalResults: '',
    isFetching: false,
    error: '',
  })
  window.state = state

  const apiUrl = 'http://www.omdbapi.com/?apikey=e72ef182'

  useEffect(() => {
    Axios(apiUrl + '&s=martian').then(({data}) => {
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }))

      setState((prevState) => ({
        ...prevState,
        result: data.Search,
        totalResults: data.totalResults,
      }))
    })
  }, [])

  const search = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && state.searchValue) {
      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))
      Axios(apiUrl + '&s=' + state.searchValue).then(({data}) => {
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }))

        if (data.Error) {
          setState((prevState) => ({...prevState, error: data.Error}))
          return
        } else {
          setState((prevState) => ({...prevState, error: ''}))
        }

        setState((prevState) => ({
          ...prevState,
          result: data.Search,
          totalResults: data.totalResults,
        }))
      })
    }
  }

  const handleInput = (e) => {
    let searchValue = e.target.value
    setState((prevState) => ({...prevState, searchValue}))
  }

  const openPopup = (id) => {
    Axios(apiUrl + '&i=' + id).then(({data}) => {
      setState((prevState) => ({
        ...prevState,
        selected: data,
      }))
    })
  }

  const closePopup = () => {
    document.body.style.overflow = 'visible'
    setState((prevState) => ({
      ...prevState,
      selected: {},
    }))
  }

  return (
    <div>
      {state.selected.Title && (
        <Popup selected={state.selected} closePopup={closePopup} />
      )}

      <div className="container ">
        <header className="text-center mt-5">
          <h1>Фильмы</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search} />
          {state.isFetching ? (
            <div className="text-center">
              <div
                className="spinner-grow"
                style={{width: '80px', height: '80px', marginTop: '200px'}}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Results
              results={state.result}
              totalResults={state.totalResults}
              error={state.error}
              openPopup={openPopup}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
