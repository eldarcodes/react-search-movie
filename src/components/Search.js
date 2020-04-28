import React from 'react'

export default function Search({handleInput, search}) {
  let years = []
  const setYears = () => {
    for (let i = 2020; i >= 1940; i--) {
      years.push(i)
    }
  }
  setYears()

  return (
    <section className="mt-3">
      <div className="row">
        <div className="col-8">
          <label className="ml-1">Название фильма:</label>
          <input
            onChange={handleInput}
            type="text"
            placeholder="Найти фильмы"
            className="form-control"
            onKeyPress={search}
          />
        </div>
        <div className="col-4">
          <label className="ml-1">Год:</label>
          <select className="custom-select">
            <option>Год</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-right mt-3">
        <button onClick={search} className="btn btn-success px-5 py-2">
          Поиск
        </button>
      </div>
      <hr />
    </section>
  )
}
