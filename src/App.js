import React, {useState, useEffect} from 'react'
import Search from './components/Search'
import Axios from 'axios'
import Results from './components/Results'
import Popup from './components/Popup'
import Pagination from './components/common/Pagination'
import Loader from './components/common/Loader'

function App() {
  const [state, setState] = useState({
    searchValue: 'martian',
    result: [],
    selected: {},
    totalResults: '',
    isFetching: false,
    error: '',
    currentPage: 1,
  })
  const apiUrl = 'http://www.omdbapi.com/?apikey=e72ef182'

  window.state = state

  let pagesCount = Math.ceil(state.totalResults / 10)

  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const changePage = (page) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
      isFetching: true,
    }))

    Axios(apiUrl + `&s=${state.searchValue}&page=${+page}`).then(
      ({data}) => {
        setState((prevState) => ({
          ...prevState,
          isFetching: false,
        }))

        setState((prevState) => ({
          ...prevState,
          result: data.Search,
        }))
      }
    )
  }

  useEffect(() => {
    Axios(apiUrl + '&s=martian&page="1"').then(({data}) => {
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
        currentPage: 1
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
          <Pagination
            currentPage={state.currentPage}
            pages={pages}
            changePage={changePage}
          />
          {state.isFetching ? (
            <Loader />
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
